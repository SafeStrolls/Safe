import {
  UPDATE_LOCATION,
  UPDATE_USERS_LATITUDE,
  UPDATE_USERS_LONGITUDE,
  CHOSEN_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  latitude: null,
  longitude: null,
  currentLocation: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { ...state };
    case UPDATE_USERS_LATITUDE:
      return { ...state, latitude: action.payload };
    case UPDATE_USERS_LONGITUDE:
      return { ...state, longitude: action.payload };
    case CHOSEN_SAVE_SUCCESS:
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};
