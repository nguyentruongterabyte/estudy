import { createContext, useContext } from 'react';

const QuestionGroupContext = createContext();

const QuestionGroupProvider = ({ onDelete, children, isEnableClick = true }) => {
  return <QuestionGroupContext.Provider value={{ onDelete, isEnableClick }}>{children}</QuestionGroupContext.Provider>;
};

export default QuestionGroupProvider;

export const useQuestionGroup = () => useContext(QuestionGroupContext);
