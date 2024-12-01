import { createContext, useContext } from 'react';

const QuestionsContext = createContext();

const fn = () => {};

const QuestionsProvider = ({
  isEnableQuestionText,
  isEnableChooseNumberOfQuestion = false,
  isEnableExplainText = false,
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
  onExplainTextChange = fn,
}) => {
  return (
    <QuestionsContext.Provider
      value={{
        isEnableQuestionText,
        isEnableChooseNumberOfQuestion,
        isEnableExplainText,
        questions,
        displayButtonText,
        questionTextRow,
        onQuestionTextChange,
        onExplainTextChange,
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
