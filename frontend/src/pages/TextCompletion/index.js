import Template from '../Template';

const TextCompletion = ({ isUser = false }) => {
  return (
    <Template
      isEnableExplainText={true}
      isEnableBottombar={true}
      isEnableQuestionText={true}
      resizeablePanels={true}
      partName="part6_TextCompletion"
      partId={6}
      quantityOfBundles={4}
      quantityOfQuestionsPerBundle={4}
      quantityOfAnswersPerQuestion={4}
      questionBundle={true}
      quote={'nothingIsMorePreciousThanIndependenceAndFreedom'}
      isEnablePhoto={false}
      isEnableAudio={false}
      isUser={isUser}
    />
  );
};

export default TextCompletion;
