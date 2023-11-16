import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './database/models/users.model';
import { config } from 'dotenv';
import { Contact } from './database/models/contacts.model';
import { contactsModule } from './contacts/contacts.module';

config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [
        User,
        Contact
      ],
      autoLoadModels: true
    }),
    AuthModule,
    UsersModule,
    contactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('PG_USERNAME:', process.env.PG_USERNAME);
    console.log('PG_PASSWORD:', process.env.PG_PASSWORD);
  }
}
