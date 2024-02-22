import { LoginDto } from '../dto/user.dto';

export interface AuthInterface {
    login(loginDto: LoginDto): Promise<{ access_token: string }>;
}
