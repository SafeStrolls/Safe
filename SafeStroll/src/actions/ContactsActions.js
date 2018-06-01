import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { CONTACT_UPDATE, CONTACT_CREATE,
   CONTACTS_FETCH_SUCCESS, CONTACT_SAVE_SUCCESS,
   USER_CREATE, CHOSEN_FETCH_SUCCESS } from './types';

export const contactUpdate = ({ prop, value }) => {
  return {
    type: CONTACT_UPDATE,
    payload: { prop, value }
  };
};

export const contactCreate = ({ userName, phone }) => {
  console.log(userName);
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/contacts`)
      .push({ userName, phone })
      .then(() => {
        dispatch({ type: CONTACT_CREATE });
       Actions.pop();
     });
  };
};

export const signUp = ({ name, lastName, phoneNumber, email, password }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/contacts`)
    .push({ name, lastName, phoneNumber, email, password })
    .then(() => {
      dispatch({ type: USER_CREATE });
      Actions.pop();
    });
  };
};

export const contactsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/contacts`)
      .on('value', snapshot => {
        dispatch({ type: CONTACTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const contactSave = ({ name, phone, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/contacts/${uid}`)
    .set({ name, phone })
    .then(() => {
      dispatch({ type: CONTACT_SAVE_SUCCESS });
      Actions.pop();
    });
  };
};

export const contactDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/contacts/${uid}`)
    .remove()
    .then(() => {
      Actions.pop();
    });
  };
};

export const chosenContactsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/ChosenContacts`)
      .on('value', snapshot => {
        dispatch({ type: CHOSEN_FETCH_SUCCESS, payload: snapshot.val() });
        console.log(snapshot.val());
        console.log('chosenContactFetch i actions');
      });
  };
};

export const chosenContactDelete = () => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/ChosenContacts`)
    .remove()
    .then(() => {
    });
  };
};
