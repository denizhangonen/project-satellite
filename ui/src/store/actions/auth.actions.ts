import axios from '../../Shared/axios';

import jwtDecode from 'jwt-decode';

import { Dispatch } from 'redux';
import * as ACTION_TYPES from './actionTypes/auth-types';
import * as AUTH_ROUTES from '../../Shared/Routes/authRoutes';
import * as GLOSSARY from '../../Shared/glossary';
import IAuth from '../../Shared/Models/Auth/IAuth';
import * as AUTH_UTILITIES from '../../Shared/authUtilities';

export const auth =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(authStart());
    try {
      const response = await axios.post(AUTH_ROUTES.LOGIN, { email, password });
      console.log('response : ', response);
      const dT: any = jwtDecode(response.data.token);
      const successObj: IAuth = {
        email: email,
        token: response.data.token,
        userId: response.data.userId,
        expirationDate: new Date(dT.exp * 1000),
      };

      console.log('successObj :', successObj);
      await AUTH_UTILITIES.setLocalStorage(successObj);
      dispatch(authSuccess(successObj));
    } catch (err) {
      dispatch(authFail(err));
    }
  };

const authStart = () => ({
  type: ACTION_TYPES.AUTH_START,
});

const authSuccess = (data: IAuth) => ({
  type: ACTION_TYPES.AUTH_SUCCESS,
  payload: data,
});

const authFail = (error: any) => ({
  type: ACTION_TYPES.AUTH_FAIL,
  payload: error,
});

export const authCheckState = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem(GLOSSARY.ACCESS_TOKEN);
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate: any = localStorage.getItem(
      GLOSSARY.ACCESS_TOKEN_EXPIRATION_DATE
    );
    if (expirationDate) {
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const email = localStorage.getItem(GLOSSARY.EMAIL);
        const token = localStorage.getItem(GLOSSARY.ACCESS_TOKEN);
        const userId = localStorage.getItem(GLOSSARY.USERID);
        const expirationDate = localStorage.getItem(
          GLOSSARY.ACCESS_TOKEN_EXPIRATION_DATE
        );
        if (email && token && userId && expirationDate) {
          const successObj: IAuth = {
            email,
            token,
            userId,
            expirationDate,
          };
          dispatch(authSuccess(successObj));
        }
      }
    }
  }
};

export const logout = () => {
  console.log('export const logout = () => {');
  AUTH_UTILITIES.clearLocalStorage();
  return {
    type: ACTION_TYPES.AUTH_LOGOUT,
  };
};

export const socialLoginCompleted =
  (data: any) => async (dispatch: Dispatch) => {
    dispatch(authStart());
    try {
      const dT: any = jwtDecode(data.token);
      const successObj: IAuth = {
        email: data.email,
        token: data.token,
        userId: 'data._id',
        expirationDate: new Date(dT.exp * 1000),
        profilePicture: data.profilePic,
      };

      console.log('successObj :', successObj);
      await AUTH_UTILITIES.setLocalStorage(successObj);
      dispatch(authSuccess(successObj));
    } catch (err: any) {
      dispatch(authFail(err));
    }
  };
