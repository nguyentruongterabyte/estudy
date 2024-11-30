import Template from '../Template';

const QuestionResponse = ({ isUser = false }) => {
  return (
    <Template
      isEnableAudio={true}
      isEnableQuestionText={true}
      partId={2}
      partName={'part2_QuestionResponse'}
      quantityOfQuestions={25}
      quantityOfAnswersPerQuestion={3}
      quote={'whatWeAreTheWorldIs'}
      isUser={isUser}
      isDisplayAnswerText={false}
      isDisplayQuestionText={false}
    />
  );
};

export default QuestionResponse;
