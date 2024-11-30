import Template from '../Template';

const SinglePassages = ({ isUser = false }) => {
  return (
    <Template
      isEnableBottombar={true}
      isEnableQuestionText={true}
      resizeablePanels={true}
      partName="part7_SinglePassages"
      partId={9}
      quantityOfBundles={10}
      quantityOfQuestionsPerBundle={4}
      quantityOfAnswersPerQuestion={4}
      questionBundle={true}
      quote={'nothingIsMorePreciousThanIndependenceAndFreedom'}
      isEnablePhoto={false}
      isEnableAudio={false}
      isEnableValidate={false}
      isUser={isUser}
    />
  );
};

export default SinglePassages;
