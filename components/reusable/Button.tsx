import React from 'react';

import styles from '../../styles/components/reusable/Button.module.css';

interface Props {
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ label, className, onClick }: Props) => {
  return (
    <button
      className={`${styles.container} ${className} text-white bg-black w-[17.438rem] h-[2.863rem]`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
