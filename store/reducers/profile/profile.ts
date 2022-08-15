import { Profile } from '../../types';
import { types } from '../../actions/types';

const initialState: Profile = {
  user: null,
  isLoading: false,
  message: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        user: action.payload.profile,
      };
    case types.GET_ERRORS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
