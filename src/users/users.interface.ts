import { CreateUserDto } from '../dto/user.dto';
import { UserModel } from './user.model';

export interface UsersInterface {
    createUser(createUserDto: CreateUserDto): Promise<UserModel>;
    findOneByEmail(email: string): Promise<UserModel>;
}
