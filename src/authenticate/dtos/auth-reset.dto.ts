import { IsJWT, IsString } from 'class-validator';

export class AuthResetDto {
  email: string;
  @IsJWT()
  token?: string;
  password?: string;
}

export class AuthEmailResetDto {
  @IsString()
  email: string;
}
