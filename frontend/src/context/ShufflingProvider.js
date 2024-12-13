import { createContext, useContext } from 'react';

const ShufflingContext = createContext();

const ShufflingProvider = ({
  children,
  isShufflingBundlesEnabled,
  isShufflingQuestionsEnabled,
  isShufflingAnswersEnabled,
}) => {
  return (
    <ShufflingContext.Provider
      value={{ isShufflingBundlesEnabled, isShufflingQuestionsEnabled, isShufflingAnswersEnabled }}
    >
      {children}
    </ShufflingContext.Provider>
  );
};

export default ShufflingProvider;
export const useShufflingSettings = () => useContext(ShufflingContext);
