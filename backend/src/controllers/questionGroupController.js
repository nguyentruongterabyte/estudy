import questionGroupService from '../services/questionGroupService';

const handleUpdate = async (req, res) => {
  const { questionGroup } = req.body;

  if (!questionGroup) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }

  try {
    await questionGroupService.update(questionGroup);
    return res.json({
      errCode: 0,
      errMessage: 'OK',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleGetQuestionGroupsByPartId = async (req, res) => {
  const partId = req.params.partId;

  try {
    const groupQuestions = await questionGroupService.getByPartId(partId);
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: groupQuestions,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleGetQuestionGroupsByGrammarId = async (req, res) => {
  const grammarId = req.params.grammarId;
  try {
    const groupQuestions = await questionGroupService.getByGrammarId(grammarId);
    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: groupQuestions,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

export default {
  handleUpdate,
  handleGetQuestionGroupsByPartId,
  handleGetQuestionGroupsByGrammarId,
};
