import Template from '../Template';

const Conversations = () => {
  return (
    <Template
      isEnableBottombar={true}
      isEnableQuestionText={true}
      resizeablePanels={true}
      partName="part3_Conversations"
      partId={3}
      quantityOfQuestions={39}
      quantityOfAnswersPerQuestion={4}
      questionBundle={true}
      quote={'nothingIsMorePreciousThanIndependenceAndFreedom'}
      isEnablePhoto={true}
      isEnableAudio={true}
    />
  );
};

export default Conversations;
