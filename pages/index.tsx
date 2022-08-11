import type { NextPage } from 'next';
import Header from '../components/markup/Head';
import Logo from '../components/markup/Logo';
import Button from '../components/reusable/Button';
import TextField from '../components/reusable/TextField';
import styles from '../styles/pages/Signup.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Header title='Signup' />
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.formContainer}>
          <Logo className={styles.formLogo} />
          <span className={styles.textBold}>Happening Now</span>
          <span className={styles.textMedium}>Join ZPlatform today.</span>
          <form className={styles.form}>
            <TextField placeholder='Name' name='name' type='text' />
            <TextField placeholder='Email' name='email' type='email' />
            <TextField placeholder='Password' name='password' type='password' />
            <Button label='Signup' />
          </form>
          <span className={styles.textMedium}>Already have an account?</span>
          <Button label='Signin' className='my-2 bg-[#F2F8F7] text-black' />
        </div>
      </div>
    </>
  );
};

export default Home;
