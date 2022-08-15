import { combineReducers } from 'redux';

import auth from './auth/auth';
import errors from './errors/error';
import profile from './profile/profile';
import verifyAccount from './verify_account/verify_account';

export default combineReducers({
  auth,
  errors,
  profile,
  verifyAccount,
});
