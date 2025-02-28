import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

export const getProofFilesByCat = async (
  category: string = 'pictures',
  mode: 'limit' | 'all' = 'limit'
) => {
  let FILES_BY_CAT_QUERY;
  if (mode === 'all') {
    FILES_BY_CAT_QUERY = defineQuery(`
     *[_type == "february"]{
       "proofImages": proofImages[category->slug.current == $category],
       "proofVideos": proofVideos[category->slug.current == $category],
     }[0]
    `);
  } else {
    FILES_BY_CAT_QUERY = defineQuery(`
  *[_type == "february"]{
    "proofImages": proofImages[category->slug.current == $category][0...4],
    "proofVideos": proofVideos[category->slug.current == $category][0...4]
  }[0]
`);
  }

  try {
    const proofFilesByCat = await sanityFetch({
      query: FILES_BY_CAT_QUERY,
      params: {
        category: category,
      },
    });
    return proofFilesByCat.data || null;
  } catch (error) {
    console.error('Error fetching proof files by Category: ', error);
    return null;
  }
};
