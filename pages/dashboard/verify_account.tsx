import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '../../components/markup/Head';
import Logo from '../../components/markup/Logo';
import SideView from '../../components/markup/SideView';
import Button from '../../components/reusable/Button';
import TextField from '../../components/reusable/TextField';

import styles from '../../styles/pages/dashboard/EditProfile.module.css';

const VerifyAccount: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Header title='Verify Account' />
      <div className={styles.container}>
        <SideView />
        <div className={`${styles.formContainer}`}>
          <Logo className={styles.formLogo} />
          <span className={`${styles.textMedium} my-10`}>Edit profile</span>
          <form className={styles.form}>
            <TextField
              placeholder='Enter your national id number/password'
              name='identity'
              type='text'
            />
            <div className='my-3' />
            <div className={styles.fileInputContainer}>
              <div className='md:flex'>
                <div className='w-full mb-5'>
                  <div className={styles.fileInputWrapper}>
                    <div className='absolute'>
                      <div className={`z-20 ${styles.fileInputTitleContainer}`}>
                        <span className={styles.fileInputText}>
                          Drop your passport/identity
                        </span>
                      </div>
                    </div>
                    <input
                      className={styles.fileInput}
                      type='file'
                      accept='.png, .jpg, .jpeg, .svg'
                      placeholder='url'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='my-3' />
            <Button
              label='Save'
              className='bg-black text-[#F2F8F7]'
              type='submit'
            />
          </form>
          <Button
            label='Cancel'
            className='bg-red-500 text-[#F2F8F7]'
            onClick={() => router.push('/dashboard')}
          />
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
