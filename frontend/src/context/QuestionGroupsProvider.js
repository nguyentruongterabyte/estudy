import { createContext, useContext, useState } from "react";

const QuestionGroupsContext = createContext();

const QuestionGroupsProvider = ( { children } ) => {
  const [ groupId, setGroupId ] = useState();
  const [ isAddNew, setIsAddNew ] = useState( false );
  return (
    <QuestionGroupsContext.Provider value={ { groupId, setGroupId, isAddNew, setIsAddNew } }>
      {children}
    </QuestionGroupsContext.Provider>
  )
}

export const useQuestionGroups = () => useContext(QuestionGroupsContext);

export default QuestionGroupsProvider;