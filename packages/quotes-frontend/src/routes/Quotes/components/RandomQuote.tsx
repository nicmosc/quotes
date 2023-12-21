import { Shuffle } from '@phosphor-icons/react';
import { Fragment } from 'react';
import { Loading } from 'react-daisyui';

import { useFetchQuote } from '../../../hooks';

export const RandomQuote = () => {
  const { data, refetch, isLoading } = useFetchQuote({
    maxLength: 60,
  });
  return (
    <div className="w-full h-full bg-teal-300 flex justify-center items-center flex-col p-10">
      {isLoading ? (
        <Loading variant="infinity" size="lg" color="primary" />
      ) : (
        <Fragment>
          <div className="prose text-[50px] leading-none font-serif text-center text-purple-600">
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
