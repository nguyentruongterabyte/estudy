import { createContext, useContext } from 'react';

const QuestionsContext = createContext();

const fn = () => {};

const QuestionsProvider = ({
  isEnableQuestionText,
  isEnableChooseNumberOfQuestion = false,
  questions,
  children,
  displayButtonText = true,
  questionTextRow = 1,
  onQuestionTextChange = fn,
  onImageUpload = fn,
  onAudioUpload = fn,
  onDeleteQuestion = fn,
  onAddQuestion = fn,
  onUserSelectAnswer = fn,
}) => {
  return (
    <QuestionsContext.Provider
      value={{
        isEnableQuestionText,
        isEnableChooseNumberOfQuestion,
        questions,
        displayButtonText,
        questionTextRow,
        onQuestionTextChange,
        onImageUpload,
        onAudioUpload,
        onDeleteQuestion,
        onAddQuestion,
        onUserSelectAnswer,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;

export const useQuestions = () => useContext(QuestionsContext);
