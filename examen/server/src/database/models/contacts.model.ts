// todos.model.ts
import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './users.model';


@Table({ tableName: 'contacts', timestamps: false })
export class Contact extends Model<Contact> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  contact: string;

  @Column({ allowNull: false })
  phone_number: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: true })
  group: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  declare users: User;

}