import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private jwtService;
    constructor(jwtService: JwtService);
    login(body: {
        role: string;
    }): {
        access_token: string;
    };
}
