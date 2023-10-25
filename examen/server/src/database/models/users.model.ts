// users.model.ts
import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Contact } from './contacts.model';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @HasMany(() => Contact)
  contact: Contact[];

}