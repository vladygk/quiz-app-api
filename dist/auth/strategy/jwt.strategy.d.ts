import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PayloadInterface } from '../contract';
import { PrismaService } from '../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: PayloadInterface): Promise<{
        id: number;
        createdAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
    }>;
}
export {};
