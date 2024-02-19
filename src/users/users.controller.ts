import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginDto, ResponseUserDto } from 'src/dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    async CreateUser(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        const user = await this.userService.CreateUser(createUserDto);
        return new ResponseUserDto(user);
    }

    @Post('login')
    async Login(@Body() loginDto: LoginDto): Promise<ResponseUserDto> {
        const user = await this.userService.Login(loginDto);
        return new ResponseUserDto(user);
    }
}