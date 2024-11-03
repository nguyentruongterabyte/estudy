import axios from '~/utils/axios';
import useAuth from './useAuth';
import config from '~/config';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(config.urls.user.refreshToken, {
      withCredentials: true,
    });

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.data };
    });
  };
  return refresh;
};

export default useRefreshToken;
