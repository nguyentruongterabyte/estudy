import { ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './QuestionGroup.module.scss';
import { useQuestionGroups } from '~/context/QuestionGroupsProvider';

const cx = classNames.bind(styles);

const QuestionGroup = ({ data }) => {
  const { setGroupId } = useQuestionGroups();

  return (
    // Question group item
    <ListGroup.Item onClick={() => setGroupId(data.id)} as="li" className={cx('container')}>
      {data.name}
    </ListGroup.Item>
  );
};

export default QuestionGroup;
