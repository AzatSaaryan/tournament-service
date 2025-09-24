import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserRow } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async findByEmail(email: string): Promise<UserRow | undefined> {
    return this.repository.findByEmail(email);
  }

  async findById(id: number): Promise<UserRow | undefined> {
    return this.repository.findById(id);
  }

  async createUser(data: {
    name: string;
    email: string;
    hashedPassword: string;
  }): Promise<UserRow> {
    return this.repository.createUser(data);
  }
}
