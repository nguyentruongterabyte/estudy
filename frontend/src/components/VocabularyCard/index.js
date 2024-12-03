import classNames from 'classnames/bind';
import styles from './VocabularyCard.module.scss';

import FlipCard from '../FlipCard';
import DisplayImage from '../DisplayImage';
import { adding, editing } from '~/redux/features/vocabularyTopicsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateDefinition, updateExample, updatePhoto, updatePronunciation } from '~/redux/features/vocabulariesSlice';
import { Fragment, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import hooks from '~/hooks';
import { useErrorFields } from '~/context/ErrorFieldsProvider';
import { useUserMode } from '~/context/UserModeProvider';
import { statuses, updateStatus, vocabularyPracticeStatusList } from '~/redux/features/vocabularyPracticeStatusesSlice';

const cx = classNames.bind(styles);

const VocabularyCard = ({ data }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const vocabularyPracticeStatuses = useSelector(vocabularyPracticeStatusList);
  const vocabularyPracticeStatus = vocabularyPracticeStatuses.find((vps) => vps.vocabularyId === data.id);

  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const isEditable = isAddNew || isEdit;
  const [pronunciationInputValue, setPronounciationInputValue] = useState(data.pronunciation);
  const [definitionInputnValue, setDefinitionInputValue] = useState(data.definition);
  const [exampleInputValue, setExampleInputValue] = useState(data.example);

  const pronunciationDebouncedValue = hooks.useDebounce(pronunciationInputValue, 300);
  const definitionDebouncedValue = hooks.useDebounce(definitionInputnValue, 300);
  const exampleDebouncedValue = hooks.useDebounce(exampleInputValue, 300);
  const errorFields = useErrorFields();
  const { isUserMode, userId } = useUserMode();

  const { updateVocabularyStatus } = hooks.useVocaburyPracticeStatusesService();

  const photo = data.photo;

  const highlightedExample = () => {
    if (!data.example || !data.word) return data.example; // Trả về bình thường nếu không có example hoặc word

    // const stem = natural.PorterStemmer.stem(data.word);

    const regex = new RegExp(`\\b(${data.word})\\b`, 'gi');
    return data.example.replace(regex, '<b>$1</b>'); // Thay thế từ bằng phiên bản in đậm
  };

  const handleImageUpload = (file) => {
    dispatch(updatePhoto({ id: data.id, photo: file }));
  };

  const handleUpdateVocabularyStatus = async (e, status) => {
    e.stopPropagation();
    await updateVocabularyStatus(userId, data.id, status).then(() => {
      dispatch(updateStatus({ vocabularyId: data.id, status: status }));
    });

    console.log(data.id, status);
  };

  useEffect(() => {
    if (definitionDebouncedValue !== data.definition)
      dispatch(updateDefinition({ id: data.id, definition: definitionDebouncedValue }));
    // eslint-disable-next-line
  }, [definitionDebouncedValue]);

  useEffect(() => {
    if (pronunciationDebouncedValue !== data.pronunciation)
      dispatch(updatePronunciation({ id: data.id, pronunciation: pronunciationDebouncedValue }));
    // eslint-disable-next-line
  }, [pronunciationDebouncedValue]);

  useEffect(() => {
    if (exampleDebouncedValue !== data.example)
      dispatch(updateExample({ id: data.id, example: exampleDebouncedValue }));
    // eslint-disable-next-line
  }, [exampleDebouncedValue]);

  return (
    <FlipCard
      className={cx('container')}
      headerContent={
        <Fragment>
          {isUserMode && (
            <Button
              className={cx('button', 'status')}
              variant={
                vocabularyPracticeStatus?.status === statuses.memorized
                  ? 'outline-info'
                  : vocabularyPracticeStatus?.status === statuses.unmemorized
                  ? 'outline-danger'
                  : 'outline-secondary'
              }
            >
              {vocabularyPracticeStatus?.status === statuses.memorized
                ? t('memorized')
                : vocabularyPracticeStatus?.status === statuses.unmemorized
                ? t('unmemorized')
                : t('new')}
            </Button>
          )}
        </Fragment>
      }
      frontChildrend={
        <div className={cx('front')}>
          <DisplayImage
            onClick={(e) => {
              isEditable && e.stopPropagation();
            }}
            onImageUpload={handleImageUpload}
            isEditable={isEditable}
            className={cx('photo')}
            imageUrl={photo instanceof File ? URL.createObjectURL(photo) : photo}
            photoId={`vocab_${data.id}`}
          />
          <h3 className={cx('word')}>{data.word}</h3>
          {isEditable ? (
            <Form.Control
              value={pronunciationInputValue}
              onChange={(e) => setPronounciationInputValue(e.target.value)}
              className={cx(
                'input',
                { error: isEditable && errorFields && errorFields[`pronunciation_${data.id}`] },
                'pronunciation',
              )}
              placeholder={t('pronunciation')}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <h4 className={cx('pronunciation')}>{data.pronunciation}</h4>
          )}
        </div>
      }
      backChildren={
        <div className={cx('back')}>
          {isEditable ? (
            <Form.Control
              value={definitionInputnValue}
              onChange={(e) => setDefinitionInputValue(e.target.value)}
              as={'textarea'}
              rows={2}
              className={cx(
                'input',
                { error: isEditable && errorFields && errorFields[`definition_${data.id}`] },
                'definition',
              )}
              placeholder={t('definition')}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <h3 className={cx('definition')}>{data.definition}</h3>
          )}
          {isEditable ? (
            <Form.Control
              value={exampleInputValue}
              onChange={(e) => setExampleInputValue(e.target.value)}
              as={'textarea'}
              rows={3}
              className={cx(
                'input',
                { error: isEditable && errorFields && errorFields[`example_${data.id}`] },
                'example',
              )}
              placeholder={t('example')}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className={cx('example')} dangerouslySetInnerHTML={{ __html: highlightedExample() }}></p>
          )}

          {isUserMode && (
            <div className={cx('button-group')}>
              <Button
                onClick={(e) => handleUpdateVocabularyStatus(e, statuses.unmemorized)}
                className={cx('unmemorized-button', 'button')}
                variant="danger"
                size="lg"
              >
                {t('studyAgain')}
              </Button>

              <Button
                onClick={(e) => handleUpdateVocabularyStatus(e, statuses.memorized)}
                className={cx('unmemorized-button', 'button')}
                variant="info"
                size="lg"
              >
                {t('gotIt')}
              </Button>
            </div>
          )}
        </div>
      }
    />
  );
};

export default VocabularyCard;
