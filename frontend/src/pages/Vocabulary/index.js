import { useTranslation } from 'react-i18next';
import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import VocabularyTopics from '~/components/VocabularyTopics';
import VocabularyTopicProvider from '~/context/VocabularyTopicProvider';
import {
  activeTopic,
  addVocabularyTopic,
  adding,
  changeVocabularyTopics,
  deleteVocabularyTopic,
  editing,
  toggleAddNew,
  toggleEdit,
  updateName,
} from '~/redux/features/vocabularyTopicsSlice';
import {
  addVocabularies,
  changeVocabularies,
  finished,
  removeVocabularies,
  vocabularyList,
} from '~/redux/features/vocabulariesSlice';
import styles from './Vocabulary.module.scss';
import Loading from '~/components/Loading';
import { toast } from 'react-toastify';
import CustomTextArea from '~/components/CustomTextArea';
import Vocabularies from '~/components/Vocabularies';
import hooks from '~/hooks';
import ContentManager from '~/components/ContentManager';
import {
  changeVocabularyPracticeStatuses,
  statuses,
  vocabularyPracticeStatusList,
} from '~/redux/features/vocabularyPracticeStatusesSlice';
import Quote from '~/components/Quote';
import { Button } from 'react-bootstrap';
import CustomTable from '~/components/CustomTable';
import RenderIf from '~/components/RenderIf';

const cx = classNames.bind(styles);

