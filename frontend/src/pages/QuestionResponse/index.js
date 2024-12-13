import Template from '../TestTemplate';

const QuestionResponse = ({ isUser = false }) => {
  return (
    <Template
      isEnableAudio={true}
      isEnableQuestionText={true}
      partId={2}
      partName={'part2_QuestionResponse'}
      quantityOfQuestions={25}
      quantityOfAnswersPerQuestion={3}
      quote="quote2"
      isUser={isUser}
      isDisplayAnswerText={false}
      isDisplayQuestionText={false}
      isEnableBottombar={true}
      isShufflingQuestionsEnabled={true}
    />
  );
};

export default QuestionResponse;
