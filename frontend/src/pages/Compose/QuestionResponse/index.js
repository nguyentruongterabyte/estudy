import classNames from 'classnames/bind';
import styles from './QuestionResponse.module.scss';

const cx = classNames.bind(styles);

const QuestionResponse = () => {
  return <div className={ cx( 'container' ) }>Question Response</div>;
};

export default QuestionResponse;
