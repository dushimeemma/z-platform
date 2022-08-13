import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../../components/markup/Head';
import Logo from '../../../components/markup/Logo';
import SideView from '../../../components/markup/SideView';
import Button from '../../../components/reusable/Button';
import TextField from '../../../components/reusable/TextField';
import styles from '../../../styles/pages/auth/verify/Login.module.css';

const LoginVerification: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Header title='Login | Verification' />
      <div className={styles.container}>
        <SideView />
        <div className={styles.formContainer}>
          <Logo className={styles.formLogo} />
          <span className={styles.textBold}>Happening Now</span>
          <span className={styles.textMedium}>Join ZPlatform today.</span>
          <form className={styles.form}>
            <TextField placeholder='Enter OTP' name='otp' type='password' />
            <Button
              label='Login'
              className='bg-black text-[#F2F8F7]'
              onClick={() => router.push('/dashboard')}
            />
          </form>
          <span className={styles.textMedium}>
            Don&#39;t have an account&#63;{' '}
            <Link href='/'>
              <a className={styles.signupLink}>Signup</a>
            </Link>
          </span>
          <Button
            label='Forget password?'
            className='my-2 bg-[#F2F8F7] text-black'
            onClick={() => router.push('/auth/forgot_password')}
          />
        </div>
      </div>
    </>
  );
};

export default LoginVerification;
