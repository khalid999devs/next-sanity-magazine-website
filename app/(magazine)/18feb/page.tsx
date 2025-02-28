import Hero from '@/components/sections/18feb/Hero';
import { get18FebData } from '@/sanity/lib/feb/get18FebData';
import { notFound } from 'next/navigation';
import React from 'react';
import About from '../../../components/sections/18feb/About';
import { getAllCategories } from '@/sanity/lib/feb/getAllCategories';
import Proof from '@/components/sections/18feb/Proof';
import Timeline from '@/components/sections/18feb/Timeline';
import OurAskings from '@/components/sections/18feb/OurAskings';

const page = async () => {
  const feb18Data = await get18FebData('pictures');
  const categories = await getAllCategories();
  if (!feb18Data) {
    return notFound();
  }

  console.log(feb18Data);

  return (
    <div className='w-full relative min-h-screen'>
      <Hero
        title={feb18Data.title}
        subtitle={feb18Data.subtitle}
        slug={feb18Data.slug}
        images={feb18Data.images}
      />
      <About bannerImage={feb18Data.bannerimage} />

      <Proof categories={categories} proofImages={feb18Data.proofImages} />
      {feb18Data && (feb18Data?.timeline as any).length > 0 && (
        <Timeline timelines={feb18Data.timeline} />
      )}
      <OurAskings />
    </div>
  );
};

export default page;
