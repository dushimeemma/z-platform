import { Formik } from 'formik';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Header from '../../components/markup/Head';
import Logo from '../../components/markup/Logo';
import SideView from '../../components/markup/SideView';
import Button from '../../components/reusable/Button';
import TextField from '../../components/reusable/TextField';
import { handleDocsUpload, handleFileUpload } from '../../helpers/file_upload';
import { validationVerifyAccountSchema } from '../../helpers/validations/verify';
import { verifyAccount } from '../../store/actions/verify_account/verify_account';
import { AppState } from '../../store/types';

import styles from '../../styles/pages/dashboard/EditProfile.module.css';

const VerifyAccount: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>('');
  const { message: authMessage, isLoading: authLoading } = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  const { error } = useSelector(
    (state: AppState) => state.errors,
    shallowEqual
  );
  const {
    message: verifyAccountMessage,
    isLoading: verifyAccountLoading,
    user,
  } = useSelector((state: AppState) => state.verifyAccount, shallowEqual);

  const handleVerifyAccount = (values: any) => {
    dispatch<any>(
      verifyAccount({
        ...values,
        identityImage: image ? image : process.env.NEXT_PUBLIC_SAMPLE_IMAGE_URL,
      })
    );
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/auth/login');
    }
  });

  useEffect(() => {
    if (verifyAccountMessage == 'account under review successfully') {
      router.push('/dashboard');
    }
  }, [verifyAccountMessage]);
  return (
    <>
      <Header title='Verify Account' />
      <div className={styles.container}>
        <SideView />
        <div className={`${styles.formContainer}`}>
          <Logo className={styles.formLogo} />
          <span className={`${styles.textMedium} my-10`}>
            Verify your account
          </span>
          <Formik
            initialValues={{
              identity: '',
            }}
            onSubmit={handleVerifyAccount}
            validationSchema={validationVerifyAccountSchema}
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
                    placeholder='Enter your id number/password'
                    name='identity'
                    type='text'
                    onBlur={handleBlur('identity')}
                    onChange={handleChange('identity')}
                    value={values.identity}
                  />
                  {touched.identity && errors.identity && (
                    <span className='text-red-600'>{errors.identity}</span>
                  )}
                </div>
                <div className='my-3' />
                <div className={styles.fileInputContainer}>
                  <div className='md:flex'>
                    <div className='w-full mb-5'>
                      <div className={styles.fileInputWrapper}>
                        <div className='absolute'>
                          <div
                            className={`z-20 ${styles.fileInputTitleContainer}`}
                          >
                            <span className={styles.fileInputText}>
                              Drop your identity
                            </span>
                          </div>
                        </div>
                        <input
                          className={styles.fileInput}
                          type='file'
                          accept='.pdf'
                          placeholder='url'
                          onChange={async (e) => {
                            const imageUrl = await handleDocsUpload(
                              e.target.files
                            );
                            setImage(imageUrl);
                          }}
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
                  isLoading={verifyAccountLoading && !authLoading}
                />
              </form>
            )}
          </Formik>

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
