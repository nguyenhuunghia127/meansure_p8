import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  login(@Body() body: { role: string }) {
    // Demo logic: Simply logs user in based on requested role
    const payload = { username: body.role === 'admin' ? 'admin_user' : 'tester_user', sub: 1, role: body.role || 'tester' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
