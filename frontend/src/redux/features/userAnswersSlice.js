import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  userId: 1,
  groups: [
    {
      id: -1,
      userAnswers: [
        {
          questionId: 1,
          userAnswerId: 1,
          correctAnswerId: 1,
        },
        {
          questionId: 2,
          userAnswerId: 2,
          correctAnswerId: 2,
        },
      ],
    },
    {
      id: -2,
      userAnswers: [
        {
          questionId: 3,
          userAnswerId: 3,
          correctAnswerId: 3,
        },
        {
          questionId: 4,
          userAnswerId: 4,
          correctAnswerId: 4,
        },
      ],
    },
  ],
};

const userAnswersSlice = createSlice({
  name: 'userAnswers',
  initialState,
  reducers: {
    // add user answers by group id
    addUserAnswers: (state, action) => {
      const isExists = state.groups.some((questionGroup) => questionGroup.id === action.payload.id);
      return {
        ...state,
        groups: isExists
          ? [...state.groups]
          : [...state.groups, { id: action.payload.id, userAnswers: action.payload.userAnswers }],
      };
    },

    // update user anwser
    updateUserAnswer: (state, action) => ({
      ...state,
      groups: [
        ...state.groups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                userAnswers: [
                  ...group.userAnswers.map((userAnswer) =>
                    userAnswer.questionId === action.payload.questionId
                      ? { ...userAnswer, userAnswerId: action.payload.answerId }
                      : userAnswer,
                  ),
                ],
              }
            : group,
        ),
      ],
    }),
  },
});

export default userAnswersSlice.reducer;

export const { addUserAnswers, updateUserAnswer } = userAnswersSlice.actions;

export const groups = (state) => state.userAnswers.groups;
