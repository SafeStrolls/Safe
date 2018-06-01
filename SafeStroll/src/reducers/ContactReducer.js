import {
  CONTACTS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACTS_FETCH_SUCCESS:
     console.log(action.payload);
     console.log('action.payload ovan');
      return action.payload;
    default:
      return state;
  }
};
