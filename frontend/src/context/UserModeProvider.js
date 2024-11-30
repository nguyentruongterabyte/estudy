import { jwtDecode } from 'jwt-decode';
import { createContext, useContext } from 'react';
import hooks from '~/hooks';

const UserModeContext = createContext();

const UserModeProvider = ({ children, isUserMode, isDisplayQuestionText = true, isDisplayAnswerText = true }) => {
  const { auth } = hooks.useAuth();
  const accessToken = auth.accessToken;
  const decoded = accessToken && jwtDecode(accessToken);
  return (
    <UserModeContext.Provider
      value={{ isUserMode, userId: decoded.userInfo.id, isDisplayAnswerText, isDisplayQuestionText }}
    >
      {children}
    </UserModeContext.Provider>
  );
};

export default UserModeProvider;

export const useUserMode = () => useContext(UserModeContext);
