import React, { createContext, useMemo, useReducer } from 'react';

import ActionTypes from './ActionTypes';
import AuthReducer from './AuthReducer';

const authContext = createContext();

const initFunction = () => {
  const localData = JSON.parse(localStorage.getItem('data'));

  if (localData) {
    return {
      token: localData.token,
      accountName: localData.accountName,
      image: localData.image,
      isUser: true,
    };
  }
  return { token: null, accountName: '', image: '', isUser: false };
};

 //const initAuth = {
   //token:
     //JSON.parse(localStorage.getItem('data')) &&
     //JSON.parse(localStorage.getItem('data')).token,
   //accountName:
     //JSON.parse(localStorage.getItem('data')) &&
     //JSON.parse(localStorage.getItem('data')).accountName,
   //image:
     //JSON.parse(localStorage.getItem('data')) &&
     //JSON.parse(localStorage.getItem('data')).image,
   //isUser: !!JSON.parse(localStorage.getItem('data')),
 //};

function AuthContextProvider({ children }) {
  const [auth, authDispatch] = useReducer(AuthReducer, initFunction());

  const value = useMemo(
    () => ({
      auth,
      login: (token, accountName, image) => {
        authDispatch({
          type: ActionTypes.LOGIN,
          payload: { token, accountName, image },
        });
      },
      logout: () => {
        authDispatch({ type: ActionTypes.LOGOUT });
      },
    }),
    [auth]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export { AuthContextProvider, authContext };
