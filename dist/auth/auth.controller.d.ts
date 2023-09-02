import { AuthService } from './auth.service';
import { UserDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: UserDto): Promise<import("./contract").JwtInterface>;
    signin(dto: UserDto): Promise<import("./contract").JwtInterface>;
}
