import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtInterface } from './contract';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: UserDto): Promise<string | object>;
    signin(dto: UserDto): Promise<string | object>;
    signJwtToken(userId: number, email: string): Promise<JwtInterface>;
}
