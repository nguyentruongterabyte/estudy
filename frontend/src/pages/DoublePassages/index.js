import Template from '../TestTemplate';

const DoublePassages = ({ isUser = false }) => {
  return (
    <Template
      isEnableBottombar={true}
      isEnableQuestionText={true}
      resizeablePanels={true}
      partName="part7_DoublePassages"
      partId={8}
      quantityOfBundles={2}
      quantityOfQuestionsPerBundle={5}
      quantityOfAnswersPerQuestion={4}
      questionBundle={true}
      quote="quote8"
      isEnablePhoto={false}
      isEnableAudio={false}
      isUser={isUser}
    />
  );
};

export default DoublePassages;
