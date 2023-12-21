import { List } from '@phosphor-icons/react';
import { Fragment, useState } from 'react';
import { Avatar } from 'react-daisyui';

import { useAuth } from '../../providers';
import { ProfileDrawer, RandomQuote, TagsDrawer } from './components';

export const Quotes = () => {
  const { me } = useAuth();

  const [currentCategory, setCurrentCategory] = useState<string>();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  return (
    <Fragment>
      <div className="absolute w-full flex justify-between p-5">
        <TagsDrawer
          isOpen={isTagsOpen}
          onClickClose={() => setIsTagsOpen(false)}
          onChange={(tag: string) => setCurrentCategory(tag)}
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
        <div
          className="prose prose-lg text-white hover:cursor-pointer"
          onClick={() => setCurrentCategory(undefined)}>
          {currentCategory}
        </div>
        <ProfileDrawer
          isOpen={isProfileOpen}
          onClickClose={() => setIsProfileOpen(false)}
          trigger={
            <Avatar
              onClick={() => setIsProfileOpen(true)}
              className="hover:cursor-pointer"
              innerClassName="[&>span]:mt-[1px]"
              letters={`${me?.firstName[0]}${me?.lastName[0]}`}
              color="neutral"
              shape="circle"
              size="xs"
            />
          }
        />
      </div>
      <RandomQuote category={currentCategory} />
    </Fragment>
  );
};
