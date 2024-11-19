import { createSlice } from '@reduxjs/toolkit';

export const logFields = {
  answer: 'answer',
  correctAnswer: 'correctAnswer',
  photo: 'photo',
  audio: 'audio',
  questionText: 'questionText',
  questionGroupName: 'questionGroupName',
};

const initialState = {
  isAddNew: false,
  isEdit: false,
  isComplete: false,
  test: {
    name: 'New test',
    partId: 1,
    groupId: 1,
    questions: [
      { id: 0, photoId: 0, photo: '', audioId: 1, audio: '', answers: [], correctAnswerIndex: 0 },
      { id: 1, photoId: 1, photo: '', audioId: 2, audio: '', answers: [], correctAnswerIndex: 0 },
      { id: 2, photoId: 2, photo: '', audioId: 3, audio: '', answers: [], correctAnswerIndex: 0 },
      { id: 3, photoId: 3, photo: '', audioId: 4, audio: '', answers: [], correctAnswerIndex: 0 },
      { id: 4, photoId: 4, photo: '', audioId: 5, audio: '', answers: [], correctAnswerIndex: 0 },
      { id: 5, photoId: 5, photo: '', audioId: 6, audio: '', answers: [], correctAnswerIndex: 0 },
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

    // is add new false/true
    toggleAddNew: (state, action) => ({
      ...state,
      isAddNew: action.payload.toggle,
    }),

    // is edit false/true
    toggleEdit: (state, action) => ({
      ...state,
      isEdit: action.payload.toggle,
    }),

    // remove change log field
    removeChangeLogsByField: (state, action) => ({
      ...state,
      changeLog: state.changeLog.filter((log) => log.field !== action.payload.field),
    }),

    // update question group id
    updateQuestionGroupId: (state, action) => ({
      ...state,
      test: {
        ...state.test,
        groupId: action.payload.groupId,
      },
    }),

    // update question group name
    updateQuestionGroupName: (state, action) => {
      const updatedStateWithGroupName = {
        ...state,
        test: {
          ...state.test,
          name: action.payload.name,
        },
      };

      const changeNameLog = {
        field: logFields.questionGroupName,
        oldValue: state.test.name,
        newValue: action.payload.name,
      };
      return {
        ...updatedStateWithGroupName,
        changeLog: [...updatedStateWithGroupName.changeLog, changeNameLog],
      };
    },

    // update question group name without log
    updateQuestionGroupNameWithoutLog: (state, action) => ({
      ...state,
      test: {
        ...state.test,
        name: action.payload.name,
      },
    }),
    // index of correct answer
    initCorrectAnswerIndex: (state, action) => ({
      ...state,
      test: {
        ...state.test,
        questions: state.test.questions.map((question) =>
          question.id === action.payload.questionId
            ? { ...question, correctAnswerIndex: action.payload.index }
            : question,
        ),
      },
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
                  correctAnswerIndex: question.answers.findIndex((answer) => answer.id === action.payload.answerId),
                  correctAnswer: { answerId: action.payload.answerId },
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

    // change question
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

      const changePhotoLog = {
        field: logFields.photo,
        photoId: state.test.questions.find((q) => q.id === action.payload.questionId).photoId,
        questionId: action.payload.questionId,
        oldValue: state.test.questions.find((q) => q.id === action.payload.questionId).photo,
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

      const changeAnswerLog = {
        field: logFields.answer,
        questionId: action.payload.questionId,
        answerId: state.test.questions
          .find((q) => q.id === action.payload.questionId)
          .answers.find((a) => a.index === action.payload.index).id,
        oldValue: state.test.questions
          .find((q) => q.id === action.payload.questionId)
          .answers.find((a) => a.index === action.payload.index).answer,
        newValue: action.payload.answerText,
      };

      return {
        ...updatedStateWithAnswer,
        changeLog: [...updatedStateWithAnswer.changeLog, changeAnswerLog],
      };
    },

    // reset change log
    resetChangeLog: (state, action) => ({
      ...state,
      changeLog: [],
    }),
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
  initCorrectAnswerIndex,
  updateQuestionGroupName,
  updateQuestionGroupNameWithoutLog,
  updateQuestionGroupId,
  toggleAddNew,
  toggleComplete,
  toggleEdit,
  resetChangeLog,
} = testSlice.actions;
export default testSlice.reducer;
export const questionList = (state) => state.test.test.questions;
export const changeLog = (state) => state.test.changeLog;
export const testGroupName = (state) => state.test.test.name;
export const testGroupId = (state) => state.test.test.groupId;
export const isAddNew = (state) => state.test.isAddNew;
export const isEdit = (state) => state.test.isEdit;
export const isComplete = (state) => state.test.isComplete;
