'use client';
import { useState, useEffect } from 'react';

function useIsGreaterOrEqualMd() {
  const [isGreaterOrEqualMd, setIsGreaterOrEqualMd] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsGreaterOrEqualMd(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isGreaterOrEqualMd;
}

export default useIsGreaterOrEqualMd;
