import ComposeContainer from '../ComposeContainer';

const Photos = () => {
  return (
    <ComposeContainer isEnableAudio={true} isEnablePhoto={true} partName="part1_Photos" partId={1} quantityOfQuestions={6} quantityOfAnswersPerQuestion={4} />
  );
};

export default Photos;
