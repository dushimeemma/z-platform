import axios from 'axios';

import { types } from '../types';
import { getErrors, clearErrors } from '../errors/errors';
import { isLoading } from '../auth/auth';
import { Dispatch } from 'redux';

export const getProfile = () => async (dispatch: Dispatch<any>) => {
  dispatch(clearErrors());
  dispatch(isLoading());
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('/api/user/profile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: types.GET_PROFILE_SUCCESS,
      payload: {
        message: res.data.message,
        profile: res.data.data,
      },
    });
  } catch (error: any) {
    dispatch(clearErrors());
    dispatch(
      getErrors(`${error ? error.response.data.error : 'Something went wrong'}`)
    );
  }
};

export const updateProfile =
  (values: any) => async (dispatch: Dispatch<any>) => {
    dispatch(clearErrors());
    dispatch(isLoading());
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('/api/user/update_profile', values, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        payload: {
          message: res?.data.message,
          profile: res?.data.data,
        },
      });
    } catch (error: any) {
      dispatch(clearErrors());
      dispatch(
        getErrors(
          `${error ? error.response.data.error : 'Something went wrong'}`
        )
      );
    }
  };
