import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Header from '~/components/Compose/Header';
import VocabularyTopics from '~/components/VocabularyTopics';
import UserModeProvider from '~/context/UserModeProvider';
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
import CustomModal from '~/components/CustomModal';
import styles from './Vocabulary.module.scss';
import Sidebar from '~/components/Compose/Sidebar';
import Loading from '~/components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import CustomTextArea from '~/components/CustomTextArea';
import Vocabularies from '~/components/Vocabularies';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const Vocabulary = ({ isUser = false }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(true);
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
  const [vocabulariesStr, setVocabulariesStr] = useState('');
  const debouncedValue = hooks.useDebounce(vocabulariesStr, 2000);
  const [words, setWords] = useState([]);
  const { uploadPhoto, createPhoto } = hooks.usePhotoService();
  const { getAllVocabularyTopics, createVocabularyTopic, updateVocabularyTopic, deleteTopic } =
    hooks.useVocabularyTopicService();
  const { getByTopicId } = hooks.useVocabularyService();
  const newVocabularyTopic = hooks.useNewVocabularyTopic();

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
    <div className={cx('container')}>
      <UserModeProvider isUserMode={isUser}>
        {/* Header */}
        <Header
          className={cx('header', { scaled: showSidebar })}
          title={'vocabulary'}
          show={showSidebar}
          setShow={setShowSidebar}
          isAddNew={isAddNew}
          isEdit={isEdit}
          isComplete={isComplete}
          onCancel={handleCancel}
          onComplete={handleComplete}
        />
        <div
          className={cx('main', {
            'sidebar-scaled': showSidebar,
            // 'bottombar-scaled': showBottombar
          })}
        >
          {/* Vocabularies */}
          <div className={cx('top')}></div>
          {(isEdit || isAddNew) && (
            <CustomTextArea
              rows={3}
              isEnableUploadButton={false}
              value={vocabulariesStr}
              onChange={(e) => setVocabulariesStr(e.target.value)}
              isEditable={isAddNew || isEdit}
              title="enterWordsInThisBox"
            />
          )}

          {isVocabulariesLoading ? <Loading /> : <Vocabularies className={cx('vocabularies')} />}
        </div>
        {/* Sidebar: Group question */}
        <Sidebar className={cx('sidebar', 'hide-on-mobile-tablet')} title={'vocabulary'} show={showSidebar}>
          {isVocabularyTopicsLoading ? (
            <Loading />
          ) : (
            <VocabularyTopicProvider
              onDelete={(topicId) => {
                setShowDeleteModal(true);
                setTopicId(topicId);
              }}
            >
              <VocabularyTopics isComplete={isComplete} onCancel={handleCancelAddNew} />
            </VocabularyTopicProvider>
          )}
        </Sidebar>
        {/* Modal ask cancel edit */}
        <CustomModal
          title={t('cancelEdit')}
          body={t('confirmCancelEdit')}
          show={showAskCancel}
          setShow={setShowAskCancel}
          handleAgreeButtonClick={handleCancel}
        />

        {/* Modal ask delete */}
        <CustomModal
          title={t('deleteQuestionGroup')}
          body={t('confirmDeleteQuestionGroup')}
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          handleAgreeButtonClick={handleDeleteVocabularyTopic}
        />

        <ToastContainer stacked draggable />
      </UserModeProvider>
    </div>
  );
};

export default Vocabulary;
