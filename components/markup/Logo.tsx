import React from 'react';

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <img src='/assets/images/Logo.png' alt='zPlatform' className={className} />
  );
};

export default Logo;
