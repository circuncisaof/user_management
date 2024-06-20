import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManageEntity } from 'src/user_management/entities/user_management.entity';
import { UserManagement } from 'src/user_management/user_management.module';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '12345',
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserManagement),
    TypeOrmModule.forFeature([UserManageEntity]),
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService],
  exports: [AuthenticateService],
})
export class AuthenticateModule {}
