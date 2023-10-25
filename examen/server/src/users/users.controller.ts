//users.controller.js
import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersService } from "./users.service";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getUserInfo(@Request() req) {
    try {
      const email = req.user.email;
      const userInfo = await this.usersService.getUserByEmail(email);
      console.log(userInfo);
      return userInfo;
    } catch (error) {
      console.error('Error finding user info:', error);
      throw new HttpException('User info not found', HttpStatus.NOT_FOUND);
    }
  }

}