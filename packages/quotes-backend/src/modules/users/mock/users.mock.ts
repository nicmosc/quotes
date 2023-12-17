import { faker } from '@faker-js/faker';

import { User } from '../interfaces';

faker.seed(1);

const TOTAL_USERS = 3;

export const users: Array<User> = [...Array(TOTAL_USERS).keys()].map((_, i) => ({
  id: `${i + 1}`,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}));

console.log({ users });
