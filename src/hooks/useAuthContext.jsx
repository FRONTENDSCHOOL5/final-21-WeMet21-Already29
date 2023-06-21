import { useContext } from 'react';
import { authContext } from '../contexts/SearchContext/Auth';

const useAuthContext = () => {
  const { auth, login, logout } = useContext(authContext);

  return { auth, login, logout };
};

export default useAuthContext;