import Template from '../Template';

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
      quote={'whatWeAreTheWorldIs'}
      isUser={isUser}
    />
  );
};

export default IncompleteSentences;
