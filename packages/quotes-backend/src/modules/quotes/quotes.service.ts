import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import qs from 'query-string';
import { firstValueFrom } from 'rxjs';

import { QuoteData, TagsData } from './interfaces';
import { quoteTransform, tagsTransform } from './transformers';

@Injectable()
export class QuotesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private serviceUrl = this.configService.get<string>('QUOTES_SERVICE_URL')!;

  async getRandomQuote(filter: string[] = []) {
    const url = qs.stringifyUrl(
      {
        url: this.serviceUrl + '/random',
        query: { tags: filter },
      },
      { arrayFormatSeparator: '|', arrayFormat: 'separator' },
    );
    const { data } = await firstValueFrom(this.httpService.get<QuoteData>(url).pipe());

    return quoteTransform(data);
  }

  async getAllTags() {
    const url = qs.stringifyUrl({
      url: this.serviceUrl + '/tags',
      query: { sortBy: 'quoteCount' },
    });
    const { data } = await firstValueFrom(this.httpService.get<TagsData>(url).pipe());

    return tagsTransform(data);
  }
}
