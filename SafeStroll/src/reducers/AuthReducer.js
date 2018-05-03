import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SIGN_UP_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  PROFILE_UPDATE
 } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGOUT_USER:
      return { ...state, INITIAL_STATE };
    case LOGOUT_USER_SUCCESS:
      return { ...state, INITIAL_STATE };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case SIGN_UP_FAIL:
      return { ...state,
        error: 'There is already an account with this email! Try a different one.',
        email: '',
        loading: false };
    case PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
