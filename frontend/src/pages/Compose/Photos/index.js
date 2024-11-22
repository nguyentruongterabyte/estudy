
import Template from '../Template';

const Photos = () => {
  return (
    <Template
      isEnableAudio={true}
      isEnablePhoto={true}
      partName="part1_Photos"
      partId={1}
      quantityOfQuestions={6}
      quantityOfAnswersPerQuestion={4}
      quote={'nothingIsMorePreciousThanIndependenceAndFreedom'}
    />
  );
};

export default Photos;
