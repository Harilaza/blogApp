import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { AuthDto } from 'src/interfaces/user/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: AuthDto) {
    const hashedPassword = await this.usersService.hashPassword(body.password);    
    
    return this.usersService.create({
      email: body.email,
      password: hashedPassword,
    });
  }

  @Post('login')
  async login(@Body() body: AuthDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}
