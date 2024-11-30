import { createContext, useContext } from 'react';

const QuestionGroupContext = createContext();

const QuestionGroupProvider = ({ onDelete, children }) => {
  return <QuestionGroupContext.Provider value={{ onDelete }}>{children}</QuestionGroupContext.Provider>;
};

export default QuestionGroupProvider;

export const useQuestionGroup = () => useContext(QuestionGroupContext);
