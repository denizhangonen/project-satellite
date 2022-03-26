import jwtDecode from 'jwt-decode';

import * as glossary from './glossary';
import IAuth from './Models/Auth/IAuth';

/**
 * @description Clears all items in localstorage returns a Promise
 * @returns Promise
 */
export const clearLocalStorage = () => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(glossary.ACCESS_TOKEN);
      localStorage.removeItem(glossary.ACCESS_TOKEN_EXPIRATION_DATE);
      localStorage.removeItem(glossary.USERID);
      localStorage.removeItem(glossary.EMAIL);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @description Sets localStorage for given token object
 * @param {token} auth Token object of API result with specific properties
 * @returns Promise
 */
export const setLocalStorage = (auth: IAuth) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(glossary.ACCESS_TOKEN, auth.token);
      localStorage.setItem(
        glossary.ACCESS_TOKEN_EXPIRATION_DATE,
        auth.expirationDate
      );
      localStorage.setItem(glossary.USERID, auth.userId);
      localStorage.setItem(glossary.EMAIL, auth.email);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @description Clears and sets localStorage for given token object by using two custom functions
 * @param {token} auth Token object of API result with specific properties
 * @returns Promise
 */
export const reconstructLocalStorage = (auth: any) => {
  clearLocalStorage().then(() => {
    return setLocalStorage(auth);
  });
};

/**
 * @description Prepares an object for access token request with the request URL
 * @param {email} email email/username of user
 * @param {password} password password of user
 * @returns an object with 2 properties;
 *  @property {tokenBody} authData contains the request data
 *  @property {url} url contains the url
 */
// export const accessTokenRequestData = (email, password) => {
//     const accessTokenRequestData = {
//         authData: {
//             username: email,
//             password,
//             grant_type: config.AUTH_GRANT_TYPE_PASSWORD,
//             client_id: config.CLIENT_ID,
//             client_secret: config.CLIENT_SECRET
//         },
//         url: config.API_BASE_URL + apiRoutes.AUTH_ACCESS_TOKEN
//     };
//     return accessTokenRequestData;
// }

/**
 * @description Prepares an object for refresh token request with the request URL
 * @returns an object with 2 properties;
 *  @property {tokenBody} authData contains the request data
 *  @property {url} url contains the url
 */

/**
 *
 */
export const checkJWtAccessTokenExpiration = () => {};

export const getAccessToken = () => {
  return localStorage.getItem(glossary.ACCESS_TOKEN);
};
