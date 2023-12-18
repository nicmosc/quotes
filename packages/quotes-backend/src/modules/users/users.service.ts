import { Injectable } from '@nestjs/common';
// For simplicity, our model matches the API interface
import { User, User as UserModel } from '@quotes/schema';

// This should normally be within the repository data
import { users } from './mock';

@Injectable()
export class UsersService {
  private readonly users: Array<UserModel>;

  constructor() {
    this.users = users;
  }

  findAll(): Array<User> {
    return this.users;
  }

  findOneById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findOneByEmail(email: string): User | undefined {
    // In a production env we would use a repository to get the DB data
    return this.users.find((user) => user.email === email);
  }

  create(userDto: any) {}

  update(id: string, userDto: any) {}

  delete(id: string) {}
}
