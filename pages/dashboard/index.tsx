import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/markup/Head';
import Logo from '../../components/markup/Logo';
import Badge from '../../components/reusable/Badge';
import Button from '../../components/reusable/Button';
import UserProfileItem from '../../components/reusable/UserProfileItem';

import styles from '../../styles/pages/dashboard/Dashboard.module.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/types';
import Alert from '../../components/reusable/Alert';
import { logout } from '../../store/actions/auth/auth';
import { getProfile } from '../../store/actions/profile/profile';
import moment from 'moment';
import { approveDocs } from '../../store/actions/verify_account/verify_account';

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { message: authMessage, isLoading: authLoading } = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  const { error } = useSelector(
    (state: AppState) => state.errors,
    shallowEqual
  );
  const {
    message: profileMessage,
    isLoading: profileLoading,
    user,
  } = useSelector((state: AppState) => state.profile, shallowEqual);

  const { message: verifyAccountMessage, isLoading: verifyAccountLoading } =
    useSelector((state: AppState) => state.verifyAccount, shallowEqual);

  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/auth/login');
    }
  });

  useEffect(() => {
    dispatch<any>(getProfile());
  }, []);

  console.log({ user });
  

  return (
    <>
      {(error || profileMessage) && (
        <Alert error={error} message={profileMessage} />
      )}
      <Header title='Dashboard' />
      <button
        type='button'
        onClick={() => setShowSidebar(!showSidebar)}
        className='m-5 md:hidden'
      >
        <img src='/assets/icons/dots.png' alt='user' />
      </button>
      <div
        className={styles.container}
      >
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
                  dispatch(logout());
                  router.push('/auth/login');
                }}
              >
                <span className={styles.logoutCardText}>logout</span>
              </div>
            )}
            <div className={styles.logoutCard}>
              <img src='/assets/icons/user_rounded.png' alt='user' />
              <span className={styles.logoutCardText}>{user?.name}</span>
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
              src={`${
                user && user.profileImage
                  ? user.profileImage
                  : process.env.NEXT_PUBLIC_SAMPLE_IMAGE_URL
              }`}
              alt='user'
              className={styles.asideAvatar}
            />
            <Button
              label='Edit Profile'
              className='bg-black text-white my-2'
              onClick={() => router.push('/dashboard/edit_profile')}
            />
          </div>
          <span className={styles.username}>{user?.name}</span>
          <div className={styles.userDetailsContainer}>
            {user && user.gender && (
              <UserProfileItem
                src='/assets/icons/gender.png'
                label={user.gender}
                alt='gender'
              />
            )}
            {user && user.dateOfBirth && (
              <UserProfileItem
                src='/assets/icons/calender.png'
                label={`${moment(user.dateOfBirth).format('MMM Do YY')}`}
                alt='date'
              />
            )}
            {user && user.age && (
              <UserProfileItem
                src='/assets/icons/age.png'
                label={`${user.age}`}
                alt='age'
              />
            )}

            {user && user.maritalStatus && (
              <UserProfileItem
                src='/assets/icons/marital_status.png'
                label={user.maritalStatus}
                alt='marital status'
              />
            )}
            {user && user.nationality && (
              <UserProfileItem
                src='/assets/icons/country.png'
                label={user.nationality}
                alt='country'
              />
            )}
          </div>
          {user && user.isVerified && (
            <div className={styles.badgeContainer}>
              <img src='/assets/icons/verified.png' alt='user' />
              <span className={styles.badgeLabel}>{user.isVerified}</span>
              <Badge
                label={
                  user.isVerified === 'unverified'
                    ? 'Verify your account'
                    : user.isVerified === 'pending verification'
                    ? 'Approve your docs'
                    : 'View your docs'
                }
                className={`${
                  user.isVerified === 'unverified'
                    ? 'text-[#3043F0] border-[#3043F0]'
                    : user.isVerified === 'pending verification'
                    ? 'text-[#FEE102] border-[#FEE102]'
                    : 'text-black border-black'
                } `}
                onClick={() => {
                  if (user.isVerified === 'unverified') {
                    router.push('/dashboard/verify_account');
                  } else if (user.isVerified === 'pending verification') {
                    dispatch<any>(approveDocs());
                    if (
                      verifyAccountMessage == 'account approved successfully'
                    ) {
                      router.push('/dashboard');
                      dispatch<any>(getProfile());
                    }
                  } else {
                    return;
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
