import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/markup/Head';
import Logo from '../../components/markup/Logo';
import Badge from '../../components/reusable/Badge';
import Button from '../../components/reusable/Button';
import UserProfileItem from '../../components/reusable/UserProfileItem';

import styles from '../../styles/pages/dashboard/Dashboard.module.css';

const Dashboard = () => {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <>
      <Header title='Dashboard' />
      <button
        type='button'
        onClick={() => setShowSidebar(!showSidebar)}
        className='m-5 md:hidden'
      >
        <img src='/assets/icons/dots.png' alt='user' />
      </button>
      <div className={styles.container}>
        <div
          className={`${styles.sidebar} ${
            showSidebar ? 'fixed top-0 left-0 z-20' : 'hidden'
          } md:flex`}
        >
          <div>
            <button
              type='button'
              onClick={() => setShowSidebar(!showSidebar)}
              className='m-5 md:hidden'
            >
              <img src='/assets/icons/dots.png' alt='user' />
            </button>
            <Logo />
            <div className={styles.sidebarList}>
              <img src='/assets/icons/user.png' alt='user' className='mr-3' />
              <span className={styles.sidebarListItem}>Profile</span>
            </div>
          </div>
          <div className='fixed bottom-5 left-5 md:block'>
            {showLogout && (
              <div
                className={styles.logout}
                onClick={() => {
                  setShowLogout(false);
                  router.push('/auth/login');
                }}
              >
                <span className={styles.logoutCardText}>logout</span>
              </div>
            )}
            <div className={styles.logoutCard}>
              <img src='/assets/icons/user_rounded.png' alt='user' />
              <span className={styles.logoutCardText}>Emmanuel Dushime</span>
              <button type='button' onClick={() => setShowLogout(!showLogout)}>
                <img src='/assets/icons/dots.png' alt='user' />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.asideTop} />
          <div className={styles.asideAvatarContainer}>
            <img
              src='/assets/icons/user_rounded_lg.png'
              alt='user'
              className={styles.asideAvatar}
            />
            <Button
              label='Edit Profile'
              className='bg-black text-white my-2'
              onClick={() => router.push('/dashboard/edit_profile')}
            />
          </div>
          <span className={styles.username}>Emmanuel Dushime</span>
          <div className={styles.userDetailsContainer}>
            <UserProfileItem
              src='/assets/icons/gender.png'
              label='Male'
              alt='gender'
            />
            <UserProfileItem src='/assets/icons/age.png' label='28' alt='age' />
            <UserProfileItem
              src='/assets/icons/calender.png'
              label='October 1 2022'
              alt='date'
            />
            <UserProfileItem
              src='/assets/icons/marital_status.png'
              label='Single'
              alt='marital status'
            />
            <UserProfileItem
              src='/assets/icons/country.png'
              label='Rwanda'
              alt='country'
            />
          </div>
          <div className={styles.badgeContainer}>
            <img src='/assets/icons/verified.png' alt='user' />
            <span className={styles.badgeLabel}>Verified</span>
            <Badge
              label='View your docs'
              className='text-black border-black'
              onClick={() => router.push('/dashboard/verify_account')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
