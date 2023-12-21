import { Shuffle } from '@phosphor-icons/react';
import randomColor from 'randomcolor';
import { Fragment, useEffect } from 'react';
import { Loading } from 'react-daisyui';

import { useFetchQuote } from '../../../hooks';

interface RandomQuoteProps {
  category?: string;
}

export const RandomQuote = ({ category }: RandomQuoteProps) => {
  const { data, refetch, isLoading } = useFetchQuote({
    tags: category,
    maxLength: 60,
  });

  const [fg, bg] = generateRandomColorCombo(data?.data.id);

  useEffect(() => {
    refetch();
  }, [category]);

  return (
    <div
      style={{ backgroundColor: bg }}
      className="w-full h-full flex justify-center items-center flex-col p-10 transition-all">
      {isLoading ? (
        <Loading variant="infinity" size="lg" color="primary" />
      ) : (
        <Fragment>
          <div
            style={{ color: fg }}
            className="prose text-[50px] leading-none font-serif text-center transition-all">
            {data?.data.content}
          </div>
          <div className="my-5" />
          <div className="prose prose-sm text-white font-light uppercase">
            - {data?.data.author}
          </div>
          <div
            onClick={() => {
              refetch();
            }}
            className="absolute bottom-10 border border-slate-100 rounded-full p-2 hover:cursor-pointer">
            <Shuffle color="white" weight="fill" size={30} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

const generateRandomColorCombo = (seed?: string) => {
  if (seed == null) {
    // use default
    return ['black', 'white'];
  }
  const foregroundColor = randomColor({
    luminosity: 'light',
    seed,
  });
  const backgroundColor = randomColor({
    luminosity: 'dark',
    seed,
  });
  return [foregroundColor, backgroundColor];
};
