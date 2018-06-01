import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SIGN_UP_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  PROFILE_UPDATE,
  USER_NAME_UPDATE,
  USER_SAVE_SUCCESS,
  SET_USER_ID,
  PHONE_UPDATE
 } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  userName: '',
  useruid: '',
  phone: ''
};

export default (state = INITIAL_STATE, action) => {
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
        error: 'There is already an account with this email, or your password is less than 6 characters. Try a different one.',
        email: '',
        password: '',
        loading: false };
    case PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_NAME_UPDATE:
      return { ...state,
              error: '',
              userName: action.payload };
    case USER_SAVE_SUCCESS:
      return { ...state };
    case SET_USER_ID:
      return { ...state };
    case PHONE_UPDATE:
      return { ...state, phone: action.payload };
    default:
      return state;
  }
};
