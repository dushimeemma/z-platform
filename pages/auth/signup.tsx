import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Formik } from 'formik';

import Header from '../../components/markup/Head';
import Logo from '../../components/markup/Logo';
import SideView from '../../components/markup/SideView';
import Button from '../../components/reusable/Button';
import TextField from '../../components/reusable/TextField';
import styles from '../../styles/pages/auth/Signup.module.css';
import { validationSignupSchema } from '../../helpers/validations/auth';
import { AppState } from '../../store/types';
import { authenicateUser, UserProps } from '../../store/actions/auth/auth';
import { clearErrors } from '../../store/actions/errors/errors';
import Alert from '../../components/reusable/Alert';

const Signup: NextPage = () => {
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
    if (name) {
      dispatch<any>(authenicateUser(values, 'signup'));
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
      {(error || message) && <Alert error={error} message={message} />}
      <Header title='Signup' />
      <div className={styles.container}>
        <SideView />
        <div className={styles.formContainer}>
          <Logo className={styles.formLogo} />
          <span className={styles.textBold}>Happening Now</span>
          <span className={styles.textMedium}>Join ZPlatform today.</span>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={handleAuthentication}
            validationSchema={validationSignupSchema}
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
                    placeholder='Name'
                    name='name'
                    type='text'
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <span className='text-red-600'>{errors.name}</span>
                  )}
                </div>
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
                  label='Signup'
                  className='bg-black text-[#F2F8F7]'
                  type='submit'
                  isLoading={isLoading}
                />
              </form>
            )}
          </Formik>

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
