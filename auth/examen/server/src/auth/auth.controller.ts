// //auth.controller.ts
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import * as session from 'express-session';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userData: any, @Res() res: Response) {
    try {
      const response = await this.authService.login(userData, res);
      return res.status(200).json(response); // Return a response from the controller
    } catch (error) {
      // Handle any errors here
      return res.status(500).json({ message: 'An error occurred' });
    }
  }

  @Post('/registration')
  async registration(@Body() userData: any, @Res() res: Response) {
    try {
      const response = await this.authService.registration(userData, res);
      return res.status(201).json(response); // Return a response from the controller
    } catch (error) {
      // Handle any errors here
      return res.status(500).json({ message: 'An error occurred' });
    }
  }


  @Get('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  }
  
}
