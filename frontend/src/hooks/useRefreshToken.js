import axios from '~/utils/axios';
import useAuth from './useAuth';
import config from '~/config';
import { jwtDecode } from 'jwt-decode';
import useLocalStorage from './useLocalStorage';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const [currentRole] = useLocalStorage('currentRole', config.roles.user);

  const refresh = async () => {
    const response = await axios.get(config.urls.user.refreshToken, {
      withCredentials: true,
    });

    const accessToken = response.data.data;
    const roles = jwtDecode(accessToken).userInfo.roles;
    setAuth((prev) => {
      return { ...prev, accessToken, roles, currentRole };
    });
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
