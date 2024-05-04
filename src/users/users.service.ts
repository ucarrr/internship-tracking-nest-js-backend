import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model, SchemaTypes } from 'mongoose';
import { CreatePersonDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async create(allProps: CreatePersonDto): Promise<User> {
    const user = new this.userModel(allProps);
    return await user.save();
  }

  async update(id: string, allProps: CreatePersonDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, allProps, { new: true });
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async addFavorite(id: string, faqId: string)
  {
    const user = await this.userModel.findById(id);
    user.userFavoriteFaqs.push(faqId as any);
    return await user.save();
  }
}


