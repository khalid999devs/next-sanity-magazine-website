import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

export const getAllCategories = async () => {
  const GET_ALL_CATEGORY_QUERY = defineQuery(`
   *[_type == "category"]
    `);

  try {
    const categories = await sanityFetch({
      query: GET_ALL_CATEGORY_QUERY,
    });
    return categories.data || null;
  } catch (error) {
    console.error('Error fetching categories: ', error);
    return null;
  }
};
