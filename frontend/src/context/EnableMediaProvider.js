import { createContext, useContext } from 'react';

const EnableMediaContext = createContext();

const EnableMediaProvider = ({ isEnablePhoto, isEnableAudio, children }) => {
  return <EnableMediaContext.Provider value={{ isEnablePhoto, isEnableAudio }}>{children}</EnableMediaContext.Provider>;
};

export default EnableMediaProvider;
export const useEnableMedia = () => useContext(EnableMediaContext);
