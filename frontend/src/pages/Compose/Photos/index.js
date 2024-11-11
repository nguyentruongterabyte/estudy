import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import styles from './Photos.module.scss';
import Header from './Header';
import hooks from '~/hooks';

import Sidebar from './Sidebar';
import QuestionGroupsProvider, { useQuestionGroups } from '~/context/QuestionGroupsProvider';
import QuestionGroups from './QuestionGroups';
import Questions from './Questions';
import { Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

const Photos = () => {
  const [show, setShow] = useState(true);
  return (
    <div className={cx('container')}>
      <QuestionGroupsProvider >
        <div className={cx('main', { scaled: show })}>
          {/* Header */}
          <Header show={show} setShow={setShow} />
          {/* Questions */}
          <Questions />
        </div>
        {/* Sidebar: Group question */}
        <Sidebar title="Part 1: Photos" show={show}>
          <Fragment>
            <QuestionGroups partId={ 1 }/>
            
          </Fragment>
        </Sidebar>
      </QuestionGroupsProvider>
    </div>
  );
};

export default Photos;
