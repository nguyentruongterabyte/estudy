import { useQuestionGroups } from '~/context/QuestionGroupsProvider';
import Question from './Question';
import { Fragment, useEffect, useState } from 'react';
import hooks from '~/hooks';
import QuestionProvider from '~/context/QuestionProvider';

const Questions = () => {
  const { getQuestionsByGroupId } = hooks.useQuestionService();
  const { groupId, isAddNew } = useQuestionGroups();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // fetch questions data
    const fetchQuestions = async (groupId) => {
      const audio = true;
      const photo = true;
      const questions = await getQuestionsByGroupId(groupId, audio, photo);
      setQuestions(questions);
    };
    if (groupId) fetchQuestions(groupId);
    // eslint-disable-next-line
  }, [groupId]);

  useEffect(() => {
    if (isAddNew) {
      setQuestions(
        Array.from({ length: 6 }).map((_, index) => ({
          id: index,
          photo: '',
          audio: '',
          answers: Array.from({ length: 4 }).map((_, answerIndex) => ({ id: answerIndex, answer: '' })),
          correctAnswerIndex: 0,
        })),
      );
    }
  }, [isAddNew]);

  // useEffect(() => {
  //   console.log(questions);
  // }, [questions]);

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[ index ] = { ...updatedQuestions[ index ], [ field ]: value };
      return updatedQuestions;
    });
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].answers[answerIndex].answer = value;
      return updatedQuestions;
    });
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
      return updatedQuestions;
    });
  };

  return (
    <div>
      {Array.isArray(questions) &&
        questions.map((question, index) => (
          <QuestionProvider question={question}>
            <Question
              data={question}
              key={question.id}
              index={index}
              isEditable={isAddNew}
              onQuestionChange={(field, value) => handleQuestionChange(index, field, value)}
              onAnswerChange={(answerIndex, value) => handleAnswerChange(index, answerIndex, value)}
              onCorrectAnswerChange={(answerIndex) => handleCorrectAnswerChange(index, answerIndex)}
            />
          </QuestionProvider>
        ))}
    </div>
  );
};

export default Questions;
