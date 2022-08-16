import { Formik } from 'formik';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Header from '../../components/markup/Head';
import Loading from '../../components/markup/Loading';
import Logo from '../../components/markup/Logo';
import SideView from '../../components/markup/SideView';
import Alert from '../../components/reusable/Alert';
import Button from '../../components/reusable/Button';
import TextField from '../../components/reusable/TextField';
import { validationLoginSchema } from '../../helpers/validations/auth';
import { authenicateUser, UserProps } from '../../store/actions/auth/auth';
import { clearErrors } from '../../store/actions/errors/errors';
import { AppState } from '../../store/types';
import styles from '../../styles/pages/auth/Login.module.css';

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { message, isLoading } = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  const { error } = useSelector(
    (state: AppState) => state.errors,
    shallowEqual
  );

  const handleAuthentication = (values: UserProps) => {
    const { name } = values;
    if (name === undefined) {
      dispatch<any>(authenicateUser(values, 'login'));
    } else {
      return;
    }
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/dashboard');
    }
  });
  return (
    <>
      {isLoading && <Loading />}
      {(error || message) && <Alert error={error} message={message} />}
      <Header title='Login' />
      <div className={`${styles.container} ${isLoading ? 'bg-slate-300' : ''}`}>
        <SideView />
        <div className={styles.formContainer}>
          <Logo className={styles.formLogo} />
          <span className={styles.textBold}>Happening Now</span>
          <span className={styles.textMedium}>Join ZPlatform today.</span>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleAuthentication}
            validationSchema={validationLoginSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
            }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                  <TextField
                    placeholder='Email'
                    name='email'
                    type='email'
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <span className='text-red-600'>{errors.email}</span>
                  )}
                </div>

                <div>
                  <TextField
                    placeholder='Password'
                    name='password'
                    type='password'
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <span className='text-red-600'>{errors.password}</span>
                  )}
                </div>
                <Button
                  label='Login'
                  className='bg-black text-[#F2F8F7]'
                  type='submit'
                />
              </form>
            )}
          </Formik>

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

export default Login;
