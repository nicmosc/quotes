import { List } from '@phosphor-icons/react';
import { Fragment, useState } from 'react';
import { Avatar } from 'react-daisyui';

import { useAuth } from '../../providers';
import { ProfileDrawer, RandomQuote, TagsDrawer } from './components';

export const Quotes = () => {
  const { me } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  return (
    <Fragment>
      <div className="absolute w-full flex justify-between p-5">
        <TagsDrawer
          isOpen={isTagsOpen}
          onClickClose={() => setIsTagsOpen(false)}
          trigger={
            <List
              className="hover:cursor-pointer"
              color="white"
              weight="duotone"
              size={30}
              onClick={() => setIsTagsOpen(true)}
            />
          }
        />
        <div className="prose prose-lg text-white">Random</div>
        <Avatar
          className="hover:cursor-pointer"
          innerClassName="[&>span]:mt-[1px]"
          letters={`${me?.firstName[0]}${me?.lastName[0]}`}
          color="neutral"
          shape="circle"
          size="xs"
        />
      </div>
      <RandomQuote />
      <ProfileDrawer />
    </Fragment>
  );
};
