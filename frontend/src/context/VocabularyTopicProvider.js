import { createContext, useContext } from 'react';

const VocabularyTopicContext = createContext();

const VocabularyTopicProvider = ({ onDelete, children }) => {
  return <VocabularyTopicContext.Provider value={{ onDelete }}>{children}</VocabularyTopicContext.Provider>;
};

export default VocabularyTopicProvider;

export const useVocabularyTopic = () => useContext(VocabularyTopicContext);
