import {
  LOCATION_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  latitude: 0,
  longitude: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_FETCH_SUCCESS:
      console.log(action.payload);
      console.log('received in reducer');
      return action.payload;
    default:
      return state;
  }
};
