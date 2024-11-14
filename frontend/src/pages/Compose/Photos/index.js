import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import styles from './Photos.module.scss';

import Sidebar from './Sidebar';
import QuestionGroupsProvider from '~/context/QuestionGroupsProvider';
import QuestionGroups from './QuestionGroups';
import Questions from './Questions';
import Header from './Header';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const Photos = () => {
  const [show, setShow] = useState(true);
  const [groupName, setGroupName] = useState('');
  const { uploadPhoto } = hooks.usePhotoService();
  const { uploadAudio } = hooks.useAudioService();

  const handleUploadMediaFiles = async (questions) => {
    const questionsWithMediaURLs = await Promise.all(
      questions.map(async (question) => {
        const photoUrl = await uploadPhoto(question.photo);
        const audioUrl = await uploadAudio(question.audio);

        console.log(`photo: ${photoUrl}`);
        console.log(`audio: ${audioUrl}`);

        return { ...question, photo: photoUrl, audio: audioUrl };
        // console.log( question.photo );
        // console.log( question.audio );
      }),
    );
    return questionsWithMediaURLs;
  };

  const handleComplete = async (questions) => {
    const questionsWithMediaURLs = await handleUploadMediaFiles(questions);
    console.log(questionsWithMediaURLs);
  };

  const handleGroupNameChange = (groupName) => {
    setGroupName(groupName);
  };

  return (
    <div className={cx('container')}>
      <QuestionGroupsProvider>
        <div className={cx('main', { scaled: show })}>
          {/* Header */}
          <Header show={show} setShow={setShow} />
          {/* Questions */}
          <Questions onComplete={handleComplete} />
        </div>
        {/* Sidebar: Group question */}
        <Sidebar title="Part 1: Photos" show={show}>
          <Fragment>
            <QuestionGroups onGroupNameChange={(groupName) => handleGroupNameChange(groupName)} partId={1} />
          </Fragment>
        </Sidebar>
      </QuestionGroupsProvider>
    </div>
  );
};

export default Photos;
