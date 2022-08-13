import React from 'react';

import styles from '../../styles/components/reusable/Badge.module.css';

interface Props {
  label: string;
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Badge = ({ label, className, onClick }: Props) => {
  return (
    <button
      type='button'
      className={`${styles.container} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Badge;
