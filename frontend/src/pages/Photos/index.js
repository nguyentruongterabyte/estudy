import Template from '../Template';

const Photos = ({ isUser = false }) => {
  return (
    <Template
      isEnableAudio={true}
      isEnablePhoto={true}
      partName="part1_Photos"
      partId={1}
      quantityOfQuestions={6}
      quantityOfAnswersPerQuestion={4}
      quote={'nothingIsMorePreciousThanIndependenceAndFreedom'}
      isUser={isUser}
      isDisplayAnswerText={false}
    />
  );
};

export default Photos;
