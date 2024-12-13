import Template from '../TestTemplate';

const IncompleteSentences = ({ isUser = false }) => {
  return (
    <Template
      isEnableExplainText={true}
      isEnableAudio={false}
      isEnablePhoto={false}
      isEnableQuestionText={true}
      partId={5}
      partName={'part5_IncompleteSentences'}
      quantityOfQuestions={30}
      quantityOfAnswersPerQuestion={4}
      quote="quote5"
      isUser={isUser}
      isEnableBottombar={true}
      isShufflingQuestionsEnabled={true}
      isShufflingAnswersEnabled={true}
    />
  );
};

export default IncompleteSentences;
