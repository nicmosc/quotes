import { faker } from '@faker-js/faker';
import { User } from '@quotes/schema';

faker.seed(1);

const TOTAL_USERS = 3;

export interface UserModel extends User {
  password: string;
}

export const users: Array<UserModel> = [...Array(TOTAL_USERS).keys()].map((_, i) => ({
  id: `${i + 1}`,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}));

console.log({ users });
