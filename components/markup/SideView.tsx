import React from 'react';

import Logo from './Logo';

import styles from '../../styles/components/markup/SideView.module.css';

const SideView = () => {
  return (
    <div className={styles.logo}>
      <Logo />
    </div>
  );
};

export default SideView;
