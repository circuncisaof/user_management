import { UserManageEntity } from 'src/user_management/entities/user_management.entity';

export class ReturnUserDto {
  id: string;
  name: string;
  nick_name: string;
  cpf: string;
  rg: string;
  birth_date: Date;
  age: number;
  email: string;
  cell_phone: string;

  constructor(userEntity: UserManageEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.nick_name = userEntity.nick_name;
    this.age = userEntity.age;
    this.email = userEntity.email;
    this.cell_phone = userEntity.cell_phone;
    this.cpf = userEntity.cpf;
    this.rg = userEntity.rg;
    this.birth_date = userEntity.birth_date;
  }
}
