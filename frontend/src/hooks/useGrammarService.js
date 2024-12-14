import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useGrammarService = () => {
  const axiosPrivate = useAxiosPrivate();

  const saveGrammar = async (grammar) => {
    try {
      const response = await axiosPrivate.post(config.urls.grammar.create, { grammar });
      const newGrammar = response?.data?.data;
      return newGrammar;
    } catch (e) {
      throw e;
    }
  };

  const updateGrammar = async (grammar) => {
    try {
      const response = await axiosPrivate.put(config.urls.grammar.update, { grammar });
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  const destroyGrammar = async (grammarId) => {
    try {
      const response = await axiosPrivate.delete(`${config.urls.grammar.delete}/${grammarId}`);
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  const getAllGrammars = async () => {
    try {
      const response = await axiosPrivate.get(config.urls.grammar.getAll);

      const grammars = response?.data?.data;
      return grammars;
    } catch (e) {
      throw e;
    }
  };

  // get by level id
  const getGrammarsByLevelId = async (levelId) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.grammar.getByLevelId}/${levelId}`);

      const grammars = response?.data?.data;
      return grammars;
    } catch (e) {
      throw e;
    }
  };

  return { saveGrammar, updateGrammar, destroyGrammar, getAllGrammars, getGrammarsByLevelId };
};

export default useGrammarService;
