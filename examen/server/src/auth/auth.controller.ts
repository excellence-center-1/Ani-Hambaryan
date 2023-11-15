// //auth.controller.ts
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userData: any, @Res() res: Response) {
    try {
      const response = await this.authService.login(userData, res);
      return res.status(200).json(response); 
    } catch (error) {
      return res.status(500).json({ message: 'error' });
    }
  }

  @Post('/registration')
  async registration(@Body() userData: any, @Res() res: Response) {
    try {
      const response = await this.authService.registration(userData, res);
      return res.status(201).json(response); 
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'error_registration' });
    }
  }


  @Get('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Loggout successfully' });
  }
  
}
