import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserManagement } from './dto/update_user_management.dto';
import { CreateUserManagement } from './dto/user_management.dto';
import { UserManageEntity } from './entities/user_management.entity';
@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(UserManageEntity)
    private management_repo: Repository<UserManageEntity>,
  ) {}

  async register_user(data: CreateUserManagement) {
    try {
      data.password = await this.convertPassBcrypt(data.password);
      await this.existUser(data.email);
      const user = await this.management_repo.create(data);
      const create_user = await this.management_repo.save(user);
      return create_user;
    } catch (error) {
      throw new BadRequestException('Something wrong Email or User exits!');
    }
  }

  async users(): Promise<UserManageEntity[]> {
    try {
      const data = await this.management_repo.find();

      if (data.length === 0) throw new NotFoundException('Not found');

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async get_user(id: string): Promise<UserManageEntity> {
    try {
      const user = await this.management_repo.findOneBy({ id });
      console.log(user);
      return user;
    } catch (error) {
      throw new BadRequestException('Something its wrong!');
    }
  }

  async get_user_jwt(id: string) {
    try {
      return this.management_repo.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException('Something its wrong!');
    }
  }

  async update_user_profile(data: UpdateUserManagement, id: string) {
    try {
      await this.get_user(id);
      await this.management_repo.update(id, data);
      return this.get_user(id);
    } catch (error) {
      throw new BadRequestException('Something went wrong!');
    }
  }

  async delete(id: string) {
    try {
      return await this.management_repo.delete(id);
    } catch (error) {
      throw new BadRequestException('Something its wrong!');
    }
  }

  async existsUserId(id: string) {
    try {
      const existUser = await this.get_user(id);
      return existUser;
    } catch (error) {
      throw new BadRequestException('Something its wrong!');
    }
  }

  async convertPassBcrypt(pass: string) {
    const saltOrRounds = 10;

    return await bcrt.hash(pass, saltOrRounds);
  }

  async existUser(email: string) {
    try {
      const res = await this.management_repo.findOneBy({ email });
      return res;
    } catch (error) {
      throw new BadRequestException('User exist!!');
    }
  }
}
