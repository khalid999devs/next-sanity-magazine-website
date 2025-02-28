'use client';

import { dubarBanglaStatue, LocationPointIcon } from '@/assets';
import { SmallTextWithBullets } from '@/components/custom/TextWithBullets';
import { imageUrl } from '@/components/lib/imageUrl';
import { February, SanityImageAsset, Slug } from '@/sanity.types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

type Props = {
  title: string | null;
  subtitle: string | null;
  slug?: Slug | null;
  images: any;
};

const Hero = ({ title, subtitle, slug, images }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate images for seamless infinite scrolling
  const duplicatedImages = useMemo(
    () => (images ? [...images, ...images] : []),
    [images]
  );

  useEffect(() => {
    if (!trackRef.current || !duplicatedImages.length) return;

    const track = trackRef.current;
    let ctx: gsap.Context | null = null;
    let animation: gsap.core.Tween | null = null;

    const initAnimation = (speed: number) => {
      if (!track) return;

      const originalWidth = track.scrollWidth / 2;

      ctx = gsap.context(() => {
        animation = gsap.to(track, {
          x: -originalWidth,
          duration: speed,
          ease: 'none',
          repeat: -1,
        });

        const handleMouseEnter = () => animation?.pause();
        const handleMouseLeave = () => animation?.resume();

        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);

        const resizeObserver = new ResizeObserver(() => {
          const newWidth = track.scrollWidth / 2;
          if (animation) {
            animation.vars.x = -newWidth;
            animation.invalidate();
            animation.restart();
          }
        });

        resizeObserver.observe(track);

        return () => {
          resizeObserver.disconnect();
          track.removeEventListener('mouseenter', handleMouseEnter);
          track.removeEventListener('mouseleave', handleMouseLeave);
        };
      }, track);
    };

    let mm = gsap.matchMedia();
    mm.add('(min-width: 1460px)', () => initAnimation(45)); // Slower for large screens
    mm.add('(min-width: 1041px)', () => initAnimation(40)); // Slower for large screens
    mm.add('(max-width: 1040px)', () => initAnimation(30)); // Faster for smaller screens

    const images = Array.from(track.querySelectorAll('img'));
    images.forEach((img) => {
      if (!img.complete) {
        img.onload = () => {
          console.log('Image loaded, updating animation');
          if (animation) {
            const newWidth = track.scrollWidth / 2;
            animation.vars.x = -newWidth;
            animation.invalidate();
            animation.restart();
          }
        };
      }
    });

    return () => {
      ctx?.revert();
      animation?.kill();
    };
  }, [duplicatedImages]);

  return (
    <div className='h-auto w-full flex flex-col gap-1 relative min-h-screen'>
      {/* Hero Background */}
      <Image
        className='max-w-[650px] 2xl:max-w-[700px] min-w-[350px] w-full absolute left-1/2 top-[50px] 2xl:top-[10px] -translate-x-1/2 -z-10'
        src={dubarBanglaStatue}
        alt='durbar'
        priority
      />
      <div className='min-h-[500px] h-screen relative flex items-center justify-center sec-x-padding -translate-y-8'>
        <div className='grid place-items-center gap-10 2xl:gap-12 max-w-[900px] xl:max-w-[950px] w-full translate-y-8 2xl:-translate-y-8'>
          <div className='grid place-items-center gap-7 2xl:gap-9'>
            <div className='flex items-center gap-3.5'>
              <Image
                src={LocationPointIcon}
                alt=''
                className='w-8 text-primary-main'
              />
              <h2 className='text-primary-main text-lg md:text-2xl 2xl:text-3xl'>
                {subtitle || '১৮ ফেব্রুয়ারি ২০২৫'}
              </h2>
            </div>
            <h1 className='text-5xl md:text-7xl 2xl:text-[85px] font-cheading text-center'>
              {title || 'কুয়েটের সাধারণ শিক্ষার্থীদের ওপর নৃশংস হামলা'}
            </h1>
            <div className='flex items-center gap-4 flex-wrap justify-center flex-row gap-y-1'>
              <SmallTextWithBullets
                text={'সন্ত্রাসী হামলায় ১৫০+ শিক্ষার্থী আহত'}
              />
              <SmallTextWithBullets text={'প্রাণনাশের চেষ্টা'} />
              <SmallTextWithBullets text={'বিচার চাই'} />
            </div>
          </div>
          <Link href={'#proof'} className='btn'>
            প্রমাণ দেখুন
          </Link>
        </div>
      </div>

      {/* Infinite Image Slider */}
      {images?.length > 0 && (
        <div className='flex flex-row w-full mb-8 overflow-x-hidden items-center justify-center -translate-y-12 2xl:-translate-y-24'>
          <div
            ref={trackRef}
            className='flex flex-row gap-1 relative h-[300px] md:h-[350px] lg:h-[400px] w-max whitespace-nowrap'
          >
            {duplicatedImages?.map((image: any, key: number) => (
              <div key={key} className='relative !h-full w-fit flex-shrink-0'>
                <Image
                  src={imageUrl(image).url()}
                  alt='show image'
                  className='object-cover rounded-lg !h-full w-fit'
                  width={500}
                  height={600}
                  sizes='(max-width: 640px) 100vw,
                 (max-width: 768px) 50vw,
                 (max-width: 1024px) 33vw,
                 25vw'
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
