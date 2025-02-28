'use client';

import { imageUrl } from '@/components/lib/imageUrl';
import ContentPopup from '@/components/utils/ContentPopup';
import Loader from '@/components/utils/Loader';
import { Category, SanityImageAsset } from '@/sanity.types';
import { ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
  categories?: Category[] | null;
  proofImages?: any;
  mode?: 'full' | 'short';
};

const Proof = ({ categories, proofImages, mode = 'short' }: Props) => {
  const [currentCat, setCurrentCat] = useState<string | null | undefined>(
    'pictures'
  );
  const [proofFiles, setProofFiles] = useState<any>([]);
  const [contentPopup, setContentPopup] = useState(false);
  const [targetProof, setTargetProof] = useState<{
    media: any;
    blockText: any;
    type: 'image' | 'video';
  }>({
    media: null,
    blockText: null,
    type: 'image',
  });
  const [loading, setLoading] = useState(false);

  const setProofFilesByCategory = async () => {
    setLoading(true);
    try {
      const response: any = await fetch(
        `/api/proof?category=${currentCat}&mode=${mode}`
      );
      const proofFilesFromDb = await response.json();
      setProofFiles([
        ...proofFilesFromDb?.proofImages,
        ...proofFilesFromDb?.proofVideos,
      ]);
    } catch (error) {
      console.error('Error happened: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentCat === 'pictures' && mode === 'short') {
      setProofFiles(proofImages);
    } else {
      setProofFilesByCategory();
    }
  }, [currentCat, proofImages]);

  // useEffect(() => {
  //   if (contentPopup === true) {
  //     document.body.style.overflow = 'hidden';
  //   } else if (contentPopup === false) {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [contentPopup]);

  return (
    <div
      className='my-28 mt-32 max-width-medium grid gap-11 sec-x-padding'
      id='proof'
    >
      <div className='grid gap-12 text-center'>
        <h2 className='font-cheading section-heading'>প্রমাণ দেখুন</h2>
        <div className='flex gap-2 md:gap-5 items-center flex-row justify-center flex-wrap max-w-[900px] w-fit m-auto p-3 px-4 rounded-xl bg-body-grey border-1 border border-secondary-main border-opacity-10'>
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

        {!loading ? (
          <div className='grid grid-cols-2 gap-2 w-full'>
            {proofFiles?.length > 0 &&
              proofFiles?.map((file: any, key: number) => {
                const description = file.description;
                return currentCat !== 'videos' &&
                  currentCat !== 'shortVideos' ? (
                  <div
                    className='relative rounded-lg group cursor-pointer overflow-hidden'
                    key={key}
                    onClick={() => {
                      setTargetProof({
                        media: file.image,
                        blockText: description,
                        type: 'image',
                      });
                      setContentPopup(true);
                    }}
                  >
                    {file.image && (
                      <Image
                        src={imageUrl(file.image).url()}
                        alt='category-image'
                        className='object-cover flex-shrink-0 rounded-lg w-full h-full'
                        width={410}
                        height={400}
                        sizes='(max-width: 640px) 100vw,
                               (max-width: 768px) 50vw,
                               (max-width: 1024px) 33vw,
                               25vw'
                      />
                    )}
                    <div className='w-full h-full top-0 left-0 absolute z-10 bg-black bg-opacity-35 flex justify-start items-end transition-all duration-500 group-hover:bg-opacity-45'>
                      {description && (
                        <p className='text-body-grey p-2 text-base'>
                          {description[0]?.children &&
                            description[0].children
                              .map((child: any) => child.text)
                              .join(' ')
                              .slice(0, 20)}
                          ...
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className='relative rounded-lg group overflow-hidden cursor-pointer'
                    key={key}
                    onClick={() => {
                      setTargetProof({
                        media: file.video,
                        blockText: description,
                        type: 'video',
                      });
                      setContentPopup(true);
                    }}
                  >
                    {file.thumbnail && (
                      <Image
                        src={imageUrl(file.thumbnail).url()}
                        alt='Category-video'
                        className='object-cover flex-shrink-0 rounded-lg w-full h-full'
                        width={410}
                        height={400}
                        sizes='(max-width: 640px) 100vw,
                               (max-width: 768px) 50vw,
                               (max-width: 1024px) 33vw,
                               25vw'
                      />
                    )}
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-body-main z-20'>
                      <Play />
                    </div>

                    <div className='w-full h-full top-0 left-0 absolute z-10 bg-black bg-opacity-35 flex justify-start items-end transition-all duration-500 group-hover:bg-opacity-45'>
                      {description && (
                        <p className='text-body-grey p-2 text-base'>
                          {description[0]?.children &&
                            description[0].children
                              .map((child: any) => child.text)
                              .join(' ')
                              .slice(0, 20)}
                          ...
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <Loader classes='!h-[250px]' />
        )}
      </div>

      {mode === 'short' && (
        <div className='py-8 w-full flex items-center justify-center text-center'>
          <Link
            href={'/18feb/proofs'}
            className='text-primary-main transition-all duration-300 opacity-70 hover:opacity-100 underline underline-offset-2 hover:underline hover:underline-offset-4 text-xl flex items-center group'
          >
            <span> আরো দেখুন</span>{' '}
            <ChevronRight className='group-hover:translate-x-1 transition-transform duration-300' />
          </Link>
        </div>
      )}

      {contentPopup && (
        <ContentPopup
          blockText={targetProof.blockText}
          media={targetProof.media}
          type={targetProof.type}
          setContentPopup={setContentPopup}
        />
      )}
    </div>
  );
};

export default Proof;
