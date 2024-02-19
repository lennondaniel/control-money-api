import { Body, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDto, LoginDto, ResponseUserDto } from 'src/dto/user.dto';
import { hashPassword } from 'src/helpers/hashPassword';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {}

    async CreateUser(createUserDto: CreateUserDto): Promise<UserModel> {
        const user = await this.userModel.findOne({ email: createUserDto.email });

        if (user) {
            throw new HttpException('Email is already taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async Login(loginDto: LoginDto): Promise<UserModel> {
        const user = await this.userModel.findOne({ email: loginDto.email }).select('+password');

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const passwordIsCorrect = hashPassword(loginDto.password) === user.password;

        if (!passwordIsCorrect) {
            throw new HttpException('Icorrect password', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return user;
    }
}
