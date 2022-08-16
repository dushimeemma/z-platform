import React from 'react';

const Loading = () => {
  return (
    <div className='flex z-50 fixed top-0 left-0 bg-transparent h-screen w-screen justify-center items-center'>
      <span className='text-black font-bold font-montserrat'>Loading...</span>
    </div>
  );
};

export default Loading;
