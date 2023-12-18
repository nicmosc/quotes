import { Tag } from '@quotes/schema';

import { TagsData } from '../interfaces';

interface Response<K> {
  data: K;
}

function mapTagsDataToTags(tagsData: TagsData): Tag[] {
  return tagsData.map((value) => ({
    id: value._id,
    name: value.name,
  }));
}

export function tagsTransform(data: TagsData): Response<Tag[]> {
  return {
    data: mapTagsDataToTags(data),
  };
}
