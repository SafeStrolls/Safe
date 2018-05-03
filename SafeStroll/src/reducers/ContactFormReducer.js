import {
  CONTACT_UPDATE,
  CONTACT_CREATE,
  CONTACT_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CONTACT_CREATE:
      return INITIAL_STATE;
    case CONTACT_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
