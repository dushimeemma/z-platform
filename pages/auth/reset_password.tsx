import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '../../components/markup/Head';
import Logo from '../../components/markup/Logo';
import SideView from '../../components/markup/SideView';
import Button from '../../components/reusable/Button';
import TextField from '../../components/reusable/TextField';

import styles from '../../styles/pages/auth/Signup.module.css';

const ResetPassword: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Header title='Reset Password' />
      <div className={styles.container}>
        <SideView />
        <div className={styles.formContainer}>
          <Logo className={styles.formLogo} />
          <span className={styles.textBold}>Happening Now</span>
          <span className={styles.textMedium}>Reset password</span>
          <form className={styles.form}>
            <TextField placeholder='Enter new password' name='password' type='password' />
            <TextField placeholder='Confirm password' name='confirmPassword' type='password' />
            <Button label='Save' className='bg-black text-[#F2F8F7]' />
          </form>
          <Button
            label='Login'
            className='my-10 bg-[#F2F8F7] text-black'
            onClick={() => router.push('/auth/login')}
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;