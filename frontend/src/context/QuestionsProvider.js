import { createContext, useContext } from 'react';

const QuestionsContext = createContext();

const fn = () => {};

const QuestionsProvider = ({
  isEnableQuestionText,
  questions,
  children,
  displayButtonText = true,
  questionTextRow = 1,
  onQuestionTextChange = fn,
  onImageUpload = fn,
  onAudioUpload = fn
}) => {
  return (
    <QuestionsContext.Provider
      value={{ isEnableQuestionText, questions, displayButtonText, questionTextRow, onQuestionTextChange, onImageUpload, onAudioUpload }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;

export const useQuestions = () => useContext(QuestionsContext);
