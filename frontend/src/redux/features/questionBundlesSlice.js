import { createSlice } from '@reduxjs/toolkit';

export const logFields = {
  answer: 'answer',
  text: 'text',
  questionText: 'questionText',
};

const initialState = {
  changeLog: [],
  isComplete: false,
  bundles: [
    {
      active: true,
      id: 1,
      isEnablePhoto: true,
      photo: {
        id: 1,
        filePath: 'https://estudyme.hoc102.com/legacy-data/kstoeic/images/873890_1562638446607.png',
      },
      audio: {
        id: 1,
        audioLink: 'https://storage.googleapis.com/estudyme/legacy-data/kstoeic/sound/eco2018_Test01_0311.mp3',
      },
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

    {
      active: false,
      id: 2,
      photo: {
        id: 1,
        filePath: '',
      },
      audio: {
        id: 1,
        audioLink: 'https://storage.googleapis.com/estudyme/legacy-data/kstoeic/sound/eco2018_Test01_0308.mp3',
      },
      text: 'W: Hi, Mr. Jeffries. Q1 Unfortunately, our client in New Jersey called and said they have to reschedule the meeting date to 5th of July. I went ahead and booked a ticket for the 4th. Is it OK if you go straight to Washington after New Jersey? M: What about the client in Washington? Were they comfortable with the schedule? W: Yes. Q2 I explained that we need to postpone the meeting in Washington because of our client in New Jersey. I think this gives us time to prepare some additional materials for your presentation. I would like to add some more details to your PowerPoint slides about our new products. Let’s meet this afternoon and discuss it. M: Q3 That’s not a bad idea. I’ll see you this afternoon.',
      questions: [
        {
          id: 1,
          question: 'What is the problem?',
          answers: [
            {
              id: 1,
              answer: 'The plane tickets were not booked.',
              index: 0,
            },
            {
              id: 2,
              answer: 'A meeting had to be rescheduled.',
              index: 1,
            },
            {
              id: 3,
              answer: 'The meeting was a success.',
              index: 2,
            },
            {
              id: 4,
              answer: 'A deadline has been changed.',
              index: 3,
            },
          ],
          correctAnswerIndex: 1,
          correctAnswer: { answerId: 2 },
        },
        {
          id: 2,
          question: 'Which part of the business trip will be postponed?',
          answers: [
            {
              id: 1,
              answer: 'The meeting in New York',
              index: 0,
            },
            {
              id: 2,
              answer: 'The meeting in Wisconsin',
              index: 1,
            },
            {
              id: 3,
              answer: 'The meeting in Washington',
              index: 2,
            },
            {
              id: 4,
              answer: '$The meeting in Westboro',
              index: 3,
            },
          ],
          correctAnswerIndex: 2,
          correctAnswer: { answerId: 3 },
        },
        {
          id: 3,
          question: 'What does the man mean when he says “That’s not a bad idea”?',
          answers: [
            {
              id: 1,
              answer: 'He thinks it is a bad idea.',
              index: 0,
            },
            {
              id: 2,
              answer: 'He agrees with the proposed solution.',
              index: 1,
            },
            {
              id: 3,
              answer: 'He wants to hear other ideas.',
              index: 2,
            },
            {
              id: 4,
              answer: 'He disagrees with the solution.',
              index: 3,
            },
          ],
          correctAnswerIndex: 1,
          correctAnswer: { answerId: 2 },
        },
      ],
    },
  ],
};

const questionBundlesSlice = createSlice({
  name: 'questionBundles',
  initialState,
  reducers: {
    add: (state, action) => ({
      ...state,
      bundles: [...state.bundles, action.payload.questionBundle],
    }),

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

    // is complete edit/add
    toggleComplete: (state, action) => ({
      ...state,
      isComplete: action.payload.toggle,
    }),

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
                          correctAnswerIndex: question.answers.findIndex(
                            (answer) => answer.id === action.payload.answerId,
                          ),
                          correctAnswer: { answerId: action.payload.answerId },
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
} = questionBundlesSlice.actions;

export default questionBundlesSlice.reducer;
export const questionBundles = (state) => state.questionBundles.bundles;