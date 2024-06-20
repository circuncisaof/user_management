import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReturnUserDto } from './dto/returns/return_user_management.dto';
import { UpdateUserManagement } from './dto/update_user_management.dto';
import { CreateUserManagement } from './dto/user_management.dto';
import { UserManageEntity } from './entities/user_management.entity';
import { UserManagementService } from './user_management.service';

@Controller('user_management')
export class UserManagementController {
  constructor(private management: UserManagementService) {}

  @Post()
  async register_user(@Body() data: CreateUserManagement) {
    console.log(data);

    return this.management.register_user(data);
  }

  @Get()
  async users(): Promise<ReturnUserDto[]> {
    return (await this.management.users()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get(':id')
  async get_user(@Param('id') id: string): Promise<UserManageEntity> {
    return this.management.get_user(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update_user_profile(
    @Param('id') id: string,
    @Body() data: UpdateUserManagement,
  ) {
    return this.management.update_user_profile(data, id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    console.log(id);

    return this.management.delete(id);
  }
}
