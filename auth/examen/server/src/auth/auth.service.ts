
// auth.service.ts
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/database/models/users.model';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private setTokenCookie(res: Response, token: string) {
    res.cookie('token', token);
  }

  async login(userData: any, res: Response) {
    const user = await this.validateUser(userData);
    const token = this.generateToken(user);
    this.setTokenCookie(res, token);
    return { message: 'Login successful', token };
  }

  async registration(userData: any, res: Response) {
    const candidate = await this.userService.getUserByEmail(userData.email);
    if (candidate) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userData.password, 5);
    const user = await this.userService.createUser({ ...userData, password: hashPassword });
    const token = this.generateToken(user);
    this.setTokenCookie(res, token);
    return { message: 'Registration successful', token };
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userData: any) {
    const user = await this.userService.getUserByEmail(userData.email);
    const passwordEquals = await bcrypt.compare(userData.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Invalid email or password' });
  }
}
