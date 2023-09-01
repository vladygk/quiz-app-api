import { AuthService } from './auth.service';
import { UserDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: UserDto): Promise<string | object>;
    signin(dto: UserDto): Promise<string | object>;
}
