import firebase, { getReason } from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
         PASSWORD_CHANGED,
         LOGIN_USER_SUCCESS,
         LOGOUT_USER_SUCCESS,
         LOGIN_USER_FAIL,
         LOGIN_USER,
         LOGOUT_USER,
         DELETE_USER,
         DELETE_USER_SUCCESS,
         SIGN_UP_USER,
         SIGN_UP_FAIL,
         SIGN_UP_SUCCESS,
         PROFILE_UPDATE,
         PROFILE_SAVE_SUCCESS,
         USER_SAVE_SUCCESS,
         USER_NAME_UPDATE,
         SET_USER_ID,
         USER_FETCH_SUCCESS,
         PHONE_UPDATE
        } from './types';

export const phoneChanged = (text) => {
  return {
    type: PHONE_UPDATE,
    payload: text
  };
};

export const setUsersInfo = ({ userName, phone }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}`)
    .set({ userName, phone })
    .then(() => {
      dispatch({ type: USER_SAVE_SUCCESS });
      console.log(userName);

      Actions.auth();
    });
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
export const profileUpdate = ({ prop, value }) => {
  return {
    type: PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const loginUser = ({ email, password }) => {
  //const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => loginUserFail(dispatch));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });

  firebase.auth().signOut()
    .then(user => logoutSuccess(dispatch, user)
  );
  };
};

export const deleteUser = () => {
  return (dispatch) => {
    dispatch({ type: DELETE_USER });

    const thisUser = firebase.auth().currentUser;
    thisUser.delete()
    .then(user => deleteSuccess(dispatch, user)
  );
};
};

export const signUpUser = ({ email, password }) => {

  return (dispatch) => {
    dispatch({ type: SIGN_UP_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => signUpSuccess(dispatch, user))
    .catch(() => signUpFail(dispatch));
  };
};


export const profileSave = ({ email, password }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    const newPassword = currentUser.updatePassword(password)
      .then(() => {
        loginUser({ email, newPassword });
        dispatch({ type: PROFILE_SAVE_SUCCESS });
        Actions.pop();
      })
      .catch((error) => {
        console.log(error);
      });
    };
  };

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
  getReason();
};

const signUpFail = (dispatch) => {
  dispatch({ type: SIGN_UP_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  //from here we navigate the user to screen after login
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

const logoutSuccess = (dispatch, user) => {
  dispatch({
    type: LOGOUT_USER_SUCCESS,
    payload: user
  });
  Actions.auth();
};

const deleteSuccess = (dispatch, user) => {
  dispatch({
    type: DELETE_USER_SUCCESS,
    payload: user
  });
  Actions.auth();
};

const signUpSuccess = (dispatch, user) => {
  dispatch({
    type: SIGN_UP_SUCCESS,
    payload: user
  });
};

export const setIDUserName = ({ userName, phone }) => {
  const { currentUser } = firebase.auth();
  const useruid = currentUser.uid;

  return (dispatch) => {
    firebase.database().ref('/usernames')
    .push({ useruid, userName, phone })
    .then(() => {
      dispatch({ type: SET_USER_ID });
    });
  };
};

export const usersFetch = () => {
  //const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref('/usernames')
      .on('value', snapshot => {
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
        console.log(snapshot.val());
      });
  };
};


export const userNameChanged = (text) => {
  return {
    type: USER_NAME_UPDATE,
    payload: text
  };
};

export const removeUser = () => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}`)
    .remove()
    .then(() => {
    });
  };
};
