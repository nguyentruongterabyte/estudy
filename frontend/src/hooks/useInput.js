import useLocalStorage from "./useLocalStorage";

const useInput = ( key, initValue ) => {
  const [ value, setValue ] = useLocalStorage( key, initValue );

  const reset = () => setValue( initValue );
  const attrObj = {
    value,
    onChange: (e) => setValue(e.target.value),
  }
  return [ value, reset, attrObj ];
}

export default useInput;