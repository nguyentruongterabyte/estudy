import Template from '../Template';

const TriplePassages = ({ isUser = false }) => {
  return (
    <Template
      isEnableBottombar={true}
      isEnableQuestionText={true}
      resizeablePanels={true}
      partName="part7_TriplePassages"
      partId={9}
      quantityOfBundles={3}
      quantityOfQuestionsPerBundle={5}
      quantityOfAnswersPerQuestion={4}
      questionBundle={true}
      quote={'nothingIsMorePreciousThanIndependenceAndFreedom'}
      isEnablePhoto={false}
      isEnableAudio={false}
      isUser={isUser}
    />
  );
};

export default TriplePassages;