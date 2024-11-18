import Template from '../Template';

const QuestionResponse = () => {
  return (
    <Template
      isEnableAudio={true}
      isEnablePhoto={ false }
      isEnableQuestionText={true}
      partId={2}
      partName={'part2_QuestionResponse'}
      quantityOfQuestions={25}
      quantityOfAnswersPerQuestion={3}
    />
  );
};

export default QuestionResponse;
