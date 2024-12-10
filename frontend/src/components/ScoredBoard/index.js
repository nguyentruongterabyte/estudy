import classNames from 'classnames/bind';
import styles from './ScoredBoard.module.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CircularProgress from '../CircularProgress';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groups, updateUserAnswers } from '~/redux/features/userAnswersSlice';
import { activeGroup } from '~/redux/features/questionGroupsSilce';
import hooks from '~/hooks';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const fn = () => {};

const ScoredBoard = ({ setIsPractice = fn, onStartPractice = fn, onContinueTest = fn, onReviewTest = fn }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const active = useSelector(activeGroup);
  const groupId = active.id;
  const [percentage, setPercentage] = useState(0);
  const userAnswerGroups = useSelector(groups);
  const userAnswers = userAnswerGroups.find((uag) => uag.id === groupId)?.userAnswers;
  const [timer, setTimer] = useState(0);
  const { correctAnswers, incorrectAnswers, newQuestions } = userAnswers.reduce(
    (acc, ua) => {
      if (ua.userAnswerId === ua.correctAnswerId) acc.correctAnswers++;
      else if (!ua.userAnswerId) acc.newQuestions++;
      else acc.incorrectAnswers++;
      return acc;
    },
    {
      correctAnswers: 0,
      incorrectAnswers: 0,
      newQuestions: 0,
    },
  );

  const isNewTest = correctAnswers === 0 && incorrectAnswers === 0;
  const isCompletedTest = newQuestions === 0;
  const { deleteUserAnswers } = hooks.useUserAnswerService();
  const { getItem, saveItem } = hooks.useSaveData('time_colapsed');

  const handleStartPractice = async () => {
    // restart, delete all user answers
    saveItem(groupId, 0);
    if (!isNewTest) {
      await deleteUserAnswers(userAnswers.map((ua) => ({ questionId: ua.questionId })));

      dispatch(updateUserAnswers({ groupId, userAnswers: userAnswers.map((ua) => ({ ...ua, userAnswerId: null })) }));
    }
    onStartPractice();
    setIsPractice(true);
  };

  const handleContinueTest = () => {
    setIsPractice(true);
    onContinueTest();
  };

  const handleReviewTest = () => {
    setIsPractice(true);
    onReviewTest();
  };

  const formatTime = (secondsElapsed) => {
    const hours = Math.floor(secondsElapsed / 3600);
    const minutes = Math.floor((secondsElapsed % 3600) / 60);
    const seconds = secondsElapsed % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // get timer
  useEffect(() => {
    const savedTimer = getItem(groupId);
    if (savedTimer) {
      setTimer(savedTimer);
    }
    // eslint-disable-next-line
  }, [groupId]);

  useEffect(() => {
    if (userAnswers.length > 0) {
      let percentage = 0;
      const lengthOfQuestions = userAnswers.length;
      userAnswers.forEach((userAnswer) => {
        if (userAnswer.userAnswerId === userAnswer.correctAnswerId) percentage += (1 / lengthOfQuestions) * 100;
      });

      setPercentage(Math.round(percentage));
    }
  }, [userAnswers]);

  return (
    <Container className={cx('container')}>
      <Row className={cx('row', 'wrapper')}>
        <Col sm="8" className={cx('col')}>
          <Row>
            <Col sm="6" className={cx('col')}>
              <CircularProgress className={cx('progress')} percentage={percentage} />
            </Col>
            <Col sm="6" className={cx('col')}>
              <Row className={cx('figure')}>
                <Col sm="6">
                  <h4 className={cx('title')}>{t('totalTime')}</h4>
                </Col>
                <Col sm="6">
                  <strong className={cx('number')}>{formatTime(timer)}</strong>
                </Col>
              </Row>
              <Row className={cx('figure')}>
                <Col sm="6">
                  <h4 className={cx('title')}>{t('totalQuestions')}</h4>
                </Col>
                <Col sm="6">
                  <strong className={cx('number')}>{userAnswers.length}</strong>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            {!isNewTest && (
              <Col sm="6" className={cx('col')}>
                <Button
                  onClick={isCompletedTest ? handleReviewTest : handleContinueTest}
                  variant="outline-primary"
                  className={cx('preview-button', 'button')}
                >
                  {isCompletedTest ? t('review') : t('continued')}
                </Button>
              </Col>
            )}
            <Col sm="6" className={cx('col')}>
              <Button
                onClick={handleStartPractice}
                variant="outline-success"
                className={cx('practice-button', 'button')}
              >
                {isNewTest ? t('practiceNow') : t('restart')}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col sm="4" className={cx('col')}>
          <Row className={cx('figures-wrapper')}>
            <Row className={cx('figure', 'white')}>
              <Col sm="6" className={cx('separate')}>
                <h4 className={cx('title')}>{t('correct')}</h4>
              </Col>
              <Col sm="6" className={cx('number-wrapper')}>
                <strong className={cx('number', 'correct')}>{correctAnswers}</strong>
              </Col>
            </Row>
            <Row className={cx('figure', 'white')}>
              <Col sm="6" className={cx('separate')}>
                <h4 className={cx('title')}>{t('incorrect')}</h4>
              </Col>
              <Col sm="6" className={cx('number-wrapper')}>
                <strong className={cx('number', 'incorrect')}>{incorrectAnswers}</strong>
              </Col>
            </Row>
            <Row className={cx('figure', 'white')}>
              <Col sm="6" className={cx('separate')}>
                <h4 className={cx('title')}>{t('new')}</h4>
              </Col>
              <Col sm="6" className={cx('number-wrapper')}>
                <strong className={cx('number', 'new')}>{newQuestions}</strong>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ScoredBoard;
