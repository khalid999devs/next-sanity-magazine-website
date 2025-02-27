import { LargeTextWithBullets } from '@/components/custom/TextWithBullets';
import { imageUrl } from '@/components/lib/imageUrl';
import Image from 'next/image';
import React from 'react';

const bulletTexts = [
  '১৫০+ শিক্ষার্থী গুরুতর আহত, অনেকেই হাসপাতালে ভর্তি',
  'শান্তিপূর্ণ ক্যাম্পাসে ছাত্ররাজনীতি চাপিয়ে দেওয়ার পরিকল্পিত প্রচেষ্টা',
  'প্রাণনাশের চেষ্টা, আতঙ্ক ছড়ানোর অপচেষ্টা',
  'ন্যায়বিচারের দাবিতে ফুঁসে উঠেছে কুয়েটের শিক্ষার্থীরা',
];

const About = ({ bannerImage }: { bannerImage: any }) => {
  return (
    <div className='my-16 max-width-small grid gap-11 sec-x-padding'>
      <div className='grid gap-7 text-center'>
        <h2 className='font-cheading section-heading'>কী ঘটেছিল?</h2>
        <p
          className='body-medium-text'
          style={
            {
              // lineHeight: '1.2rem',
            }
          }
        >
          ১৮ ফেব্রুয়ারি ২০২৫, বিএনপি ছাত্রদল জোরপূর্বক ছাত্ররাজনীতি প্রতিষ্ঠার
          উদ্দেশ্যে কুয়েট ক্যাম্পাসে সশস্ত্র হামলা চালায়। নিরীহ শিক্ষার্থীদের
          ওপর লোহার রড, লাঠি, ইট-পাটকেল দিয়ে বর্বর আক্রমণ করা হয়।
        </p>
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center gap-9 '>
        <div className='relative'>
          <Image
            src={imageUrl(bannerImage).url()}
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
        <div className='flex flex-col gap-3 px-3 md:px-0 md:gap-4'>
          {bulletTexts.map((item, key) => (
            <LargeTextWithBullets text={item} key={key} />
          ))}
        </div>
      </div>

      <h3 className='text-lg lg:text-xl 2xl:text-2xl font-cheading text-center w-[80%] md:w-[70%] m-auto'>
        আমরা ন্যায়বিচার চাই। কুয়েটকে রাজনীতি মুক্ত রাখতে হবে। দোষীদের কঠোর
        শাস্তি হোক!
      </h3>
    </div>
  );
};

export default About;
