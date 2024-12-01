import Template from '../Template';

const Conversations = ({ isUser = false }) => {
  return (
    <Template
      isEnableBottombar={true}
      isEnableQuestionText={true}
      resizeablePanels={true}
      partName="part3_Conversations"
      partId={3}
      quantityOfBundles={13}
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

export default Conversations;