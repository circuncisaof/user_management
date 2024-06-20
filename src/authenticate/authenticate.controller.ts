import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserManagementService } from 'src/user_management/user_management.service';
import { AuthenticateService } from './authenticate.service';
import { AuthResetDto } from './dtos/auth-reset.dto';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { CreateUser } from './dtos/create_user.dto';
@Controller('auth')
export class AuthenticateController {
  constructor(
    private auth_service: AuthenticateService,
    private readonly userService: UserManagementService,
  ) {}

  @Post()
  async auth(@Body() data: AuthenticateDto) {
    return this.auth_service.auth(data);
  }

  @Post('register_user')
  async register_user(@Body() data: CreateUser) {
    return this.userService.register_user(data);
  }

  @Post('forget')
  async forget_password(@Body() { email, token }: AuthResetDto) {
    console.log(email, token);
    return this.auth_service.forgetPassword(email, token);
  }
  @UseGuards(AuthGuard)
  @Post('perfil')
  async perfil(@Req() req) {
    return { me: 'ok', data: req.tokenPayload };
  }
}
