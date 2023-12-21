import { ReactNode } from 'react';
import { Avatar, Button, Drawer } from 'react-daisyui';

import { useLogout } from '../../../hooks';
import { useAuth } from '../../../providers';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClickClose: VoidFunction;
  trigger: ReactNode;
}

export const ProfileDrawer = ({ isOpen, onClickClose, trigger }: ProfileDrawerProps) => {
  const { me } = useAuth();
  const { logout } = useLogout();

  return (
    <Drawer
      end
      open={isOpen}
      onClickOverlay={onClickClose}
      sideClassName="h-screen absolute z-10"
      overlayClassName={isOpen ? '!bg-[#99999980]' : undefined}
      className="w-auto static"
      side={
        <div className="p-10 w-80 h-full bg-base-200 text-base-content overflow-auto flex flex-col">
          <Avatar
            innerClassName="[&>span]:mt-[1px]"
            letters={`${me?.firstName[0]}${me?.lastName[0]}`}
            color="neutral"
            shape="circle"
            size="md"
          />
          <div className="mt-4" />
          <span className="prose prose-base font-semibold text-black">
            {me?.firstName} {me?.lastName}
          </span>
          <div className="mt-1" />
          <span className="prose prose-sm text-neutra-300">{me?.email}</span>
          <div className="flex-1" />
          <Button glass onClick={logout}>
            Log out
          </Button>
        </div>
      }>
      {trigger}
    </Drawer>
  );
};
