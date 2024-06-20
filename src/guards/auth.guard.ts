import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthenticateService } from 'src/authenticate/authenticate.service';
import { UserManagementService } from 'src/user_management/user_management.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthenticateService,
    private readonly userService: UserManagementService,
  ) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.verify_token(
        (authorization ?? '').split(' ')[1],
      );
      request.tokenPayload = data;

      request.user = this.userService.existsUserId(data.id);
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
