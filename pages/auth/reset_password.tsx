import { Formik } from 'formik';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Header from '../../components/markup/Head';
import Logo from '../../components/markup/Logo';
import SideView from '../../components/markup/SideView';
import Alert from '../../components/reusable/Alert';
import Button from '../../components/reusable/Button';
import TextField from '../../components/reusable/TextField';
import { validationResetPasswordSchema } from '../../helpers/validations/auth';
import { resetPassword } from '../../store/actions/auth/auth';
import { clearErrors } from '../../store/actions/errors/errors';
import { AppState } from '../../store/types';

import styles from '../../styles/pages/auth/Signup.module.css';

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const token = router.query.token;
  const dispatch = useDispatch();
  const { message, isLoading } = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  const { error } = useSelector(
    (state: AppState) => state.errors,
    shallowEqual
  );

  const handleResetPassword = (values: {
    password: string;
    confirm_password: string;
  }) => {
    const { password, confirm_password } = values;
    dispatch<any>(resetPassword(password, confirm_password, `${token}`));
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        router.push('/auth/login');
      }, 5000);
    }
  }, [message, error, isLoading]);

  return (
    <>
      {(error || message) && <Alert error={error} message={message} />}
      <Header title='Reset Password' />
      <div className={styles.container}>
        <SideView />
        <div className={styles.formContainer}>
          <Logo className={styles.formLogo} />
          <span className={styles.textBold}>Happening Now</span>
          <span className={styles.textMedium}>Reset password</span>
          <Formik
            initialValues={{ password: '', confirm_password: '' }}
            onSubmit={handleResetPassword}
            validationSchema={validationResetPasswordSchema}
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
                <div>
                  <TextField
                    placeholder='Comfirm password'
                    name='confirm_password'
                    type='password'
                    onBlur={handleBlur('confirm_password')}
                    onChange={handleChange('confirm_password')}
                    value={values.confirm_password}
                  />
                  {touched.confirm_password && errors.confirm_password && (
                    <span className='text-red-600'>
                      {errors.confirm_password}
                    </span>
                  )}
                </div>
                <Button
                  label='Save'
                  className='bg-black text-[#F2F8F7]'
                  type='submit'
                  isLoading={isLoading}
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

export default ResetPassword;
