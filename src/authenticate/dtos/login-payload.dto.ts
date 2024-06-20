import { UserManageEntity } from 'src/user_management/entities/user_management.entity';

export class LoginPayload {
  id: string;
  name: string;
  email: string;

  constructor(user: UserManageEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
