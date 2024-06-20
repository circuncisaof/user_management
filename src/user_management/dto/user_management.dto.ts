import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserManagement {
  @IsNotEmpty({ message: 'is not null' })
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty({ message: 'is not null' })
  @IsString()
  @IsOptional()
  nick_name: string;

  @IsNotEmpty({ message: 'is not null' })
  @IsString()
  @IsOptional()
  cpf: string;

  @IsNotEmpty({ message: 'is not null' })
  @IsString()
  @IsOptional()
  rg: string;

  @IsNotEmpty({ message: 'is not null' })
  @IsString()
  @IsOptional()
  birth_date: Date;

  @IsNotEmpty({ message: 'is not null' })
  @IsOptional()
  @IsString()
  age: number;

  @IsNotEmpty({ message: 'is not null' })
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty({ message: 'is not null' })
  @IsString()
  @IsOptional()
  cell_phone: string;

  @IsString({ message: 'Nao pode ser nulo ' })
  @IsNotEmpty({ message: 'is not null' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 5,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsOptional()
  @MaxLength(20)
  password: string;
}
