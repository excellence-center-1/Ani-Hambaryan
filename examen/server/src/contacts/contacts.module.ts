import { Module, forwardRef } from '@nestjs/common';
import { contactsController } from './contacts.controller';
import { contactsService } from './contacts.service';
import { UsersService } from 'src/users/users.service';
import { Contact } from 'src/database/models/contacts.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/database/models/users.model';

@Module({
  controllers: [contactsController],
  providers: [contactsService, UsersService],
  imports: [
    SequelizeModule.forFeature([Contact, User]),
    AuthModule
  ],
})
export class contactsModule {}
