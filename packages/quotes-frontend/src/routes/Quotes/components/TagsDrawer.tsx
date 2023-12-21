import { ReactNode, useState } from 'react';
import { Drawer, Input, Menu } from 'react-daisyui';

import { useFetchTags } from '../../../hooks';

interface TagsDrawerProps {
  isOpen: boolean;
  onClickClose: VoidFunction;
  trigger: ReactNode;
  onChange: (value: string) => void;
}

export const TagsDrawer = ({ isOpen, onClickClose, trigger, onChange }: TagsDrawerProps) => {
  const { data } = useFetchTags();
  const [search, setSearch] = useState('');

  const filtered = data?.data.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Drawer
      open={isOpen}
      onClickOverlay={onClickClose}
      sideClassName="h-screen absolute z-10"
      overlayClassName={isOpen ? '!bg-[#99999980]' : undefined}
      className="w-auto static"
      side={
        <div className="p-10 w-80 h-full bg-base-200 text-base-content overflow-auto">
          <div className="flex justify-center items-center my-10 flex-col">
            <span className="prose text-md font-bold text-black">Select a Category</span>
            <Input
              placeholder="Search category"
              className="mt-5 rounded-full w-full"
              size="md"
              bordered={false}
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </div>
          {filtered?.map((tag) => (
            <div
              onClick={() => {
                onChange(tag.name);
                setSearch('');
                onClickClose();
              }}
              className="prose prose-2xl my-5 font-bold text-neutral-400 hover:text-black hover:cursor-pointer"
              key={tag.id}>
              {tag.name}
            </div>
          ))}
        </div>
      }>
      {trigger}
    </Drawer>
  );
};
