import { createContext, useContext } from 'react';

const QuestionsContext = createContext();

const QuestionsProvider = ({ isEnableQuestionText, children }) => {
  return <QuestionsContext.Provider value={{ isEnableQuestionText }}>{children}</QuestionsContext.Provider>;
};

export default QuestionsProvider;

export const useQuestions = () => useContext(QuestionsContext);
