import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(data: { name: string; email: string; password: string }) {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) throw new Error('User with this email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await this.userService.createUser({
      name: data.name,
      email: data.email,
      hashedPassword,
    });
    return {
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    };
  }
}
