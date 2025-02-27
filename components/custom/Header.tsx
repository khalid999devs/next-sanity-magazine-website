'use client';
import { Logo } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useIsGreaterOrEqualMd from '@/hooks/useIsGreaterOrEqualMd';
import { Menu } from 'lucide-react';
import MobileNav from './MobileNav';

type Props = {};

const Header = (props: Props) => {
  const [isMobileNav, setIsMobileNav] = useState(false);

  useEffect(() => {
    if (isMobileNav === true) {
      document.body.style.overflow = 'hidden';
    } else if (isMobileNav === false) {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileNav]);

  return (
    <div className='w-full fixed top-0 left-0 z-50'>
      <div className='flex max-width-medium w-full sec-x-padding justify-between items-center py-2 lg:py-3 2xl:py-4'>
        <Link href={'/'} className='logo'>
          <Image
            className='object-contain max-w-[120px] xl:max-w-[150px] w-fit'
            src={Logo}
            alt='Logo'
          />
        </Link>
        <div className='hidden md:flex items-center gap-8'>
          <Link
            href={'/our-voice'}
            className='text-lg 2xl:text-xl cursor-pointer hover:underline underline-offset-4 transition-all duration-300'
          >
            আমাদের কথা
          </Link>
          <Link
            href={'/documentary'}
            className='text-lg 2xl:text-xl cursor-pointer hover:underline underline-offset-4 transition-all duration-300'
          >
            ডকুমেন্টারী
          </Link>
          <Link className='btn' href={'#'}>
            প্রমাণ দেখুন
          </Link>
        </div>
        <div className='flex md:hidden'>
          <button
            className='btn !px-2 !py-1.5'
            onClick={() => setIsMobileNav(true)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {isMobileNav && <MobileNav setIsMobileNav={setIsMobileNav} />}
    </div>
  );
};

export default Header;
