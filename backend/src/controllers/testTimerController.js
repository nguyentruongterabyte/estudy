import testTimerService from '../services/testTimerService';

const handleGetByUserId = async ( req, res ) => {
  const { userId } = req.params;

  try {
    const testTimers = await testTimerService.getByUserId( userId );
    res.json( {
      errCode: 0,
      errMessage: 'OK',
      data: testTimers
    })
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
}

const handleGetOne = async (req, res) => {
  const { userId, groupId } = req.params;

  try {
    const testTimer = await testTimerService.get(userId, groupId);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: testTimer,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};


const handleUpdate = async (req, res) => {
  const { userId, groupId, secondsElapsed } = req.params;

  try {
    const testTimer = await testTimerService.createOrUpdate(userId, groupId, secondsElapsed);
    res.json({
      errCode: 0,
      errMessage: 'OK',
      data: testTimer,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};


export default {
  handleGetByUserId,
  handleGetOne,
  handleUpdate
}