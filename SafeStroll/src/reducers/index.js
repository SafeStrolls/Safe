import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ContactFormReducer from './ContactFormReducer';
import ContactReducer from './ContactReducer';

export default combineReducers({
  auth: AuthReducer,
  contactForm: ContactFormReducer,
  contacts: ContactReducer
});
