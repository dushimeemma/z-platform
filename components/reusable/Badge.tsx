import React from 'react';

import styles from '../../styles/components/reusable/Badge.module.css';

interface Props{
    label: string;
    className: string;
}

const Badge = ({ label , className }: Props) => {
  return (
    <button
      type='button'
      className={`${styles.container} ${className}`}
    >
      {label}
    </button>
  );
};

export default Badge;
