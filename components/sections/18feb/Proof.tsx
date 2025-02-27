'use client';

import { Category } from '@/sanity.types';
import { getProofFilesByCat } from '@/sanity/lib/feb/getProofFilesByCat';
import React, { useEffect, useState } from 'react';

type Props = {
  categories?: Category[] | null;
  proofImages: any;
};

const Proof = ({ categories, proofImages }: Props) => {
  const [currentCat, setCurrentCat] = useState<string | null | undefined>(
    'pictures'
  );
  const [proofFiles, setProofFiles] = useState<any>([]);

  const setProofFilesByCategory = async () => {
    const response: any = await fetch(`/api/proof?category=${currentCat}`);
    const proofFilesFromDb = await response.json();
    setProofFiles([
      ...proofFilesFromDb?.proofImages,
      ...proofFilesFromDb?.proofVideos,
    ]);
  };

  console.log(categories, proofFiles);

  useEffect(() => {
    if (currentCat === 'pictures') {
      setProofFiles(proofImages);
    } else {
      setProofFilesByCategory();
    }
  }, [currentCat, proofImages]);

  return (
    <div className='my-28 mt-36 max-width-small grid gap-11 sec-x-padding'>
      <div className='grid gap-12 text-center'>
        <h2 className='font-cheading section-heading'>প্রমাণ দেখুন</h2>
        <div className='flex gap-6 items-center flex-row justify-center flex-wrap p-3 rounded-xl bg-body-grey border-1 border border-secondary-main border-opacity-10'>
          {categories?.map((cat) => {
            return (
              <button
                key={cat._id}
                className={`px-4 lg:px-5 py-1.5 md:py-2 rounded-[10px]  text-base md:text-lg 2xl:text-xl hover:bg-primary-main hover:text-body-main transition-all duration-500 ${currentCat === cat.slug?.current && 'bg-primary-main text-body-main'}`}
                onClick={() => setCurrentCat(cat.slug?.current)}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Proof;
