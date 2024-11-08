import axios from '~/utils/axios';
import useAuth from './useAuth';
import config from '~/config';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try { 
      await axios( config.urls.user.logout, {
        withCredentials: true
      } );
    } catch ( err ) {
      console.log(err);
    }  
  };
  return logout;
};

export default useLogout;