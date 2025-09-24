import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserRow } from './users.types';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: DatabaseService) {}

  async findByEmail(email: string): Promise<UserRow | undefined> {
    const result = await this.db.query<UserRow>(
      `SELECT * FROM users WHERE email = $1 LIMIT 1`,
      [email],
    );
    return result.rows[0];
  }

  async findById(id: number): Promise<UserRow | undefined> {
    const result = await this.db.query<UserRow>(
      `SELECT * FROM users WHERE id = $1 LIMIT 1`,
      [id],
    );
    return result.rows[0];
  }

  async createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
  }): Promise<UserRow> {
    const result = await this.db.query<UserRow>(
      `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *`,
      [data.name, data.email, data.passwordHash],
    );
    return result.rows[0];
  }
}
