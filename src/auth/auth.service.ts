import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: UserDto) {
    try {
      const hash = await argon.hash(dto.password);
      const createdUser = await this.prisma.user.create({
        data: { email: dto.email, hash: hash },
      });

      delete createdUser.hash;

      return createdUser;
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

    delete user.hash;

    return user;
  }
}
