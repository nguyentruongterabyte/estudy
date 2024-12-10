import { jwtDecode } from 'jwt-decode';
import useAuth from './useAuth';

const useUserId = () => {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const decoded = accessToken && jwtDecode(accessToken);
  const userId = decoded.userInfo.id;
  return userId;
};

export default useUserId;
