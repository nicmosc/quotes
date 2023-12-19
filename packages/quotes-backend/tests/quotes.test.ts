import { HttpModule } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Quote, Tag } from '@quotes/schema';
import request from 'supertest';

import { AuthModule } from '../src/modules/auth';
import { AuthGuard } from '../src/modules/auth/guards';
import { QuotesModule } from '../src/modules/quotes';
import { MockAuthGuard } from './mock.auth.guard';

describe('Quotes', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [QuotesModule, AuthModule, HttpModule],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/GET quotes/random', () => {
    it('should return a random quote', async () => {
      const res = await request(app.getHttpServer()).get('/quotes/random').expect(200);

      expect(res.body).toMatchObject<{ data: Quote }>({
        data: {
          id: expect.any(String),
          content: expect.any(String),
          author: expect.any(String),
        },
      });
    });

    it('should return a quote from a specific category (tag)', async () => {
      const res = await request(app.getHttpServer()).get('/quotes/random?tags=work').expect(200);

      expect(res.body).toMatchObject<{ data: Quote }>({
        data: {
          id: expect.any(String),
          content: expect.any(String),
          author: expect.any(String),
          tags: expect.arrayContaining(['Work']),
        },
      });
    });

    it('should return 404 if the url is invalid', async () => {
      const res = await request(app.getHttpServer()).get('/quotes/rando').expect(404);

      expect(res.body.data).toBeUndefined();
    });
  });

  describe('/GET quotes/tags', () => {
    it('should return an array of tags', async () => {
      const res = await request(app.getHttpServer()).get('/quotes/tags').expect(200);

      expect(res.body).toMatchObject<{ data: Tag[] }>({
        data: expect.arrayContaining([
          {
            id: expect.any(String),
            name: expect.any(String),
          },
        ]),
      });
    });

    it('should return a 401 if the request is not authenticated', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [QuotesModule, AuthModule, HttpModule],
      }).compile();

      app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get('/quotes/tags').expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
