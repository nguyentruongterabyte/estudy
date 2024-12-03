import { useSelector } from 'react-redux';
import { grammarList } from '~/redux/features/grammarsSlice';

const useNewGrammar = () => {
  const grammars = useSelector(grammarList);

  const newGrammar = { id: 9999999, name: `Grammar ${grammars.length + 1}` };
  return newGrammar
};

export default useNewGrammar;
