import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { CONTACT_UPDATE, CONTACT_CREATE,
   CONTACTS_FETCH_SUCCESS, CONTACT_SAVE_SUCCESS, USER_CREATE } from './types';

export const contactUpdate = ({ prop, value }) => {
  return {
    type: CONTACT_UPDATE,
    payload: { prop, value }
  };
};

export const contactCreate = ({ name, phone }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/contacts`)
      .push({ name, phone })
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
      //Actions.employeeList({ type: 'reset' });
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

//behöver vi skapa en funktion för contactCreate??
