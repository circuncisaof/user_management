import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticateModule } from 'src/authenticate/authenticate.module';
import { UserManageEntity } from './entities/user_management.entity';
import { UserManagementController } from './user_management.controller';
import { UserManagementService } from './user_management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserManageEntity]),
    forwardRef(() => AuthenticateModule),
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService],
  exports: [UserManagementService],
})
export class UserManagement {}
