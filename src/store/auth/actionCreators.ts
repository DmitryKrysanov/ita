import * as actionTypes from './actionConstants';
import {
  SignupInterface,
  AuthDataInterface
} from '@components/App/Auth/Signup/SignupInterface';
import { SIGNIN_SUCCESSFUL, SIGNIN_ERROR, SIGNOUT } from './actionConstants';
import { Firebase } from '../../firebase/firebase.config';

import {
  createUserInformation,
  deleteUserInformation
} from '../../components/App/Auth/AuthUtils';

export const successSignin = (user: any) => {
  return {
    type: SIGNIN_SUCCESSFUL,
    payload: user
  };
};

const errorSignin = (err: Error) => {
  return {
    type: SIGNIN_ERROR,
    payload: err
  };
};

export const signInUser = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );

      if (response.user) {
        const token = await response.user
          .getIdTokenResult(true)
          .then(idToken => idToken.token);
        const refreshToken = response.user.refreshToken;
        createUserInformation(token, refreshToken, response.user.uid);
        dispatch(successSignin({ ...response.user, token }));
      }
    } catch (err) {
      dispatch(errorSignin(err.message));
    }
  };
};
export const signOutUser = () => {
  return (dispatch: any) => {
    Firebase.auth()
      .signOut()
      .then(() => {
        deleteUserInformation();
        dispatch({
          type: SIGNOUT
        });
      });
  };
};

export const saveUserAuthData = (userData: AuthDataInterface) => {
  return {
    type: actionTypes.AUTH_SUCCESSFUL,
    payload: userData
  };
};

export const authSignup = (userData: SignupInterface) => ({
  type: actionTypes.AUTH_SIGNUP,
  payload: userData
});
