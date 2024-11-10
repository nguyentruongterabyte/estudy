import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import styles from './Photos.module.scss';
import Header from './Header';
import hooks from '~/hooks';

import Sidebar from './Sidebar';
import Answers from './Answers';
import QuestionProvider from '~/context/QuestionProvider';
import { getQuestionGroups, getQuestionsByGroupId } from '~/utils/questionService';

const cx = classNames.bind(styles);

const Photos = () => {
  const [show, setShow] = useState(true);
  const [questionGroups, setQuestionGroups] = useState([]);
  const [groupId, setGroupId] = useState();
  const [questions, setQuestions] = useState([]);

  const axiosPrivate = hooks.useAxiosPrivate();

  // fetch question groups data
  const fetchQuestionGroups = async (partId) => {
    const groups = await getQuestionGroups(partId);
    setQuestionGroups(groups);
  };

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const questions = await getQuestionsByGroupId(groupId);
    setQuestions(questions);
  };

  // handle on group question item clicked
  const handleOnGroupQuestionClick = (id) => {
    setGroupId(id);
  };
  useEffect(() => {
    fetchQuestionGroups(1);
  }, []);

  useEffect(() => {
    if (questionGroups.length > 0) {
      setGroupId(questionGroups[0].id);
    }
  }, [questionGroups]);

  useEffect(() => {
    if (groupId) {
      fetchQuestions(groupId);
    }
  }, [groupId]);

  return (
    <>
      <div className={cx('container', { scaled: show })}>
        {/* Header */}
        <Header show={show} setShow={setShow} />
        {/* Questions */}
        {
          questions.map((question, index) => (
            <Accordion key={question.id} defaultActiveKey={0} className={cx('accordio-item')}>
              <Accordion.Item eventKey={String(index)}>
                <Accordion.Header>Question #{index + 1}</Accordion.Header>
                <Accordion>
                  {/* Answers */}
                  <QuestionProvider question={question}>
                    <Answers />
                  </QuestionProvider>
                </Accordion>
              </Accordion.Item>
            </Accordion>
          ))

          // 6 Questions
          // Array.from({ length: 6 }).map((_, index) => (
          //   <Accordion key={index} defaultActiveKey="0" className={cx('accordion-item')}>
          //     <Accordion.Item eventKey={String(index)}>
          //       <Accordion.Header>Question #{index + 1}</Accordion.Header>
          //       <Accordion.Body>
          //         {/* Answers */}
          //         <ListGroup>
          //           <ListGroup.Item>Answer 1</ListGroup.Item>
          //           <ListGroup.Item>Answer 2</ListGroup.Item>
          //           <ListGroup.Item>Answer 3</ListGroup.Item>
          //           <ListGroup.Item>Answer 4</ListGroup.Item>
          //         </ListGroup>
          //       </Accordion.Body>
          //     </Accordion.Item>
          //   </Accordion>
          // ))
        }
      </div>
      {/* Sidebar: Group question */}
      <Sidebar onItemClick={handleOnGroupQuestionClick} show={show} questionGroups={questionGroups} />
    </>
  );
};

export default Photos;
