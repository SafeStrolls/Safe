import firebase from 'firebase';
import { UPDATE_LOCATION,
         UPDATE_USERS_LATITUDE,
         UPDATE_USERS_LONGITUDE,
         LOCATION_FETCH_SUCCESS,
         CHOSEN_SAVE_SUCCESS
        } from './types';

export const updateUsersLatitude = (latitude) => {
  return {
    type: UPDATE_USERS_LATITUDE,
    payload: latitude
  };
};

export const updateUsersLongitude = (longitude) => {
  return {
    type: UPDATE_USERS_LONGITUDE,
    payload: longitude
  };
};

export const setUsersLocation = ({ latitude, longitude }) => {
  console.log(latitude, longitude);
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/currentLocation`)
    .set({ latitude, longitude })
    .then(() => {
      dispatch({ type: UPDATE_LOCATION });
      console.log(latitude, longitude);
    });
  };
};

export const locationFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/currentLocation`)
      .on('value', snapshot => {
        dispatch({
          type: LOCATION_FETCH_SUCCESS,
          payload: snapshot.val() });
        console.log(snapshot.val());
        console.log('snapshot.val');
      });
  };
};


export const setChosenContatcs = ({ userName, phone }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/ChosenContacts`)
    .push({ userName, phone })
    .then(() => {
      dispatch({ type: CHOSEN_SAVE_SUCCESS });
      console.log(userName);
    });
  };
};
