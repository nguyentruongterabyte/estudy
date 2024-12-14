import grammarService from '../services/grammarService';

const handleSave = async (req, res) => {
  const { grammar } = req.body;

  try {
    const newGrammar = await grammarService.save(grammar);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: newGrammar,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleUpdate = async (req, res) => {
  const { grammar } = req.body;

  try {
    const id = grammar.id;
    const exists = grammarService.get(id);

    if (!exists)
      return res.status(404).json({
        errCode: 1,
        errMessage: 'Grammar not found',
      });

    await grammarService.update(grammar);
    res.json({
      errCode: 0,
      errMessage: 'OK',
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleDelete = async (req, res) => {
  const { grammarId } = req.params;

  try {
    await grammarService.destroy(grammarId);
    res.json({
      errCode: 0,
      errMessage: 'OK',
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleGetAll = async (req, res) => {
  try {
    const grammars = await grammarService.getAll();
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: grammars,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleGetByLevelId = async (req, res) => {
  const { levelId } = req.params;
  try {
    const grammars = await grammarService.getByLevelId(levelId);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: grammars,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleSave,
  handleGetAll,
  handleDelete,
  handleUpdate,
  handleGetByLevelId,
};
