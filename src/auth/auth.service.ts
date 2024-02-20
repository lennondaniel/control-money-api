import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/user.dto';
import { hashPassword } from '../helpers/hashPassword';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    async login(loginDto: LoginDto): Promise<string> {
        const user = await this.usersService.findOneByEmail(loginDto.email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const passwordIsCorrect = hashPassword(loginDto.password) === user?.password;

        if (!passwordIsCorrect) {
            throw new HttpException('Incorrect password', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const payload = { sub: user.id, email: user.email };
        return this.jwtService.signAsync(payload);
    }
}
