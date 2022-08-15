import { Formik } from 'formik';
import moment from 'moment';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Header from '../../components/markup/Head';
import Logo from '../../components/markup/Logo';
import SideView from '../../components/markup/SideView';
import Alert from '../../components/reusable/Alert';
import Button from '../../components/reusable/Button';
import TextField from '../../components/reusable/TextField';
import { handleFileUpload } from '../../helpers/file_upload';
import { validationUpdateProfileSchema } from '../../helpers/validations/profile';
import { getProfile, updateProfile } from '../../store/actions/profile/profile';
import { AppState } from '../../store/types';

import styles from '../../styles/pages/dashboard/EditProfile.module.css';

const EditProfile: NextPage = () => {
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
    message: profileMessage,
    isLoading: profileLoading,
    user,
  } = useSelector((state: AppState) => state.profile, shallowEqual);

  const handleUpdateProfile = (values: any) => {
    dispatch<any>(
      updateProfile({
        ...values,
        profileImage: image
          ? image
          : process.env.NEXT_PUBLIC_SAMPLE_IMAGE_URL,
      })
    );
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/auth/login');
    }
  });

  useEffect(() => {
    dispatch<any>(getProfile());
  }, []);

  useEffect(()=>{
    if (profileMessage == 'user profile updated successfully') {
      router.push('/dashboard');
    }
  },[profileMessage])

  return (
    <>
      {(error || profileMessage) && (
        <Alert error={error} message={profileMessage} />
      )}
      <Header title='Edit Profile' />
      <div className={styles.container}>
        <SideView />
        <div className={`${styles.formContainer}`}>
          <Logo className={styles.formLogo} />
          <span className={`${styles.textMedium} my-10`}>Edit profile</span>
          <Formik
            initialValues={{
              // profileImage: user?.profileImage,
              gender: user?.gender,
              dateOfBirth: user?.dateOfBirth,
              maritalStatus: user?.maritalStatus,
              nationality: user?.nationality,
              name: user?.name,
            }}
            onSubmit={handleUpdateProfile}
            validationSchema={validationUpdateProfileSchema}
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
                  <select
                    name='gender'
                    className={styles.dashboardSelect}
                    onBlur={handleBlur('gender')}
                    onChange={handleChange('gender')}
                    value={values.gender}
                  >
                    <option>
                      {user && user.gender ? user.gender : 'Choose gender'}
                    </option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                  {touched.gender && errors.gender && (
                    <span className='text-red-600'>{errors.gender}</span>
                  )}
                </div>

                <div className='my-3' />
                {/* <TextField placeholder='Male' name='name' type='text' />
  <div className='my-3' /> */}
                <div>
                  <TextField
                    placeholder={`${user?.name}`}
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
                <div className='my-3' />
                <div>
                  <TextField
                    placeholder={`${
                      user && user.dateOfBirth
                        ? moment(user.dateOfBirth).format('MMM Do YY')
                        : 'Enter your date of birth'
                    }`}
                    name='date_of_birth'
                    type='date'
                    onBlur={handleBlur('dateOfBirth')}
                    onChange={handleChange('dateOfBirth')}
                    value={values.dateOfBirth}
                  />
                  {touched.dateOfBirth && errors.dateOfBirth && (
                    <span className='text-red-600'>{errors.dateOfBirth}</span>
                  )}
                </div>

                <div className='my-3' />

                <div>
                  <select
                    name='maritalStatus'
                    className={styles.dashboardSelect}
                    onBlur={handleBlur('maritalStatus')}
                    onChange={handleChange('maritalStatus')}
                    value={values.maritalStatus}
                  >
                    <option>
                      {user && user.maritalStatus
                        ? user.maritalStatus
                        : 'Choose marital status'}
                    </option>
                    <option value='Single'>Single</option>
                    <option value='Married'>Married</option>
                    <option value='Divorced/Widowed'>
                      Divorced&#47;Widowed
                    </option>
                  </select>
                  {touched.maritalStatus && errors.maritalStatus && (
                    <span className='text-red-600'>{errors.maritalStatus}</span>
                  )}
                </div>
                <div className='my-3' />
                <div>
                  <TextField
                    placeholder='Nationality'
                    name='nationality'
                    type='text'
                    onBlur={handleBlur('nationality')}
                    onChange={handleChange('nationality')}
                    value={values.nationality}
                  />
                  {touched.nationality && errors.nationality && (
                    <span className='text-red-600'>{errors.nationality}</span>
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
                              Drop your profile image
                            </span>
                          </div>
                        </div>
                        <input
                          className={styles.fileInput}
                          type='file'
                          accept='.png, .jpg, .jpeg, .svg'
                          placeholder='url'
                          onChange={async (e) => {
                            const imageUrl = await handleFileUpload(
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

export default EditProfile;
