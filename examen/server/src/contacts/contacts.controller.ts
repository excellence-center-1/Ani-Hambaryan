//contactcontroller.ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { contactsService } from './contacts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('contacts')
export class contactsController {
  constructor(
    private usersService: UsersService,
    private contactsService: contactsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Request() req, @Body() userData: any) {
    try {
      const email = req.user.email;
      const existingUser = await this.usersService.getUserByEmail(email);

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      const userId = existingUser.id;
      return this.contactsService.createcontact(userId, userData);
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req) {
    try {
      const email = req.user.email;
      const user = await this.usersService.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userId = user.id;
      const contacts = await this.contactsService.getAllcontacts(userId);
      return contacts;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw new NotFoundException('Error fetching contacts');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':phone_number')
  async delete(@Request() req, @Param('phone_number') phone_number: string) {
    try {
      const email = req.user.email;
      const user = await this.usersService.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userId = user.id;
      await this.contactsService.deleteContactByPhoneNumber(phone_number, userId);
      console.log(`Contact deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting contact:`, error);
    }
  }
  
}
