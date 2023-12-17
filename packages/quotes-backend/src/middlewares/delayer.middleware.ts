import { Injectable, NestMiddleware } from '@nestjs/common';

interface DelayerMiddlewareOptions {
  delay: number;
}

export function DelayerMiddleware(options: DelayerMiddlewareOptions): Function {
  @Injectable()
  class DelayerMiddlewareCtor implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
      setTimeout(() => {
        next();
      }, options.delay);
    }
  }
  return DelayerMiddlewareCtor;
}
