'use client';

import { LargeTextWithBullets } from '@/components/custom/TextWithBullets';
import { imageUrl } from '@/components/lib/imageUrl';
import { PortableText } from 'next-sanity';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useDocumentHeight from '@/hooks/useDocumentHeight';

gsap.registerPlugin(ScrollTrigger);

const Timeline = ({ timelines }: { timelines: any }) => {
  const timelineRef = useRef(null);
  const documentHeight = useDocumentHeight();

  useEffect(() => {
    if (!timelineRef.current) return;

    const timelineParent: any = timelineRef.current;
    const details: any = gsap.utils.toArray('.info-content:not(:first-child)');
    const photos: any = gsap.utils.toArray('.photo-content:not(:first-child)');

    gsap.set(photos, { yPercent: 50, opacity: 0 });
    const allPhotos: any = gsap.utils.toArray('.photo-content');

    // Kill existing ScrollTriggers before creating new ones
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Use gsap.matchMedia for responsive handling
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // GSAP animations and scroll trigger only run for large screens
      ScrollTrigger.create({
        trigger: timelineParent,
        start: 'top top',
        end: 'bottom bottom',
        pin: timelineParent.querySelector('.right-content'),
        markers: false,
      });

      details.forEach((detail: any, index: number) => {
        let detailText = detail.querySelector('.detail-text');
        let animation = gsap
          .timeline()
          .to(photos[index], { yPercent: 0, opacity: 1 })
          .set(allPhotos[index], { autoAlpha: 0, opacity: 0 });

        ScrollTrigger.create({
          trigger: detailText,
          start: 'top 80%',
          end: 'top 50%',
          animation: animation,
          scrub: true,
          markers: false,
        });
      });

      return () => {};
    });

    // Cleanup GSAP and ScrollTrigger when the component unmounts
    return () => {
      // mm.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [documentHeight]);

  return (
    <div className='my-32 max-width-small 2xl:max-w-med w-full grid gap-16 sec-x-padding'>
      <div className='grid gap-12 text-center'>
        <h2 className='font-cheading section-heading'>ঘটনার সময়রেখা</h2>
      </div>

      {/* Large screen layout */}
      <div
        ref={timelineRef}
        className='hidden md:flex w-full min-h-screen gap-4 justify-between'
      >
        <div className='flex w-[50%] 2xl:w-[40%] flex-col items-center left-content'>
          {timelines.map((timeline: any, key: number) => (
            <div
              key={key}
              className='min-h-screen flex items-center justify-end w-full -translate-y-12 info-content'
            >
              <LargeTextWithBullets
                text={
                  <div className='prose max-w-none mb-6 md:px-2'>
                    {Array.isArray(timeline.description) && (
                      <PortableText value={timeline.description} />
                    )}
                  </div>
                }
                classes='!justify-center md:justify-start detail-text'
              />
            </div>
          ))}
        </div>

        <div className='w-full md:w-[50%] 2xl:w-[60%] h-screen flex items-center rounded-xl right-content'>
          <div className='relative flex overflow-hidden items-center justify-center w-full h-full desktop-photos'>
            {timelines.map((timeline: any, key: number) => (
              <img
                key={key}
                src={imageUrl(timeline.image).url()}
                alt='timeline Image'
                className='object-cover flex-shrink-0 max-w-[95%] 2xl:max-w-[80%] rounded-lg w-full h-auto absolute photo-content'
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile screen layout */}
      <div className='md:hidden grid gap-14'>
        {timelines.map((timeline: any, key: number) => (
          <div key={key} className='flex w-full flex-col items-start'>
            <LargeTextWithBullets
              text={
                <div className='prose max-w-none mb-4 px-4'>
                  {Array.isArray(timeline.description) && (
                    <PortableText value={timeline.description} />
                  )}
                </div>
              }
              classes='!gap-1'
            />

            <img
              src={imageUrl(timeline.image).url()}
              alt='timeline Image'
              className='object-contain m-auto w-full max-w-[95%] rounded-lg h-auto'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
