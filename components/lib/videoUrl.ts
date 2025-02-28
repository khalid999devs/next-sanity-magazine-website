import { client } from '@/sanity/lib/client';
import { getFileAsset } from '@sanity/asset-utils';

export function videoUrl(source: any) {
  return getFileAsset(source, client.config()).url;
}
