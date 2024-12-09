import classNames from 'classnames/bind';
import styles from './ScoredBoard.module.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CircularProgress from '../CircularProgress';

const cx = classNames.bind(styles);

const ScoredBoard = () => {
  return (
    <Container className={cx('container')}>
      <Row className={cx('row')}>
        <Col sm="4" className={cx('col')}>
          <CircularProgress percentage={60}></CircularProgress>
          <Button>Review</Button>
        </Col>
        <Col sm="4" className={cx('col')}>
          <div className={cx('figure')}>
            <h4>Total Time</h4>
            <strong>2m37s</strong>
          </div>
          <div className={cx('figure')}>
            <h4>Total Questions</h4>
            <strong>30</strong>
          </div>
          <Button>Practice Now</Button>
        </Col>
        <Col sm="4" className={cx('col')}>
          <div className={cx('figure')}>
            <h4>Correct</h4>
            <strong>1</strong>
          </div>
          <div className={cx('figure')}>
            <h4>Incorrect</h4>
            <strong>29</strong>
          </div>
          <div className={cx('figure')}>
            <h4>Incorrect</h4>
            <strong>29</strong>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ScoredBoard;
