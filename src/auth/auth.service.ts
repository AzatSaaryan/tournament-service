import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: { username: string; email: string; password: string }) {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) throw new Error('User with this email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await this.userService.createUser({
      username: data.username,
      email: data.email,
      hashedPassword,
    });
    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    };
  }

  async login(data: { email: string; password: string }, res: Response) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: 'Login successful', token });
  }
}
