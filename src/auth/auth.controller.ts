import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<string> {
        return await this.authService.login(loginDto);
    }
}
