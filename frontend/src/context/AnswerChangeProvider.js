import { createContext, useContext } from 'react';

const AnswerChangeContext = createContext();

const AnswerChangeProvider = ({ children, onAnswerChange, onCorrectAnswerChange }) => {
  return <AnswerChangeContext.Provider value={{onAnswerChange, onCorrectAnswerChange}}>{children}</AnswerChangeContext.Provider>;
};

export default AnswerChangeProvider;

export const useAnswerChange = () => useContext(AnswerChangeContext);
