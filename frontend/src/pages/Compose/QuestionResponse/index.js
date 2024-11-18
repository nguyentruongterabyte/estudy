import { useEffect } from 'react';
import ComposeContainer from '../ComposeContainer';
import { useDispatch } from 'react-redux';
import { changeQuestions } from '~/redux/features/testSlice';

const QuestionResponse = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeQuestions({ questions: [] }));
  }, []);
  return (
    <ComposeContainer
      isEnableAudio={true}
      isEnablePhoto={false}
      partId={2}
      partName={'part2_QuestionResponse'}
      quantityOfQuestions={25}
      quantityOfAnswersPerQuestion={3}
    />
  );
};

export default QuestionResponse;
