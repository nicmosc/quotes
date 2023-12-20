import { PropsWithChildren } from 'react';
import { Theme } from 'react-daisyui';

export const UIProvider = ({ children }: PropsWithChildren) => {
  return (
    <Theme dataTheme="light">
      <div className="h-screen">{children}</div>
    </Theme>
  );
};
