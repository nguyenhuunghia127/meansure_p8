import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Lấy token từ Header: Authorization: Bearer <token>
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'super_secret_key_p8',
        });
    }

    async validate(payload: any) {
        // Nếu token hợp lệ, user sẽ được đính kèm vào request (req.user)
        return { userId: payload.sub, username: payload.username, role: payload.role };
    }
}