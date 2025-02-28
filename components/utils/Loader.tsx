import React from 'react';

const Loader = ({ classes }: { classes?: string }) => {
  return (
    <div className={'flex justify-center items-center h-screen ' + classes}>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary-main border-opacity-80'></div>
    </div>
  );
};

export default Loader;
