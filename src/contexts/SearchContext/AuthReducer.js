import ActionTypes from './ActionTypes';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        isUser: true,
        token: action.payload.token,
        accountName: action.payload.accountName,
        image: action.payload.image,
      };
    case ActionTypes.LOGOUT:
      return { isUser: false, token: null, accountName: '', image: '' };

     //case 'GETUSERINFO':
       //return {
         //isUser: true,
         //accountname: action.payload.accoutname,
         //profileimg: action.payload.profileimg,
         //...state,
       //};

    default:
      return state;
  }
};

export default AuthReducer;
