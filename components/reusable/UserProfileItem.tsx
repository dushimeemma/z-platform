import React from 'react';

import styles from '../../styles/components/reusable/UserProfileItem.module.css';

interface Props{
    src: string;
    alt?:string;
    label: string;
}

const UserProfileItem = ({ src, alt, label }: Props) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} />
      <span className={styles.wrapper}>
        {label}
      </span>
    </div>
  );
};

export default UserProfileItem;
