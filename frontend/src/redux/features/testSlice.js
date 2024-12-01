import { createSlice } from '@reduxjs/toolkit';
import logFields from '../logFields';

const initialState = {
  isComplete: false,
  test: {
    questions: [
      {
        id: 0,
        photoId: 0,
        photo: '',
        audioId: 1,
        audio: '',
        answers: [],
        correctAnswerIndex: 0,
        correctAnswer: { answerId: 0, explain: '' },
      },
      {
        id: 1,
        photoId: 1,
        photo: '',
        audioId: 2,
        audio: '',
        answers: [],
        correctAnswerIndex: 0,
        correctAnswer: { answerId: 0, explain: '' },
      },
      {
        id: 2,
        photoId: 2,
        photo: '',
        audioId: 3,
        audio: '',
        answers: [],
        correctAnswerIndex: 0,
        correctAnswer: { answerId: 0, explain: '' },
      },
      {
        id: 3,
        photoId: 3,
        photo: '',
        audioId: 4,
        audio: '',
        answers: [],
        correctAnswerIndex: 0,
        correctAnswer: { answerId: 0, explain: '' },
      },
      {
        id: 4,
        photoId: 4,
        photo: '',
        audioId: 5,
        audio: '',
        answers: [],
        correctAnswerIndex: 0,
        correctAnswer: { answerId: 0, explain: '' },
      },
      {
        id: 5,
        photoId: 5,
        photo: '',
        audioId: 6,
        audio: '',
        answers: [],
        correctAnswerIndex: 0,
        correctAnswer: { answerId: 0, explain: '' },
      },
    ],
  },

  changeLog: [],
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    // is complete false/true
    toggleComplete: (state, action) => ({
      ...state,
      isComplete: action.payload.toggle,
    }),

    // remove change log field
    removeChangeLogsByField: (state, action) => ({
      ...state,
      changeLog: state.changeLog.filter((log) => log.field !== action.payload.field),
    }),

    // change correct answer index (by id)
    changeCorrectAnswerIndex: (state, action) => {
      const updatedStateWithCorrectAnswerIndex = {
        ...state,
        test: {
          ...state.test,
          questions: state.test.questions.map((question) =>
            question.id === action.payload.questionId
              ? {
                  ...question,
                  correctAnswerIndex: action.payload.index,
                  correctAnswer: { answerId: question.answers[action.payload.index].id },
                }
              : question,
          ),
        },
      };
      const changeCorrectAnswerIndexLog = {
        field: logFields.correctAnswer,
        questionId: action.payload.questionId,
        oldValue: state.test.questions.find((q) => q.id === action.payload.questionId).correctAnswer.answerId,
        newValue: action.payload.answerId,
      };

      return {
        ...updatedStateWithCorrectAnswerIndex,
        changeLog: [...updatedStateWithCorrectAnswerIndex.changeLog, changeCorrectAnswerIndexLog],
      };
    },

    // change questions
    changeQuestions: (state, action) => ({
      ...state,
      test: {
        ...state.test,
        questions: action.payload.questions,
      },
    }),
    // update question text
    updateQuestionText: (state, action) => {
      const updatedStateWithQuestionText = {
        ...state,
        test: {
          ...state.test,
          questions: state.test.questions.map((question) =>
            question.id === action.payload.questionId
              ? {
                  ...question,
                  question: action.payload.questionText,
                }
              : question,
          ),
        },
      };

      const changeQuestionTextLog = {
        field: logFields.questionText,
        questionId: action.payload.questionId,
        oldValue: state.test.questions.find((q) => q.id === action.payload.questionId).question,
        newValue: action.payload.questionText,
      };

      return {
        ...updatedStateWithQuestionText,
        changeLog: [...updatedStateWithQuestionText.changeLog, changeQuestionTextLog],
      };
    },

    // update question photo
    updateQuestionPhoto: (state, action) => {
      const updatedStateWithPhoto = {
        ...state,
        test: {
          ...state.test,
          questions: state.test.questions.map((question) =>
            question.id === action.payload.questionId
              ? {
                  ...question,
                  photo: action.payload.photo,
                }
              : question,
          ),
        },
      };

      const oldQuestion = state.test.questions.find((q) => q.id === action.payload.questionId);

      const changePhotoLog = {
        field: logFields.photo,
        photoId: oldQuestion.photoId,
        questionId: action.payload.questionId,
        oldValue: oldQuestion.photo,
        newValue: action.payload.photo,
      };
      return {
        ...updatedStateWithPhoto,
        changeLog: [...updatedStateWithPhoto.changeLog, changePhotoLog],
      };
    },

    // update question audio
    updateQuestionAudio: (state, action) => {
      const updatedStateWithAudio = {
        ...state,
        test: {
          ...state.test,
          questions: state.test.questions.map((question) =>
            question.id === action.payload.questionId ? { ...question, audio: action.payload.audio } : question,
          ),
        },
      };

      const changeAudioLog = {
        field: logFields.audio,
        audioId: state.test.questions.find((q) => q.id === action.payload.questionId).audioId,
        questionId: action.payload.questionId,
        oldValue: state.test.questions.find((q) => q.id === action.payload.questionId).audio,
        newValue: action.payload.audio,
      };

      return {
        ...updatedStateWithAudio,
        changeLog: [...updatedStateWithAudio.changeLog, changeAudioLog],
      };
    },

    // update answer
    updateAnswer: (state, action) => {
      const updatedStateWithAnswer = {
        ...state,
        test: {
          ...state.test,
          questions: state.test.questions.map((question) =>
            question.id === action.payload.questionId
              ? {
                  ...question,
                  answers: question.answers.map((answer) =>
                    answer.index === action.payload.index ? { ...answer, answer: action.payload.answerText } : answer,
                  ),
                }
              : question,
          ),
        },
      };

      const oldAnswer = state.test.questions
        .find((q) => q.id === action.payload.questionId)
        .answers.find((a) => a.index === action.payload.index);

      const changeAnswerLog = {
        field: logFields.answer,
        questionId: action.payload.questionId,
        answerId: oldAnswer.id,
        oldValue: oldAnswer.answer,
        newValue: action.payload.answerText,
      };

      return {
        ...updatedStateWithAnswer,
        changeLog: [...updatedStateWithAnswer.changeLog, changeAnswerLog],
      };
    },

    // reset change log
    resetChangeLog: (state, _) => ({
      ...state,
      changeLog: [],
    }),

    // delete question
    deleteQuestion: (state, action) => {
      const deleteQuestion = state.test.questions.find((question) => question.id === action.payload.id);

      const updatedStateWithQuestionDeletion = {
        ...state,
        test: {
          ...state.test,
          questions: [...state.test.questions.filter((question) => question.id !== action.payload.id)],
        },
      };

      const log = {
        field: logFields.deleteQuestion,
        id: deleteQuestion.id,
      };

      const oldChangeLog = [
        ...updatedStateWithQuestionDeletion.changeLog.filter(
          (change) => !(change.questionId && change.questionId === action.payload.id),
        ),
      ];

      // only write log with questions which get from db
      return deleteQuestion.isAddNew
        ? {
            ...updatedStateWithQuestionDeletion,
            changeLog: [...oldChangeLog],
          }
        : {
            ...updatedStateWithQuestionDeletion,
            changeLog: [...oldChangeLog, log],
          };
    },

    // add new question
    addQuestion: (state, action) => {
      const id = state.test.questions.length + 1;
      const newQuestion = {
        id,
        isAddNew: true,
        photoId: id,
        audioId: id,
        photo: '',
        audio: '',
        question: '',
        correctAnswer: { answerId: 0 },
        correctAnswerIndex: 0,
        answers: Array.from({ length: action.payload.quantityOfAnswersPerQuestion }).map((_, answerIndex) => ({
          id: answerIndex,
          index: answerIndex,
          answer: '',
        })),
      };

      return {
        ...state,
        test: {
          ...state.test,
          questions: [...state.test.questions, newQuestion],
        },
      };
    },

    // update explain text
    updateExplainText: (state, action) => {
      const updatedStateWithExplainText = {
        ...state,
        test: {
          ...state.test,
          questions: state.test.questions.map((question) =>
            question.id === action.payload.questionId
              ? {
                  ...question,
                  correctAnswer: {
                    ...question.correctAnswer,
                    explain: action.payload.explainText,
                  },
                }
              : question,
          ),
        },
      };

      const changeQuestionTextLog = {
        field: logFields.explainText,
        questionId: action.payload.questionId,
        oldValue: state.test.questions.find((q) => q.id === action.payload.questionId).correctAnswer.explain,
        newValue: action.payload.explainText,
      };

      return {
        ...updatedStateWithExplainText,
        changeLog: [...updatedStateWithExplainText.changeLog, changeQuestionTextLog],
      };
    },
  },
});

export const {
  changeQuestions,
  updateQuestionPhoto,
  updateQuestionAudio,
  updateQuestionText,
  updateAnswer,
  removeChangeLogsByField,
  changeCorrectAnswerIndex,
  toggleComplete,
  resetChangeLog,
  deleteQuestion,
  addQuestion,
  updateExplainText
} = testSlice.actions;
export default testSlice.reducer;
export const questionList = (state) => state.test.test.questions;
export const changeLog = (state) => state.test.changeLog;
export const isAddNew = (state) => state.test.isAddNew;
export const isEdit = (state) => state.test.isEdit;
export const isComplete = (state) => state.test.isComplete;
