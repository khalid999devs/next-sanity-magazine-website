import { Logo } from '@/assets';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MobileNav = ({
  setIsMobileNav,
}: {
  setIsMobileNav: (prev: boolean) => void;
}) => {
  const closeMobileNav = () => setIsMobileNav(false);

  return (
    <div className='w-full fixed top-0 left-0 z-50 min-h-[400px] h-screen bg-body-main'>
      <div className='flex max-width-medium w-full sec-x-padding justify-between items-center py-2 lg:py-3 2xl:py-4'>
        <Link href={'/'} className='logo'>
          <Image
            className='object-contain max-w-[120px] 2xl:max-w-[150px] w-fit'
            src={Logo}
            alt='Logo'
          />
        </Link>
        <div className='flex md:hidden'>
          <button
            className='btn !px-2 !py-1.5'
            onClick={() => setIsMobileNav(false)}
          >
            <X />
          </button>
        </div>
      </div>

      <div className='w-full h-full flex flex-col gap-4 py-8 pl-2 justify-star items-center'>
        <Link
          href={'/our-voice'}
          className='text-xl cursor-pointer hover:underline underline-offset-4 transition-all duration-300'
          onClick={closeMobileNav}
        >
          আমাদের কথা
        </Link>
        <Link
          href={'/documentary'}
          className='text-xl cursor-pointer hover:underline underline-offset-4 transition-all duration-300'
          onClick={closeMobileNav}
        >
          ডকুমেন্টারী
        </Link>
        <Link
          className='btn !text-xl mt-2 inline-block'
          href={'#'}
          onClick={closeMobileNav}
        >
          প্রমাণ দেখুন
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
