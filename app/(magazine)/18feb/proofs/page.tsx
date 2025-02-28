import Proof from '@/components/sections/18feb/Proof';
import { getAllCategories } from '@/sanity/lib/feb/getAllCategories';

const page = async () => {
  const categories = await getAllCategories();

  return (
    <div className='min-h-screen w-full pb-20'>
      <Proof categories={categories} mode='full' />
    </div>
  );
};

export default page;
