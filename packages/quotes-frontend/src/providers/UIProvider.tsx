import { PropsWithChildren } from 'react';
import { Theme } from 'react-daisyui';

export const UIProvider = ({ children }: PropsWithChildren) => {
  return <Theme dataTheme="light">{children}</Theme>;
};
