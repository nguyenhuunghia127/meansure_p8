import { Body, Controller, Get, Post } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post('login')
  login(@Body() body: { username?: string; password?: string }) {
    return this.systemService.login(body);
  }

  @Post('register')
  register(
    @Body() body: { username?: string; password?: string; role?: string },
  ) {
    return this.systemService.register(body);
  }

  @Get('users')
  manageUsers() {
    return this.systemService.manageUsers();
  }

  @Get('history')
  viewHistory() {
    return this.systemService.viewHistory();
  }
}
