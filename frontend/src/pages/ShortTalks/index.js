import Template from '../Template';

const ShortTalks = ({ isUser = false }) => {
  return (
    <Template
      isEnableBottombar={true}
      isEnableQuestionText={true}
      resizeablePanels={true}
      partName="part4_ShortTalks"
      partId={4}
      quantityOfBundles={10}
      quantityOfQuestionsPerBundle={3}
      quantityOfAnswersPerQuestion={4}
      questionBundle={true}
      quote={'nothingIsMorePreciousThanIndependenceAndFreedom'}
      isEnablePhoto={true}
      isEnableAudio={true}
      isUser={isUser}
    />
  );
};

export default ShortTalks;
