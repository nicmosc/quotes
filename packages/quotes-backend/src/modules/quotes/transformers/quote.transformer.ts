import { Quote } from '@quotes/schema';

import { QuoteData } from '../interfaces';

interface Response<K> {
  data: K;
}

function mapQuoteDataToQuote(quoteData: QuoteData): Quote {
  return {
    id: quoteData._id,
    content: quoteData.content,
    author: quoteData.author,
  };
}

export function quoteTransform(data: QuoteData): Response<Quote> {
  return {
    data: mapQuoteDataToQuote(data),
  };
}
