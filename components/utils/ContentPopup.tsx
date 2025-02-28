import Image from 'next/image';
import React from 'react';
import { imageUrl } from '../lib/imageUrl';
import { videoUrl } from '../lib/videoUrl';
import { PortableText } from 'next-sanity';
import { X } from 'lucide-react';

const ContentPopup = ({
  media,
  blockText,
  type,
  setContentPopup,
}: {
  media: any;
  blockText: any;
  type: 'image' | 'video';
  setContentPopup: (prev: boolean) => void;
}) => {
  return (
    <div className='bg-body-grey z-50 text-text-main rounded-xl p-6 pt-4 flex flex-col gap-5 w-[95vw] h-[98vh] overflow-y-auto fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
      <div className='w-full flex h-min justify-between'>
        <h2 className='font-cheading text-xl text-primary-main'>
          প্রমাণের বিস্তারিত
        </h2>
        <button
          className='text-4xl cursor-pointer rounded-md hover:bg-primary-main hover:text-body-main !px-2 !py-1.5'
          onClick={() => setContentPopup(false)}
        >
          <X />
        </button>
      </div>

      <div className='-mt-1 w-full'>
        {type === 'image' ? (
          <div
            className={`relative w-full  ${!media && 'bg-black'} rounded-xl`}
          >
            {media && (
              <Image
                src={imageUrl(media).url()}
                alt='category-image'
                className='object-contain flex-shrink-0 rounded-lg m-auto md:max-w-[70%] w-full'
                width={410}
                height={400}
                sizes='(max-width: 640px) 100vw,
                                     (max-width: 768px) 50vw,
                                     (max-width: 1024px) 33vw,
                                     25vw'
              />
            )}
          </div>
        ) : (
          <div
            className={`w-full relative min-h-[200px] ${!media && 'bg-black'} rounded-xl`}
          >
            {media && (
              <video
                controls
                className='rounded-lg w-auto m-auto max-h-[450px]'
              >
                <source src={videoUrl(media)} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>

      <div className='prose max-w-none mb-6 md:px-2'>
        {Array.isArray(blockText) && <PortableText value={blockText} />}
      </div>
    </div>
  );
};

export default ContentPopup;
