import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { GetQuote, GetTags, QuoteRequest } from '@quotes/schema';

import { AuthGuard } from '../auth/guards';
import { QuotesService } from './quotes.service';

@Controller('quotes')
@UseGuards(AuthGuard)
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @HttpCode(HttpStatus.OK)
  @Get('random')
  async random(@Query() query: QuoteRequest): Promise<ReturnType<GetQuote>> {
    return this.quotesService.getRandomQuote(query.tags?.split(','));
  }

  @HttpCode(HttpStatus.OK)
  @Get('tags')
  async tags(): Promise<ReturnType<GetTags>> {
    return this.quotesService.getAllTags();
  }
}
