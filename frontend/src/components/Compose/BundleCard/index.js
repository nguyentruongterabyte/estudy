import { Button, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './BundleCard.module.scss';
import { useDispatch } from 'react-redux';
import { toggleActive } from '~/redux/features/questionBundlesSlice';

const cx = classNames.bind(styles);

const BundleCard = ({ data, index }) => {
  const dispatch = useDispatch();

  const questionLength = data.questions.length;
  const questions = data.questions;

  const handleScrollToQuestion = ( id ) => {
    const targetQuestion = document.getElementById( id );
    if ( targetQuestion ) {
      targetQuestion.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }

  return (
    <ListGroup.Item
      onClick={() => dispatch(toggleActive({ index }))}
      className={cx('container', 'me-2')}
      aria-label={`bundle_${data.id}`}
      variant={data.active ? 'info' : ''}
    >
      {questions.map((_, questionIndex) => (
        <Button size='lg' variant={data.active ? 'outline-danger' : 'outline-success'} className={cx('question')} onClick={() => handleScrollToQuestion(`question_${index * questionLength + questionIndex + 1}`)} key={questionIndex}>
          {index * questionLength + questionIndex + 1}
        </Button>
      ))}
    </ListGroup.Item>
  );
};

export default BundleCard;
