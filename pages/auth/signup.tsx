import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '../../components/markup/Head';
import Logo from '../../components/markup/Logo';
import SideView from '../../components/markup/SideView';
import Button from '../../components/reusable/Button';
import TextField from '../../components/reusable/TextField';

import styles from '../../styles/pages/auth/Signup.module.css';

const Signup: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Header title='Signup' />
      <div className={styles.container}>
        <SideView />
        <div className={styles.formContainer}>
          <Logo className={styles.formLogo} />
          <span className={styles.textBold}>Happening Now</span>
          <span className={styles.textMedium}>Join ZPlatform today.</span>
          <form className={styles.form}>
            <TextField placeholder='Name' name='name' type='text' />
            <TextField placeholder='Email' name='email' type='email' />
            <TextField placeholder='Password' name='password' type='password' />
            <Button label='Signup' className='bg-black text-[#F2F8F7]' />
          </form>
          <span className={styles.textMedium}>
            Already have an account&#63;
          </span>
          <Button
            label='Login'
            className='my-2 bg-[#F2F8F7] text-black'
            onClick={() => router.push('/auth/login')}
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
