import React, { useState, useEffect } from 'react';

export interface AlertProps {
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  error?: string;
  message?: string;
}

const Alert = ({ onClick, error, message }: AlertProps) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [error || message]);
  return (
    show ? (
      <span
        onClick={onClick}
        className={`fixed bottom-5 left-5 px-5 py-2 cursor-pointer z-40 bg-white ${
          error
            ? 'text-red-600 border-2 border-red-600'
            : message
            ? 'text-green-600 border-2 border-green-600'
            : 'hidden'
        }`}
      >
        {error ? error : message ? message : null}
      </span>): null
    )
};

export default Alert;
