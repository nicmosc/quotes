import { createParamDecorator } from '@nestjs/common';

// eslint-disable-next-line
export const CurrentUser = createParamDecorator((data, [root, args, ctx, info]) => ctx.req.user);
