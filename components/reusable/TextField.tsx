import React from 'react';

import styles from '../../styles/components/reusable/TextField.module.css';

interface Props {
  className?: string;
  placeholder: string;
  name: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  value?: any;
}

const TextField = ({
  className,
  placeholder,
  name,
  type,
  onChange,
  onBlur,
  value,
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${styles.container} ${className}`}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  );
};

export default TextField;
