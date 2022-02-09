import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailListDto } from './dto/create-mail-list.dto';
import { UpdateMailListDto } from './dto/update-mail-list.dto';
import { MailList, MailListDocument } from './entities/mail-list.entity';

@Injectable()
export class MailListService {
  constructor(
    @InjectModel(MailList.name)
    private mailListModel: Model<MailListDocument>,
  ) {}

  async create(createMailListDto: CreateMailListDto) {
    const mail = await this.findOne();

    if (!mail) {
      return this.mailListModel.create({ emails: createMailListDto.emails });
    }

    console.log(mail);

    await mail.update({ emails: createMailListDto.emails }).exec();

    return await this.findOne();
  }

  async findOne() {
    const mail = await this.mailListModel.find().exec();

    return mail.length ? mail[0] : null;
  }
}
