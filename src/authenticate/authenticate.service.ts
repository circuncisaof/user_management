import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ReturnUserDto } from 'src/user_management/dto/returns/return_user_management.dto';
import { UserManageEntity } from 'src/user_management/entities/user_management.entity';
import { UserManagementService } from 'src/user_management/user_management.service';
import { Repository } from 'typeorm';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { LoginPayload } from './dtos/login-payload.dto';
import { IUser } from './dtos/user.dto';

@Injectable()
export class AuthenticateService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserManageEntity)
    private user_repo: Repository<UserManageEntity>,
    private user_service: UserManagementService,
  ) {}

  async auth({ email, password }: AuthenticateDto) {
    try {
      const user = await this.user_repo.findOneBy({
        email,
      });

      const comparehash = await bcrypt.compare(password, user.password);

      if (!user || !comparehash || (user && comparehash === null)) {
        throw new UnauthorizedException('Email or password incorrect');
      }
      return {
        accessToken: this.jwtService.sign({
          ...new LoginPayload(user),
        }),
        user: new ReturnUserDto(user),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async forgetPassword(email: string, token: string) {
    try {
      const user = await this.user_repo.findOneBy({
        email,
      });

      const new_password = this.generatePassword();
      if (!user) {
        throw new UnauthorizedException('Email not found');
      }
      await this.updatePassword(new_password, token);
      return { new_password };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updatePassword(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token);
      console.log(password);
      password = await this.convertPassBcrypt(password);
      const data_new = await this.user_repo.update(data.id, { password });
      const user = this.user_service.get_user_jwt(data.id);
      return { user, data_new };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
  verify_token(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async create_jwt(user: IUser) {
    return await this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '1 day',
        subject: String(user.id),
      },
    );
  }

  isValidToken(token: string) {
    try {
      this.verify_token(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  generatePassword() {
    const randon_password = Math.random().toString(36).substring(0, 8);
    return randon_password;
  }

  async convertPassBcrypt(pass: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);
    console.log('hash', hash);
    return hash;
  }
}
