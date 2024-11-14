import { createContext, useContext } from 'react';

const ErrorFieldsContext = createContext();

const ErrorFieldsProvider = ({ errorFields, children }) => {
  return <ErrorFieldsContext.Provider value={errorFields}>{children}</ErrorFieldsContext.Provider>;
};

export default ErrorFieldsProvider;

export const useErrorFields = () => useContext(ErrorFieldsContext);
