import axios from 'axios';

import { types } from '../types';
import { clearErrors, getErrors } from '../errors/errors';
import { Dispatch } from 'redux';

export interface UserProps {
  name?: string;
  email: string;
  password: string;
}

export const authenicateUser =
  (values: UserProps, authState: string) => async (dispatch: Dispatch<any>) => {
    dispatch(clearErrors());
    dispatch(isLoading());
    const { name, email, password } = values;
    try {
      let res;
      if (authState === 'signup') {
        res = await axios.post('/api/auth/signup', { name, email, password });
      } else if (authState === 'login') {
        res = await axios.post('/api/auth/login', { email, password });
      }
      localStorage.setItem('token', res?.data.token);
      localStorage.setItem('user', res?.data.data);
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: {
          token: res?.data.token,
          user: res?.data.data,
          message: res?.data.message,
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

export const forgotPassword = (email: string) => async (dispatch: Dispatch<any>) => {
  dispatch(clearErrors());
  dispatch(isLoading());
  try {
    const res = await axios.post('/api/auth/forgot_password', { email });
    dispatch({
      type: types.FORGOT_PASSWORD_SUCCESS,
      payload: {
        message: res?.data.message,
      },
    });
  } catch (error: any) {
    dispatch(clearErrors());
    dispatch(
      getErrors(`${error ? error.response.data.error : 'Something went wrong'}`)
    );
  }
};

export const resetPassword =
  (password: string, confirm_password: string, token: string) =>
  async (dispatch: Dispatch<any>) => {
    dispatch(clearErrors());
    dispatch(isLoading());
    try {
      const res = await axios.post('/api/auth/reset_password', {
        password,
        confirm_password,
        token,
      });
      dispatch({
        type: types.FORGOT_PASSWORD_SUCCESS,
        payload: {
          message: res?.data.message,
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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {
    type: types.LOGOUT_SUCCESS,
  };
};

export const isLoading = () => {
  clearErrors();
  return {
    type: types.IS_LOADING,
  };
};
