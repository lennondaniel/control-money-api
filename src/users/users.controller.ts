import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from 'src/dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async CreateUser(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        const user = await this.userService.createUser(createUserDto);
        return new ResponseUserDto(user);
    }
}
