import { useQuestionGroups } from '~/context/QuestionGroupsProvider';
import Question from './Question';
import { Fragment, useEffect, useState } from 'react';
import hooks from '~/hooks';

const Questions = () => {
  const { getQuestionsByGroupId } = hooks.useQuestionService();
  const { groupId, isAddNew } = useQuestionGroups();
  const [ questions, setQuestions ] = useState( [] );

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const audio = true;
    const photo = true;
    const questions = await getQuestionsByGroupId(groupId, audio, photo);
    setQuestions(questions);
  };

  useEffect(() => {
    if ( groupId ) fetchQuestions( groupId );
    
  }, [ groupId ] );
  
  useEffect( () => {
    if ( isAddNew ) {
      setQuestions(Array.from({ length: 6 }).map((_, index) => ({
        id: index,
        photo: '',
        audio: '',
        answers: Array.from( { length: 4 } ).map( ( _, index ) => ( { id: index, answer: '' } ) ),
        correctAnswer: {answerId: 0}
      })));
    }
  }, [isAddNew]);

  return (
    <Fragment>
      {
      
        questions.map((question, index) => (
          <Question key={question.id} data={question} index={index} />
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
    </Fragment>
  );
};

export default Questions;
