import { createSlice } from '@reduxjs/toolkit';

export const logFields = {
  answer: 'answer',
  text: 'text',
  correctAnswer: 'correctAnswer',
  questionText: 'questionText',
  photo: 'photo',
  audio: 'audio',
  bundleText: 'bundleText',
};

const initialState = {
  changeLog: [],
  isComplete: false,
  bundles: [
    {
      active: true,
      id: 1,
      isEnablePhoto: true,
      photo: '',
      audio: '',
      text: 'W: Hi, we are renovating our boardroom and I’d like to purchase some cherry wood tables for our conference room. Q1 I am having a meeting with some very important clients on Friday. So I’d like to have them delivered tomorrow. What is the cost for an emergency delivery? M: Hold a moment please... Next day delivery is an extra seventy-five dollars. W: Really? That is expensive. I thought if my order was over three hundred dollars, delivery would be free of charge. M: Well, yes. Q2 Are you planning to order the cherry wood tables? W: Q2 Yes, I would like two of them. M: OK then, Q3 I will make sure that your order arrives tomorrow morning before midday, and delivery will be free of charge.',
      questions: [
        {
          id: 1,
          question: 'What does the woman have on Friday?',
          answers: [
            {
              id: 1,
              answer: 'A dinner meeting',
              index: 0,
            },
            {
              id: 2,
              answer: 'A seminar',
              index: 1,
            },
            {
              id: 3,
              answer: 'A meeting',
              index: 2,
            },
            {
              id: 4,
              answer: 'A work party',
              index: 3,
            },
          ],
          correctAnswerIndex: 2,
          correctAnswer: { answerId: 3 },
        },
        {
          id: 2,
          question: 'Look at the graphic. How much does the woman pay for the furniture?',
          answers: [
            {
              id: 1,
              answer: '$165',
              index: 0,
            },
            {
              id: 2,
              answer: '$195',
              index: 1,
            },
            {
              id: 3,
              answer: '$307',
              index: 2,
            },
            {
              id: 4,
              answer: '$614',
              index: 3,
            },
          ],
          correctAnswerIndex: 3,
          correctAnswer: { answerId: 4 },
        },
        {
          id: 3,
          question: 'What does the man say he will do?',
          answers: [
            {
              id: 1,
              answer: 'What does the man say he will do?',
              index: 0,
            },
            {
              id: 2,
              answer: 'Deliver the furniture in the evening',
              index: 1,
            },
            {
              id: 3,
              answer: 'Send a confirmation',
              index: 2,
            },
            {
              id: 4,
              answer: 'Deliver the table himself',
              index: 3,
            },
          ],
          correctAnswerIndex: 0,
          correctAnswer: { answerId: 1 },
        },
      ],
    },
  ],
};

