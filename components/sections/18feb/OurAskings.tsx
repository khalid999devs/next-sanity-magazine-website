import { askingsPoster } from '@/assets';
import { LargeTextWithBullets } from '@/components/custom/TextWithBullets';
import { imageUrl } from '@/components/lib/imageUrl';
import Image from 'next/image';
import React from 'react';

const bulletTexts = [
  '১৫০+ শিক্ষার্থী গুরুতর আহত, অনেকেই হাসপাতালে ভর্তি, এদের ভরণপোষণ',
  'শান্তিপূর্ণ ক্যাম্পাসে ছাত্ররাজনীতি চাপিয়ে দেওয়ার পরিকল্পিত প্রচেষ্টা...',
  'প্রাণনাশের চেষ্টা, আতঙ্ক ছড়ানোর অপচেষ্টা...',
  'ন্যায়বিচারের দাবিতে ফুঁসে উঠেছে কুয়েটের শিক্ষার্থীরা...',
];

const OurAskings = () => {
  return (
    <div className='my-32 mb-40 max-width-small grid gap-20 sec-x-padding'>
      <h2 className='font-cheading section-heading'>আমাদের দাবিসমূহ</h2>

      <div className='flex flex-col md:flex-row justify-start items-center gap-11 '>
        <div className='flex flex-col gap-3 px-3 md:px-0 md:gap-4'>
          {bulletTexts.map((item, key) => (
            <LargeTextWithBullets text={item} key={key} />
          ))}
        </div>
        <div className='relative'>
          <Image
            src={askingsPoster}
            alt='Banner Image'
            className='object-cover flex-shrink-0 rounded-lg'
            width={410}
            height={400}
            sizes='(max-width: 640px) 100vw,
                 (max-width: 768px) 50vw,
                 (max-width: 1024px) 33vw,
                 25vw'
          />
        </div>
      </div>
    </div>
  );
};

export default OurAskings;
