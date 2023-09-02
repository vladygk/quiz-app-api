import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtInterface, PayloadInterface } from './contract';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: UserDto) {
    try {
      const hash = await argon.hash(dto.password);
      const createdUser = await this.prisma.user.create({
        data: { email: dto.email, hash: hash },
      });

      return this.signJwtToken(createdUser.id, createdUser.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return new ForbiddenException('Email already in use').getResponse();
        }
      }
      throw error;
    }
  }
  async signin(dto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      return new ForbiddenException('Incorrect credentials');
    }

    const isPasswordCorrect = await argon.verify(user.hash, dto.password);

    if (!isPasswordCorrect) {
      return new ForbiddenException('Incorrect credentials').getResponse();
    }

    return this.signJwtToken(user.id, user.email);
  }

  async signJwtToken(userId: number, email: string): Promise<JwtInterface> {
    const payload: PayloadInterface = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
