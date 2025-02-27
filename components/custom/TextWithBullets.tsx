interface TextWithBullets {
  text: string;
  classes?: string;
}

const SmallTextWithBullets = ({ text, classes }: TextWithBullets) => {
  return (
    <div className={`flex items-center gap-3 w-max ${classes}`}>
      <span className='w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-primary-main'></span>
      <p className='text-lg 2xl:text-xl'>{text || 'Bullet text'}</p>
    </div>
  );
};

const LargeTextWithBullets = ({ text, classes }: TextWithBullets) => {
  return (
    <div className={`flex items-start justify-start gap-3 w-full ${classes}`}>
      <span className='w-3 2xl:w-3.5 h-3 mt-3 md:mt-2 2xl:h-3.5 rounded-full bg-primary-main'></span>
      <p className='text-xl leading-8 md:leading-9'>{text || 'Bullet text'}</p>
    </div>
  );
};

export { SmallTextWithBullets, LargeTextWithBullets };
