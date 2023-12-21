import { Shuffle } from '@phosphor-icons/react';
import randomColor from 'randomcolor';
import { Fragment } from 'react';
import { Loading } from 'react-daisyui';

import { useFetchQuote } from '../../../hooks';

const generateRandomColorCombo = (seed?: string) => {
  if (seed == null) {
    // use default
    return ['white', 'black'];
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

export const RandomQuote = () => {
  const { data, refetch, isLoading } = useFetchQuote({
    maxLength: 60,
  });

  const [fg, bg] = generateRandomColorCombo(data?.data.id);

  return (
    <div
      style={{ backgroundColor: bg }}
      className="w-full h-full flex justify-center items-center flex-col p-10">
      {isLoading ? (
        <Loading variant="infinity" size="lg" color="primary" />
      ) : (
        <Fragment>
          <div
            style={{ color: fg }}
            className="prose text-[50px] leading-none font-serif text-center">
            {data?.data.content}
          </div>
          <div className="my-5" />
          <div className="prose prose-sm text-white font-light uppercase">
            - {data?.data.author}
          </div>
          <div className="absolute bottom-10 border border-slate-100 rounded-full p-2 hover:cursor-pointer">
            <Shuffle
              onClick={() => {
                refetch();
              }}
              color="white"
              weight="fill"
              size={30}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};
