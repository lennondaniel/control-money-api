import {
    Body,
    Controller,
    Post,
    Request,
    UseGuards,
    Get
} from '@nestjs/common';
import { LoginDto } from '../dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        return await this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
