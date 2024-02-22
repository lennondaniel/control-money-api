import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/user.dto';
import { hashPassword } from '../helpers/hashPassword';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthInterface } from './auth.interface';

@Injectable()
export class AuthService implements AuthInterface {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(loginDto.email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const passwordIsCorrect = hashPassword(loginDto.password) === user?.password;

        if (!passwordIsCorrect) {
            throw new HttpException('Incorrect password', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const payload = { user_id: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
