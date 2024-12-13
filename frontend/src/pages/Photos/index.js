import Template from '../TestTemplate';

const Photos = ({ isUser = false }) => {
  return (
    <Template
      isEnableAudio={true}
      isEnablePhoto={true}
      partName="part1_Photos"
      partId={1}
      quantityOfQuestions={6}
      quantityOfAnswersPerQuestion={4}
      quote="quote1"
      isEnableBottombar={true}
      isUser={isUser}
      isDisplayAnswerText={false}
      isShufflingQuestionsEnabled={true}
    />
  );
};

export default Photos;
