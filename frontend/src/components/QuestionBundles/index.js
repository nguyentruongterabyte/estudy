import classNames from 'classnames/bind';

import styles from './QuestionBundles.module.scss';
import { Fragment, useEffect } from 'react';
import { toggleActive, toggleComplete, updateBundles } from '~/redux/features/questionBundlesSlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionBundle from '../QuestionBundle';
import { activeGroup, adding, editing } from '~/redux/features/questionGroupsSilce';
import Quote from '~/components/Quote';
import hooks from '~/hooks';
import base64 from '~/utils/base64';

const cx = classNames.bind(styles);

const QuestionBundles = ({
  data = [],
  isEnablePhoto,
  isEnableAudio,
  isEnableChooseNumberOfQuestion,
  isEnableExplainText,
  quantityOfQuestionsPerBundle = 3,
  quantityOfBundles = 13,
  quantityOfAnswersPerQuestion,
  quote,
  partId,
}) => {
  const dispatch = useDispatch();

  const isEdit = useSelector(editing);
  const isAddNew = useSelector(adding);

  const active = useSelector(activeGroup);

  const groupId = active.id;
  const { getItem: getNewSavedItem } = hooks.useSaveData('new_test');

  const newBundles = Array.from({ length: quantityOfBundles }).map((_, bundleIndex) => ({
    active: false,
    id: bundleIndex,
    photo: '',
    audio: '',
    text: '',
    isEnablePhoto: true,
    questions: Array.from({ length: quantityOfQuestionsPerBundle }).map((_, questionIndex) => ({
      id: questionIndex,
      question: '',
      order: bundleIndex * quantityOfQuestionsPerBundle + questionIndex + 1,
      correctAnswerIndex: 0,
      correctAnswer: { answerId: 0, explain: '' },
      answers: Array.from({ length: quantityOfAnswersPerQuestion }).map((_, answerIndex) => ({
        id: answerIndex,
        answer: '',
        index: answerIndex,
      })),
    })),
  }));

  // handle complete
  const handleComplete = () => {
    console.log(data);
  };

  // handle validate bundles
  const handleValidateBundles = () => {
    let isComplete = true;

    for (let i in data) {
      const bundle = data[i];

      // photo is empty
      if (isEnablePhoto && bundle.isEnablePhoto && !bundle.photo) {
        isComplete = false;
        break;
      }

      // audio is empty
      if (isEnableAudio && !bundle.audio) {
        isComplete = false;
        break;
      }

      // get questions
      const questions = bundle.questions;

      // all of questions is not empty
      const areQuestionsValid = questions.every((question) => question.question.trim() !== '');

      const answers = questions.map((question) => [...question.answers]).flat();

      // all of answers is not empty
      const areAnswersValid = answers.every((answer) => answer.answer.trim() !== '');

      if (!areQuestionsValid || !areAnswersValid) {
        isComplete = false;
        break;
      }
    }

    return isComplete;
  };

  useEffect(() => {
    const isComplete = handleValidateBundles();

    dispatch(toggleComplete({ toggle: isComplete }));
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (isAddNew) {
      const savedData = getNewSavedItem(partId);
      if (savedData) {
        const bundlesWithFiles = savedData.bundles.map((bundle) => {
          const bundleWithFiles = { ...bundle };

          if (bundle.photo) {
            bundleWithFiles.photo = base64.base64ToFile(bundle.photo, `bundle_photo_${bundle.id}.jpg`);
          }

          if (bundle.audio) {
            bundleWithFiles.audio = base64.base64ToFile(bundle.audio, `bundle_audio_${bundle.id}.mp3`);
          }

          return bundleWithFiles;
        });

        dispatch(updateBundles({ bundles: bundlesWithFiles }));
      } else {
        dispatch(updateBundles({ bundles: newBundles }));
      }

      dispatch(toggleActive({ index: 0 }));
    }
    // eslint-disable-next-line
  }, [isAddNew]);
  return (
    <Fragment>
      {data.length > 0 ? (
        <div className={cx('container')}>
          {data.map((bundle) => (
            <Fragment key={bundle.id}>
              {bundle.active && (
                <QuestionBundle
                  data={bundle}
                  isEnableExplainText={isEnableExplainText}
                  isEnableChooseNumberOfQuestion={isEnableChooseNumberOfQuestion}
                  isAddNew={isAddNew}
                  isEdit={isEdit}
                  onComplete={handleComplete}
                  isEnableAudio={isEnableAudio}
                  isEnablePhoto={isEnablePhoto}
                  quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
                  groupId={groupId}
                  quote={quote}
                />
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <Quote quote={quote} />
      )}
    </Fragment>
  );
};


export default QuestionBundles;
