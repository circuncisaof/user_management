import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_management' })
export class UserManageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 200 })
  name: string;

  @Column({ nullable: false, name: 'nick_name' })
  nick_name: string;

  @Column({ nullable: false, name: 'cpf', unique: true })
  cpf: string;

  @Column({ nullable: false, name: 'rg', unique: true })
  rg: string;

  @Column({ nullable: false, name: 'birth_date' })
  birth_date: Date;

  @Column({ nullable: false, name: 'age' })
  age: number;

  @Column({ nullable: false, name: 'email', unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  cell_phone: string;
  @Column({ nullable: false, name: 'address' })
  address: string;
  @Column({ nullable: false })
  password: string;
}
