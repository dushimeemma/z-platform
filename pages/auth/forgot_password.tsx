import { Formik } from 'formik';
import type { NextPage } from 'next';
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
import { validationForgotPasswordSchema } from '../../helpers/validations/auth';
import { forgotPassword } from '../../store/actions/auth/auth';
import { clearErrors } from '../../store/actions/errors/errors';
import { AppState } from '../../store/types';
import styles from '../../styles/pages/auth/Login.module.css';

const ForgotPassward: NextPage = () => {
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

  const handleForgotPassword = (values: { email: string }) => {
    const { email } = values;
    dispatch<any>(forgotPassword(email));
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {(error || message) && <Alert error={error} message={message} />}
      <Header title='Forgot Password' />
      <div className={`${styles.container} ${isLoading ? 'bg-slate-300' : ''}`}>
        <SideView />
        <div className={styles.formContainer}>
          <Logo className={styles.formLogo} />
          <span className={styles.textBold}>Happening Now</span>
          <span className={styles.textMedium}>Reset password</span>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={handleForgotPassword}
            validationSchema={validationForgotPasswordSchema}
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
                <Button
                  label='Send verification token'
                  className='bg-black text-[#F2F8F7]'
                  type='submit'
                />
              </form>
            )}
          </Formik>

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

export default ForgotPassward;
