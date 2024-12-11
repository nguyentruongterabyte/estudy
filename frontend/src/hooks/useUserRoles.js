import { jwtDecode } from 'jwt-decode';
import useAuth from './useAuth';

const useUserRoles = () => {
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const decoded = accessToken && jwtDecode(accessToken);
  const roles = decoded.userInfo.roles;
  return roles;
};

export default useUserRoles;
