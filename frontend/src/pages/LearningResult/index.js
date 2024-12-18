import classNames from 'classnames/bind';
import styles from './LearningResult.module.scss';
import { ResponsiveRadar } from '@nivo/radar';
import { useEffect, useState } from 'react';
import hooks from '~/hooks';
import { statuses } from '~/redux/features/vocabularyPracticeStatusesSlice';
import { Col, Container, Row } from 'react-bootstrap';
import images from '~/assets/images';
import CircularProgress from '~/components/CircularProgress';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const LearningResult = () => {
  const { t } = useTranslation();
  const { getCorrectAnswerPercentageByGrammars, getCorrectAnswerPercentageByParts, getVocabularyLearningPercentage } =
    hooks.useAnalyticService();
  const [
    {
      grammarAnswered,
      readingAnswered,
      listeningAnswered,
      vocabularyAnswered,

      grammarCorrect,
      readingCorrect,
      listeningCorrect,
      vocabularyLearned,

      totalVocabularies,
      grammarTotalQuestions,
      listeningTotalQuestions,
      readingTotalQuestions,
    },
    setLearningResult,
  ] = useState({
    grammarCorrect: 0,
    readingCorrect: 0,
    listeningCorrect: 0,
    vocabularyLearned: 0,

    grammarAnswered: 0,
    readingAnswered: 0,
    listeningAnswered: 0,
    vocabularyAnswered: 0,

    totalVocabularies: 0,
    grammarTotalQuestions: 0,
    listeningTotalQuestions: 0,
    readingTotalQuestions: 0,
  });

  const [
    {
      overallPercentage,

      listeningCorrectPercentage,
      listeningAnsweredPercentage,

      readingCorrectPercentage,
      readingAnsweredPercentage,

      grammarCorrectPercentage,
      grammarAnsweredPercentage,

      vocabularyLearnedPercentage,
      vocabularyAnsweredPercentage,
    },
    setPercentages,
  ] = useState({
    overallPercentage: 0,

    listeningCorrectPercentage: 0,
    listeningAnsweredPercentage: 0,

    readingCorrectPercentage: 0,
    readingAnsweredPercentage: 0,

    grammarCorrectPercentage: 0,
    grammarAnsweredPercentage: 0,

    vocabularyLearnedPercentage: 0,
    vocabularyAnsweredPercentage: 0,
  });

  const readingPartIds = [5, 6, 7, 8, 9];
  const listeningPartIds = [1, 2, 3, 4];

  const data = [
    { feature: `${t('grammar')} (${grammarAnsweredPercentage}%)`, value: grammarAnsweredPercentage },
    {
      feature: `${t('vocabulary')} (${vocabularyAnsweredPercentage}%)`,
      value: vocabularyAnsweredPercentage,
    },
    { feature: `${t('reading')} (${readingAnsweredPercentage}%)`, value: readingAnsweredPercentage },
    {
      feature: `${t('listening')} (${listeningAnsweredPercentage}%)`,
      value: listeningAnsweredPercentage,
    },
    { feature: `${t('overall')} (${overallPercentage}%)`, value: overallPercentage },
  ];

  useEffect(() => {
    const fetchCorrectAnswerPercentageByGrammars = async () => {
      const percentage = await getCorrectAnswerPercentageByGrammars();
      return percentage;
    };

    const fetchCorrectAnswerPercentageByParts = async (partIds) => {
      const percentage = await getCorrectAnswerPercentageByParts(partIds);
      return percentage;
    };

    const fetchVocabularyLearningPercentage = async (status) => {
      const percentage = await getVocabularyLearningPercentage(status);
      return percentage;
    };

    // grammar percentage
    fetchCorrectAnswerPercentageByGrammars().then((percentage) => {
      if (percentage) {
        setLearningResult((prev) => ({
          ...prev,
          grammarCorrect: percentage.correctAnswers,
          grammarAnswered: percentage.answeredQuestions,
          grammarTotalQuestions: percentage.totalQuestions,
        }));
      }
    });

    // listening percentage
    fetchCorrectAnswerPercentageByParts(listeningPartIds).then((percentage) => {
      if (percentage) {
        setLearningResult((prev) => ({
          ...prev,
          listeningCorrect: percentage.correctAnswers,
          listeningAnswered: percentage.answeredQuestions,
          listeningTotalQuestions: percentage.totalQuestions,
        }));
      }
    });

    // reading percentage
    fetchCorrectAnswerPercentageByParts(readingPartIds).then((percentage) => {
      if (percentage) {
        setLearningResult((prev) => ({
          ...prev,
          readingCorrect: percentage.correctAnswers,
          readingAnswered: percentage.answeredQuestions,
          readingTotalQuestions: percentage.totalQuestions,
        }));
      }
    });

    // vocabulary percentage
    fetchVocabularyLearningPercentage(statuses.memorized).then((percentage) => {
      if (percentage) {
        setLearningResult((prev) => ({
          ...prev,
          vocabularyLearned: percentage.learnedVocabularies,
          vocabularyAnswered: percentage.answeredVocabularies,
          totalVocabularies: percentage.totalVocabularies,
        }));
      }
    });
    // eslint-disable-next-line
  }, []);

  // grammar answered percentage
  useEffect(() => {
    if (grammarTotalQuestions !== 0) {
      setPercentages((prev) => ({
        ...prev,
        grammarAnsweredPercentage: Math.round((grammarAnswered / grammarTotalQuestions) * 100),
      }));
    }
  }, [grammarAnswered, grammarTotalQuestions]);

  // grammar correct percentage
  useEffect(() => {
    if (grammarTotalQuestions !== 0) {
      setPercentages((prev) => ({
        ...prev,
        grammarCorrectPercentage: Math.round((grammarCorrect / grammarTotalQuestions) * 100),
      }));
    }
  }, [grammarCorrect, grammarTotalQuestions]);

  // listening answered percentage
  useEffect(() => {
    if (listeningTotalQuestions !== 0) {
      setPercentages((prev) => ({
        ...prev,
        listeningAnsweredPercentage: Math.round((listeningAnswered / listeningTotalQuestions) * 100),
      }));
    }
  }, [listeningAnswered, listeningTotalQuestions]);

  // listening correct percentage
  useEffect(() => {
    if (listeningTotalQuestions !== 0) {
      setPercentages((prev) => ({
        ...prev,
        listeningCorrectPercentage: Math.round((listeningCorrect / listeningTotalQuestions) * 100),
      }));
    }
  }, [listeningCorrect, listeningTotalQuestions]);

  // reading answered percentage
  useEffect(() => {
    if (readingTotalQuestions !== 0) {
      setPercentages((prev) => ({
        ...prev,
        readingAnsweredPercentage: Math.round((readingAnswered / readingTotalQuestions) * 100),
      }));
    }
  }, [readingAnswered, readingTotalQuestions]);

  // reading correct percentage
  useEffect(() => {
    if (readingTotalQuestions !== 0) {
      setPercentages((prev) => ({
        ...prev,
        readingCorrectPercentage: Math.round((readingCorrect / readingTotalQuestions) * 100),
      }));
    }
  }, [readingCorrect, readingTotalQuestions]);

  // vocabulary answerd percentage
  useEffect(() => {
    if (totalVocabularies !== 0) {
      setPercentages((prev) => ({
        ...prev,
        vocabularyAnsweredPercentage: Math.round((vocabularyAnswered / totalVocabularies) * 100),
      }));
    }
  }, [vocabularyAnswered, totalVocabularies]);

  // vocabulary learned percentage
  useEffect(() => {
    if (totalVocabularies !== 0) {
      setPercentages((prev) => ({
        ...prev,
        vocabularyLearnedPercentage: Math.round((vocabularyLearned / totalVocabularies) * 100),
      }));
    }
  }, [vocabularyLearned, totalVocabularies]);

  // calculate overall percentage
  useEffect(() => {
    const overallPercentage =
      (grammarAnsweredPercentage +
        vocabularyAnsweredPercentage +
        readingAnsweredPercentage +
        listeningAnsweredPercentage) /
      4;
    setPercentages((prev) => ({ ...prev, overallPercentage }));
  }, [grammarAnsweredPercentage, vocabularyAnsweredPercentage, readingAnsweredPercentage, listeningAnsweredPercentage]);

  return (
    <Container className={cx('container')}>
      <Row>
        <Col sm={8}>
          <Radar data={data} />
        </Col>
        <Col sm={4}>
          <Row>
            {/* Listening Card */}
            <Col sm={12}>
              <ResultLearningCard
                imageSrc={images.listening}
                cardTitle={t('listening')}
                answeredQuantity={`${listeningAnswered}/${listeningTotalQuestions}`}
                correctPercentage={listeningCorrectPercentage}
              />
            </Col>
            {/* Reading Card */}
            <Col sm={12}>
              <ResultLearningCard
                imageSrc={images.reading}
                cardTitle={t('reading')}
                answeredQuantity={`${readingAnswered}/${readingTotalQuestions}`}
                correctPercentage={readingCorrectPercentage}
              />
            </Col>
            {/* Grammar Card */}
            <Col sm={12}>
              <ResultLearningCard
                imageSrc={images.grammar}
                cardTitle={t('grammar')}
                answeredQuantity={`${grammarAnswered}/${grammarTotalQuestions}`}
                correctPercentage={grammarCorrectPercentage}
              />
            </Col>
            {/* Vocabulary Card */}
            <Col sm={12}>
              <ResultLearningCard
                imageSrc={images.vocabulary}
                cardTitle={t('vocabulary')}
                answeredQuantity={`${vocabularyAnswered}/${totalVocabularies}`}
                correctPercentage={vocabularyLearnedPercentage}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const ResultLearningCard = ({ imageSrc, cardTitle, answeredQuantity, correctPercentage }) => {
  const { t } = useTranslation();

  return (
    <Row className={cx('result-learning-card')}>
      <Col sm={8} className={cx('content')}>
        <img className={cx('img')} src={imageSrc} alt={cardTitle} />
        <strong className={cx('title')}>{cardTitle}</strong>
        <h4 className={cx('answered-quantity')}>
          <span>{answeredQuantity}</span>
          {t('answered')}
        </h4>
      </Col>
      <Col sm={4} className={cx('progress-bar')}>
        <CircularProgress percentage={correctPercentage} />
        <h6>{t('correct')}</h6>
      </Col>
    </Row>
  );
};

const Radar = ({ data = [] }) => {
  return (
    <div className={cx('radar')}>
      <ResponsiveRadar
        data={data}
        keys={['value']}
        indexBy="feature"
        maxValue={100}
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={10}
        gridShape="linear"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
      />
    </div>
  );
};

export default LearningResult;
