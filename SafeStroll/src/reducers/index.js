import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ContactFormReducer from './ContactFormReducer';
import ContactReducer from './ContactReducer';
import UserReducer from './UserReducer';
import UsernameReducer from './UsernameReducer';
import LocationReducer from './LocationReducer';
import ChosenReducer from './ChosenReducer';

export default combineReducers({
  auth: AuthReducer,
  contactForm: ContactFormReducer,
  contacts: ContactReducer,
  users: UserReducer,
  usernames: UsernameReducer,
  currentLoc: LocationReducer,
  chosenContacts: ChosenReducer
});
