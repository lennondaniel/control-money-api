import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
    id: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class ResponseUserDto {
    id: string;
    name: string;
    email: string;
    constructor(user: ResponseUserDto) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}
export class LoginDto extends PickType(UserDto, ['email', 'password']) {}
