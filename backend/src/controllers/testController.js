import questionService from '../services/questionService';
import questionGroupService from '../services/questionGroupService';
import answerService from '../services/answerService';
import correctAnswerService from '../services/correctAnswerService';
import photoService from '../services/photoService';
import audioService from '../services/audioService';

const handleSaveTest = async (req, res) => {
  const { name, partId, questions } = req.body;

  try {
    // Create questionGroup
    const newQuestionGroup = await questionGroupService.save({
      name,
      partId,
    } );
    
    // Create new questions with group id
    const newQuestions = await Promise.all(
      questions.map(async (question) => {
        // Save question
        const { id, ...questionWithoutId } = question;
        const newQuestion = await questionService.save({ ...questionWithoutId, groupId: newQuestionGroup.id });

        // save answers
        const newAnswers = await Promise.all(
          question.answers.map(async (answer, index) => {
            const { id, ...answerWithoutId } = answer;
            const newAnswer = await answerService.save({ questionId: newQuestion.id, ...answerWithoutId });
            
            // save correct answer if index of answer equals correct answer index
            if ( index === question.correctAnswerIndex ) {
              await correctAnswerService.save({ questionId: newQuestion.id, answerId: newAnswer.id });
            }
            return { ...newAnswer.dataValues, index };
          }),
        );

        return { ...newQuestion.dataValues, answers: newAnswers, correctAnswerIndex: question.correctAnswerIndex };
      }),
    );

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: {
        questionGroup: newQuestionGroup,
        questions: newQuestions,
      },
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleDeleteTest = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId)
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  try {
    // find question group
    const questionGroup = await questionGroupService.get(groupId);
    if (!questionGroup)
      return res.status(404).json({
        errCode: 1,
        errMessage: 'Question group not found',
      });

    // get questions by group id
    const questions = await questionService.getByGroupId(groupId);

    // // delete photo from firebase
    if (questionGroup.partId === 1) {
      // get photos by question id array
      const photos = await Promise.all(
        questions.map(async (question) => await photoService.getByQuestionId(question.id)),
      );

      await Promise.all(photos.map(async (photo) => await photoService.deleteFirebasePhotoByUrl(photo.filePath)));
    }

    // handle delete audio
    const audios = await Promise.all(
      questions.map(async (question) => await audioService.getByQuestionId(question.id)),
    ); // get audios by question id

    const uniqueAudios = Array.from(
      new Map(audios.filter((audio) => audio != null).map((audio) => [audio.id, audio])).values(),
    ); // remove audios with duplicate `id`

    // Delete audio from firebase
    await Promise.all(uniqueAudios.map(async (audio) => await audioService.deleteFirebaseAudioByUrl(audio.audioLink)));

    // Delete audio from db
    await Promise.all(uniqueAudios.map(async (audio) => await audioService.destroy(audio.id)));

    await questionGroupService.destroy(groupId);
    return res.json({
      errCode: 0,
      errMessage: 'Delete successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

module.exports = {
  handleSaveTest,
  handleDeleteTest,
};
