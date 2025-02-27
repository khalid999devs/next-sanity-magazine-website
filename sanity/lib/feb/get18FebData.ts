import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

export const get18FebData = async (category: string = 'pictures') => {
  const FEB_18_DATA_QUERY = defineQuery(`
   *[_type == "february"]{
      title,
      subtitle,
      slug,
      bannerimage,
      images,
      "proofImages": proofImages[category->slug.current == $category],
      timeline
    }[0]
    `);

  try {
    const feb18Data = await sanityFetch({
      query: FEB_18_DATA_QUERY,
      params: {
        category: category,
      },
    });
    return feb18Data.data || null;
  } catch (error) {
    console.error('Error fetching 18 feb data: ', error);
    return null;
  }
};
