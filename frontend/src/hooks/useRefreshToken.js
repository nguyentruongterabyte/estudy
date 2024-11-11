import axios from '~/utils/axios';
import useAuth from './useAuth';
import config from '~/config';
import { jwtDecode } from 'jwt-decode';
import useLocalStorage from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const [currentRole] = useLocalStorage('currentRole', config.roles.user);
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get(config.urls.user.refreshToken, {
        withCredentials: true,
      });

      const accessToken = response.data.data;
      const roles = jwtDecode(accessToken).userInfo.roles;
      setAuth((prev) => {
        return { ...prev, accessToken, roles, currentRole };
      });
      return accessToken;
    } catch ( error ) {
      if ( error.response && error.response.status === 401 ) {
        navigate(config.routes.login);
      } else {
        console.error(error)
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
