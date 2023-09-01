import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(dto: UserDto): Promise<string | object>;
    signin(dto: UserDto): Promise<string | object>;
}
