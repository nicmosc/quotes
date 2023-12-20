import { Injectable } from '@nestjs/common';
// For simplicity, our model matches the API interface
import { User } from '@quotes/schema';

// This should normally be within the repository data
import { UserModel, users } from './mock';

@Injectable()
export class UsersService {
  private readonly users: Array<UserModel>;

  constructor() {
    this.users = users;
  }

  findAll(): Array<User> {
    return this.users;
  }

  findOneById(id: string, withPw: boolean = false): UserModel | User | undefined {
    // In a production env we would use a repository to get the DB data
    const user = this.users.find((user) => user.id === id);
    if (user != null) {
      const { password, ...rest } = user;
      return withPw ? user : rest;
    }
  }

  findOneByEmail(email: string, withPw: boolean = false): UserModel | User | undefined {
    // In a production env we would use a repository to get the DB data
    const user = this.users.find((user) => user.email === email);
    if (user != null) {
      const { password, ...rest } = user;
      return withPw ? user : rest;
    }
  }

  create(userDto: any) {}

  update(id: string, userDto: any) {}

  delete(id: string) {}
}