const Vocabulary = ({ isUser = false }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isComplete = useSelector(finished);
  const active = useSelector(activeTopic);
  const vocabularies = useSelector(vocabularyList);
  const [showAskCancel, setShowAskCancel] = useState(false);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const [isVocabularyTopicsLoading, setIsVocabularyTopicsLoading] = useState(false);
  const [isVocabulariesLoading, setIsVocabulariesLoading] = useState(false);
  const [topicId, setTopicId] = useState(active.id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVocabulariesTable, setShowVocabulariesTable] = useState(false);
  const [vocabulariesStr, setVocabulariesStr] = useState('');
  const debouncedValue = hooks.useDebounce(vocabulariesStr, 2000);
  const [words, setWords] = useState([]);
  const { uploadPhoto, createPhoto } = hooks.usePhotoService();
  const { getAllVocabularyTopics, createVocabularyTopic, updateVocabularyTopic, deleteTopic } =
    hooks.useVocabularyTopicService();
  const { getByTopicId } = hooks.useVocabularyService();
  const newVocabularyTopic = hooks.useNewVocabularyTopic();
  const userId = hooks.useUserId();
  const vocabularyPracticeStatuses = useSelector(vocabularyPracticeStatusList);
  const vocabularyPracticeStatusesByTopicId = vocabularyPracticeStatuses.filter((vps) => vps.topicId === active.id);
  const showMainContent = vocabularyPracticeStatusesByTopicId.length > 0 || (!isUser && (isEdit || isAddNew));
  const isEditable = isAddNew || isEdit;
  const {
    memorized,
    unmemorized,
    unanswered,
    memorizedVocabularyIds,
    unmemorizedVocabularyIds,
    unansweredVocabularyIds,
  } = vocabularyPracticeStatusesByTopicId.reduce(
    (acc, vps) => {
      if (vps.status === statuses.memorized) {
        acc.memorized++;
        acc.memorizedVocabularyIds.push(vps.vocabularyId);
      } else if (vps.status === statuses.unmemorized) {
        acc.unmemorized++;
        acc.unmemorizedVocabularyIds.push(vps.vocabularyId);
      } else {
        acc.unanswered++;
        acc.unansweredVocabularyIds.push(vps.vocabularyId);
      }
      return acc;
    },
    {
      memorized: 0,
      unmemorized: 0,
      unanswered: 0,
      memorizedVocabularyIds: [],
      unmemorizedVocabularyIds: [],
      unansweredVocabularyIds: [],
    },
  );
  const [practiceStatus, setPracticeStatus] = useState(statuses.memorized);

  console.log(vocabularyPracticeStatuses);

  const { getVocabularyStatusesByUserId } = hooks.useVocaburyPracticeStatusesService();
  // handle delete vocabulary topic
  const handleDeleteVocabularyTopic = async () => {
    setShowDeleteModal(false);
    await toast
      .promise(deleteTopic(active.id), {
        pending: t('deletingVocabularyTopic'),
        success: t('deleteVocabularyTopicSuccess'),
        error: t('deleteVocabularyTopicFailed'),
      })
      .then(() => {
        dispatch(deleteVocabularyTopic({ topicId: active.id }));
        dispatch(changeVocabularies({ vocabularies: [] }));
      });
  };

  // handle upload media file into firebase
  const uploadMediaFiles = async (files, type) => {
    switch (type) {
      case 'photo':
        // handle upload photo file and get their urls
        const filePaths = await Promise.all(
          files.map(async (file) => {
            const filePath = await uploadPhoto(file);
            return filePath;
          }),
        );
        return filePaths;
      default:
        throw new Error('Type not found!');
    }
  };

  const handleAddNew = async (vocabularyTopic, filePaths) => {
    const data = await createVocabularyTopic(vocabularyTopic);
    let i = 0;
    dispatch(deleteVocabularyTopic({ topicId: newVocabularyTopic.id }));
    dispatch(addVocabularyTopic({ id: data.newTopic.id, name: data.newTopic.name }));
    dispatch(
      changeVocabularies({
        vocabularies: data.newVocabularies.map((vocab) =>
          vocab.photoId ? { ...vocab, photo: filePaths[i++] } : vocab,
        ),
      }),
    );
    dispatch(toggleAddNew({ toggle: false }));
  };

  const handleEdit = async (vocabularyTopic, filePaths) => {
    console.log(vocabularyTopic);
    let i = 0;
    const data = await updateVocabularyTopic(vocabularyTopic);
    dispatch(toggleEdit({ toggle: false }));
    dispatch(
      changeVocabularies({
        vocabularies: data.vocabularies.map((vocab) => (vocab.photoId ? { ...vocab, photo: filePaths[i++] } : vocab)),
      }),
    );

    dispatch(updateName({ id: data.id, name: data.name }));
  };

  const handleShowVocabulariesTable = (status) => {
    setPracticeStatus(status);
    setShowVocabulariesTable(true);
  };

  const handleComplete = async () => {
    // create url from upload firebase
    let photoFiles = [];
    let newDBPhotos = [];

    vocabularies.forEach((vocab) => {
      if (vocab.photo instanceof File) photoFiles.push(vocab.photo);
    });

    const filePaths = await toast.promise(uploadMediaFiles(photoFiles, 'photo'), {
      pending: t('uploadingMediaForQuestion'),
      success: t('uploadedMediaForQuestion'),
      error: t('failedToUploadMediaForQuestion'),
    });

    for (const filePath of filePaths) {
      const newDBPhoto = await createPhoto(filePath);
      newDBPhotos.push(newDBPhoto);
    }

    let photoIndex = 0;
    const vocabularyTopic = {
      name: active.name,
      vocabularies: vocabularies.map((vocab) =>
        vocab.photo instanceof File ? { ...vocab, photoId: newDBPhotos[photoIndex++].id } : vocab,
      ),
    };

    if (isAddNew) handleAddNew(vocabularyTopic, filePaths);
    if (isEdit) {
      vocabularyTopic.id = active.id;
      handleEdit(vocabularyTopic, filePaths);
    }
  };

  const handleCancel = () => {
    if (isEdit) dispatch(toggleEdit({ toggle: false }));
    if (isAddNew) {
      dispatch(toggleAddNew({ toggle: false }));
      dispatch(deleteVocabularyTopic({ topicId: newVocabularyTopic.id }));
    }
  };

  const handleCancelAddNew = () => {
    dispatch(toggleAddNew({ toggle: false }));
    dispatch(deleteVocabularyTopic({ topicId: newVocabularyTopic.id }));
  };

  useEffect(() => {
    const fetchVocabularyTopics = async () => {
      setIsVocabularyTopicsLoading(true);
      const vocabularyTopics = await getAllVocabularyTopics();
      setIsVocabularyTopicsLoading(false);
      dispatch(changeVocabularyTopics({ vocabularyTopics }));
    };

    const fetchVocabularyPracticeStatuses = async () => {
      const vocabularyPracticeStatuses = await getVocabularyStatusesByUserId(userId);

      dispatch(changeVocabularyPracticeStatuses({ vocabularyPracticeStatuses }));
    };

    fetchVocabularyPracticeStatuses();

    fetchVocabularyTopics();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const words = debouncedValue
      .split(/[,|;]/)
      .map((word) => word.trim())
      .filter((word) => word !== '');
    setWords((prevWords) => {
      // find removed words
      const removedWords = prevWords.filter((prevWord) => !words.includes(prevWord));

      if (removedWords.length > 0) {
        // handle remove vocabularies
        dispatch(removeVocabularies({ words: removedWords }));
      }

      return words;
    });
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    dispatch(addVocabularies({ words }));
    // eslint-disable-next-line
  }, [words]);

  useEffect(() => {
    if (isAddNew) dispatch(changeVocabularies({ vocabularies: [] }));
    // eslint-disable-next-line
  }, [isAddNew]);

  useEffect(() => {
    setTopicId(active.id);
  }, [active]);

  useEffect(() => {
    const fetchVocabularies = async () => {
      setIsVocabulariesLoading(true);
      const vocabularies = await getByTopicId(topicId);
      setIsVocabulariesLoading(false);
      dispatch(changeVocabularies({ vocabularies }));
    };

    fetchVocabularies();
    // eslint-disable-next-line
  }, [topicId]);

  useEffect(() => {
    if (isEdit) setVocabulariesStr(vocabularies.map((vocab) => vocab.word).join(', '));
    // eslint-disable-next-line
  }, [isEdit]);

  return (
    <ContentManager
      className={cx('container')}
      isUser={isUser}
      isEdit={isEdit}
      isAddNew={isAddNew}
      isComplete={isComplete}
      headerTitle="vocabulary"
      onHeaderCancel={handleCancel}
      onHeaderComplete={handleComplete}
      sidebarTitle="vocabulary"
      sidebarChildren={
        <Fragment>
          {isVocabularyTopicsLoading ? (
            <Loading />
          ) : (
            <VocabularyTopicProvider
              onDelete={(topicId) => {
                setShowDeleteModal(true);
                setTopicId(topicId);
              }}
            >
              <VocabularyTopics isComplete={isComplete} onComplete={handleComplete} onCancel={handleCancelAddNew} />
            </VocabularyTopicProvider>
          )}
        </Fragment>
      }
      mainChildren={
        <Fragment>
          {showMainContent ? (
            <div className={cx('main')}>
              <RenderIf isTrue={isEditable}>
                <CustomTextArea
                  rows={3}
                  isEnableUploadButton={false}
                  value={vocabulariesStr}
                  onChange={(content) => setVocabulariesStr(content)}
                  isEditable={isAddNew || isEdit}
                  title="enterWordsInThisBox"
                />
              </RenderIf>
              {isVocabulariesLoading ? <Loading /> : <Vocabularies className={cx('vocabularies')} />}
            </div>
          ) : (
            <Quote quote="quote10" />
          )}
        </Fragment>
      }
      isEnableBottombar={isUser && vocabularyPracticeStatusesByTopicId.length > 0}
      bottombarChildren={
        <div className={cx('practice-status')}>
          <h2 className={cx('topic-name')}>{active.name}</h2>
          <div className={cx('group')}>
            <Button
              onClick={() => handleShowVocabulariesTable(statuses.memorized)}
              variant="outline-info"
              className={cx('memorized', 'item')}
            >{`${memorized} ${t('memorized')}`}</Button>
            <Button
              onClick={() => handleShowVocabulariesTable(statuses.unmemorized)}
              variant="outline-danger"
              className={cx('unmemorized', 'item')}
            >
              {`${unmemorized} ${t('unmemorized')}`}
            </Button>
            <Button
              onClick={() => handleShowVocabulariesTable(statuses.unanswered)}
              variant="outline-secondary"
              className={cx('unanswered', 'item')}
            >
              {`${unanswered} ${t('unanswered')}`}
            </Button>
          </div>
        </div>
      }
      modalData={[
        {
          title: t('cancelEdit'),
          body: t('confirmCancelEdit'),
          show: showAskCancel,
          setShow: setShowAskCancel,
          handleAgreeButtonClick: handleCancel,
        },
        {
          title: t('deleteQuestionGroup'),
          body: t('confirmDeleteQuestionGroup'),
          show: showDeleteModal,
          setShow: setShowDeleteModal,
          handleAgreeButtonClick: handleDeleteVocabularyTopic,
        },
        {
          title: t(
            `${
              practiceStatus === statuses.memorized
                ? 'memorized'
                : practiceStatus === statuses.unmemorized
                ? 'unmemorized'
                : 'unanswered'
            }`,
          ),
          body: (
            <CustomTable
              headerTitles={[t('vocabulary'), t('pronunciation'), t('definition')]}
              bodyRows={vocabularies
                .filter((vocabulary) =>
                  (practiceStatus === statuses.memorized
                    ? memorizedVocabularyIds
                    : practiceStatus === statuses.unmemorized
                    ? unmemorizedVocabularyIds
                    : unansweredVocabularyIds
                  ).includes(vocabulary.id),
                )
                .map((vocabulary) => [vocabulary.word, vocabulary.pronunciation, vocabulary.definition])}
              striped
            />
          ),
          show: showVocabulariesTable,
          setShow: setShowVocabulariesTable,
          isEnableAgreeButton: false,
          props: {
            'aria-labelledby': 'contained-modal-title-vcenter',
            centered: true,
            fullscreen: true,
            'data-bs-theme': 'light',
          },
        },
      ]}
    />
  );
};

export default Vocabulary;
