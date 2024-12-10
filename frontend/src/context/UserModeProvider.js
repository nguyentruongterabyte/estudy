import { createContext, useContext } from 'react';
import useUserId from '~/hooks/useUserId';

const UserModeContext = createContext();

const UserModeProvider = ({ children, isUserMode, isDisplayQuestionText = true, isDisplayAnswerText = true }) => {
  const userId = useUserId();
  return (
    <UserModeContext.Provider value={{ isUserMode, userId, isDisplayAnswerText, isDisplayQuestionText }}>
      {children}
    </UserModeContext.Provider>
  );
};

export default UserModeProvider;

export const useUserMode = () => useContext(UserModeContext);
