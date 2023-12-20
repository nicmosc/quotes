import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from '@quotes/schema';
import request from 'supertest';

import { AuthModule } from '../src/modules/auth';
import { AuthGuard } from '../src/modules/auth/guards';
import { UsersModule } from '../src/modules/users';
import { MockAuthGuard } from './mock.auth.guard';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule, AuthModule],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/GET users/:id', () => {
    it('should return a user for the given ID', async () => {
      const res = await request(app.getHttpServer()).get('/users/1').expect(200);

      expect(res.body).toMatchObject<{ data: User }>({
        data: {
          id: '1',
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
        },
      });
    });

    it('should return a 404 if the id does not exist', async () => {
      await request(app.getHttpServer()).get('/users/9999').expect(404);
    });

    it('should return a 401 if the request is not authenticated', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [UsersModule, AuthModule],
      }).compile();

      app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get('/users/1').expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
