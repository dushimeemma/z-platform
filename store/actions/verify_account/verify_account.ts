import axios from 'axios';

import { types } from '../types';
import { getErrors, clearErrors } from '../errors/errors';
import { isLoading } from '../auth/auth';
import { Dispatch } from 'redux';

export const verifyAccount =
  (values: any) => async (dispatch: Dispatch<any>) => {
    dispatch(clearErrors());
    dispatch(isLoading());
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('/api/account/verify', values, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: types.VERIFY_ACCOUNT_SUCCESS,
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

export const approveDocs = () => async (dispatch: Dispatch<any>) => {
  dispatch(clearErrors());
  dispatch(isLoading());
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('/api/account/approve', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: types.APPROVE_DOCS_SUCCESS,
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