const questionBundlesSlice = createSlice({
  name: 'questionBundles',
  initialState,
  reducers: {
    // add new bundle
    add: (state, action) => ({
      ...state,
      bundles: [...state.bundles, action.payload.questionBundle],
    }),

    // update text of bundle
    updateText: (state, action) => {
      const updatedStateWithText = {
        ...state,
        bundles: [
          ...state.bundles.map((bundle) =>
            bundle.id === action.payload.id ? { ...bundle, text: action.payload.text } : bundle,
          ),
        ],
      };

      const log = {
        field: logFields.text,
        id: action.payload.id,
        oldValue: state.bundles.find((bundle) => bundle.id === action.payload.id).text,
        newValue: action.payload.text,
      };

      return {
        ...updatedStateWithText,
        changeLog: [...updatedStateWithText.changeLog, log],
      };
    },

    // reset change log
    resetChangeLog: (state, _) => ({
      ...state,
      changeLog: [],
    }),

    // toggle active bundle
    toggleActive: (state, action) => ({
      ...state,
      bundles: [
        ...state.bundles.map((bundle, index) =>
          index === action.payload.index ? { ...bundle, active: true } : { ...bundle, active: false },
        ),
      ],
    }),

    // Toggle enable photo
    toggleEnablePhoto: (state, action) => ({
      ...state,
      bundles: [
        ...state.bundles.map((bundle) =>
          bundle.id === action.payload.id ? { ...bundle, isEnablePhoto: !bundle.isEnablePhoto } : bundle,
        ),
      ],
    }),

    // update question text
    updateQuestionText: (state, action) => {
      const updatedStateWithQuestionText = {
        ...state,

        bundles: [
          ...state.bundles.map((bundle) =>
            bundle.id === action.payload.id
              ? {
                  ...bundle,
                  questions: bundle.questions.map((question) =>
                    question.id === action.payload.questionId
                      ? {
                          ...question,
                          question: action.payload.questionText,
                        }
                      : question,
                  ),
                }
              : bundle,
          ),
        ],
      };
      const changeQuestionTextLog = {
        field: logFields.questionText,
        id: action.payload.id,
        questionId: action.payload.questionId,
        oldValue: state.bundles
          .find((b) => b.id === action.payload.id)
          .questions.find((q) => q.id === action.payload.questionId).question,
        newValue: action.payload.questionText,
      };

      return {
        ...updatedStateWithQuestionText,
        changeLog: [...updatedStateWithQuestionText.changeLog, changeQuestionTextLog],
      };
    },

    // update answer
    updateAnswer: (state, action) => {
      const updatedStateWithAnswer = {
        ...state,
        bundles: [
          ...state.bundles.map((bundle) =>
            bundle.id === action.payload.id
              ? {
                  ...bundle,
                  questions: bundle.questions.map((question) =>
                    question.id === action.payload.questionId
                      ? {
                          ...question,
                          answers: question.answers.map((answer) =>
                            answer.index === action.payload.index
                              ? { ...answer, answer: action.payload.answerText }
                              : answer,
                          ),
                        }
                      : question,
                  ),
                }
              : bundle,
          ),
        ],
      };

      const oldAnswer = state.bundles
        .find((b) => b.id === action.payload.id)
        .questions.find((q) => q.id === action.payload.questionId)
        .answers.find((a) => a.index === action.payload.index);

      const changeAnswerLog = {
        field: logFields.answer,
        id: action.payload.id,
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

    // change correct answer index (by id)
    changeCorrectAnswerIndex: (state, action) => {
      const updatedStateWithCorrectAnswerIndex = {
        ...state,
        bundles: [
          ...state.bundles.map((bundle) =>
            bundle.id === action.payload.id
              ? {
                  ...bundle,
                  questions: bundle.questions.map((question) =>
                    question.id === action.payload.questionId
                      ? {
                          ...question,
                          correctAnswerIndex: action.payload.index,
                          correctAnswer: { answerId: question.answers[action.payload.index].id },
                        }
                      : question,
                  ),
                }
              : bundle,
          ),
        ],
      };
      const changeCorrectAnswerIndexLog = {
        field: logFields.correctAnswer,
        questionId: action.payload.questionId,
        oldValue: state.bundles
          .find((b) => b.id === action.payload.id)
          .questions.find((q) => q.id === action.payload.questionId).correctAnswer.answerId,
        newValue: action.payload.answerId,
      };

      return {
        ...updatedStateWithCorrectAnswerIndex,
        changeLog: [...updatedStateWithCorrectAnswerIndex.changeLog, changeCorrectAnswerIndexLog],
      };
    },

    // update bundle list
    updateBundles: (state, action) => ({
      ...state,
      bundles: [...action.payload.bundles],
    }),

    // update photo
    updatePhoto: (state, action) => {
      const updatedStateWithPhoto = {
        ...state,
        bundles: state.bundles.map((bundle) =>
          bundle.id === action.payload.id
            ? {
                ...bundle,
                photo: action.payload.photo,
              }
            : bundle,
        ),
      };

      const oldBundle = state.bundles.find((b) => b.id === action.payload.id);

      const changePhotoLog = {
        field: logFields.photo,
        id: action.payload.id,
        oldValue: oldBundle.photo,
        newValue: action.payload.photo,
      };
      return {
        ...updatedStateWithPhoto,
        changeLog: [...updatedStateWithPhoto.changeLog, changePhotoLog],
      };
    },

    // update audio
    updateAudio: (state, action) => {
      const updatedStateWithAudio = {
        ...state,
        bundles: state.bundles.map((bundle) =>
          bundle.id === action.payload.id
            ? {
                ...bundle,
                audio: action.payload.audio,
              }
            : bundle,
        ),
      };

      const oldBundle = state.bundles.find((b) => b.id === action.payload.id);

      const changePhotoLog = {
        field: logFields.audio,
        id: action.payload.id,
        oldValue: oldBundle.audio,
        newValue: action.payload.audio,
      };
      return {
        ...updatedStateWithAudio,
        changeLog: [...updatedStateWithAudio.changeLog, changePhotoLog],
      };
    },

    // is complete false/true
    toggleComplete: (state, action) => ({
      ...state,
      isComplete: action.payload.toggle,
    }),
  },
});

export const {
  add,
  updateText,
  toggleEnablePhoto,
  toggleActive,
  toggleComplete,
  resetChangeLog,
  updateQuestionText,
  updateAnswer,
  changeCorrectAnswerIndex,
  updateBundles,
  updatePhoto,
  updateAudio,
} = questionBundlesSlice.actions;

export default questionBundlesSlice.reducer;
export const questionBundles = (state) => state.questionBundles.bundles;
export const finished = (state) => state.questionBundles.isComplete;
