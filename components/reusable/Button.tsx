import React from 'react';

import styles from '../../styles/components/reusable/Button.module.css';

interface Props {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement> | any;
  label: string;
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ label, className, onClick, type='button' }: Props) => {
  return (
    <button
      type={type}
      className={`${styles.container} w-[17.438rem] h-[2.863rem] ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
