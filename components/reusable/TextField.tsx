import React from 'react';

import styles from '../../styles/components/reusable/TextField.module.css';

interface Props {
  className?: string;
  placeholder: string;
  name: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextField = ({ className, placeholder, name, type, onChange }: Props) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${styles.container} ${className}`}
      onChange={onChange}
    />
  );
};

export default TextField;
