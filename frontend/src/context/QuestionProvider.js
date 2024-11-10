import { createContext, useContext } from "react";

const QuestionContext = createContext();

const QuestionProvider = ( { question, children } ) => {
  return (
    <QuestionContext.Provider value={ question }>
      {children}
    </QuestionContext.Provider>
  )
}

export default QuestionProvider;

export const useQuestion = () => useContext( QuestionContext );