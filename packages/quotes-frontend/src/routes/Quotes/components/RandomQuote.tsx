import { Shuffle } from '@phosphor-icons/react';

export const RandomQuote = () => {
  return (
    <div className="w-full h-full bg-teal-300 flex justify-center items-center flex-col p-10">
      <div className="prose text-[50px] leading-none font-serif text-center text-purple-600">
        being grateful makes you gorgeous
      </div>
      <div className="my-5" />
      <div className="prose prose-sm text-white font-light uppercase">- Albert Einstein</div>
      <div className="my-8" />
      <div className="border border-slate-100 rounded-full p-2 hover:cursor-pointer">
        <Shuffle color="white" weight="fill" size={30} />
      </div>
    </div>
  );
};
