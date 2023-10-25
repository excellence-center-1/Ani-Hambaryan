//contact.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from 'src/database/models/contacts.model';
import { User } from 'src/database/models/users.model';

@Injectable()
export class contactsService {
  constructor(@InjectModel(Contact) private contactRepository: typeof Contact) { }

  async createcontact(id: number, contactData: any) {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    const contact = await this.contactRepository.create({
      contact: contactData.contact,
      user_id: user.id,
      email: contactData.email,
      phone_number: contactData.phone,
      group: contactData.group,
    });
    return contact;
  }

  async getAllcontacts(id: number) {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      const data = await this.contactRepository.findAll({
        where: {
          user_id: user.id,
        },
        attributes: [
          'contact',
          'phone_number',
          'group',
        ]
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteContactByPhoneNumber(phone_number: string, id: number): Promise<void> {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      const contact = await this.contactRepository.findOne({
        where: {
          user_id: user.id,
          phone_number,
        },
      }); 
      if (!contact) {
        throw new NotFoundException('Contact not found');
      }
      await contact.destroy();
    } catch (error) {
      throw error;
    }
  }
}
