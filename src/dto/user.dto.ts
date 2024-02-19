import { OmitType, PickType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    id: string

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
    @IsNotEmpty()
    id: string
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    email: string;
    
    constructor(user: UserDto) {
        this.id = user.id
        this.name = user.name;
        this.email = user.email
    }

}
export class LoginDto extends PickType(UserDto, ['email', 'password']){}