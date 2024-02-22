import { Body, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user.dto';
import { UsersInterface } from './users.interface';

@Injectable()
export class UsersService implements UsersInterface {
    constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
        const user = await this.userModel.findOne({ email: createUserDto.email });

        if (user) {
            throw new HttpException('Email is already taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findOneByEmail(email: string): Promise<UserModel> {
        const user = await this.userModel.findOne({ email: email });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return user;
    }
}
