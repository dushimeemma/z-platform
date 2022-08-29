import React from 'react';

import { CircularProgress } from '@mui/material';

import styles from '../../styles/components/reusable/Button.module.css';

interface Props {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement> | any;
  label: string;
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?:boolean;
}

const Button = ({
  label,
  className,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
}: Props) => {
  return (
    <button
      type={type}
      className={`${styles.container} w-[17.438rem] h-[2.863rem] ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {!isLoading ? label: <CircularProgress color="inherit" />}
    </button>
  );
};

export default Button;
