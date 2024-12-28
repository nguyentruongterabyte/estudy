import { createSlice } from '@reduxjs/toolkit';

export const PART = {
  PHOTO_DESCRIPTION: 1,
  QUESTION_RESPONSE: 2,
  CONVERSATION: 3,
  SHORT_TALK: 4,
  INCOMPLETE_SENTENCE: 5,
  TEXT_COMPLETION: 6,
  SINGLE_PASSAGE: 7,
  DOUBLE_PASSAGE: 8,
  TRIPLE_PASSAGE: 9,
};

export const QUESTION_TYPES = {
  SINGLE: 'single',
  BUNDLE: 'bundle',
};

const initialState = {
  activePartId: PART.PHOTO_DESCRIPTION,
  parts: [
    {
      id: PART.PHOTO_DESCRIPTION,
      questionGroupId: 1,
      type: QUESTION_TYPES.SINGLE,
      questions: [],
    },
    {
      id: PART.QUESTION_RESPONSE,
      questionGroupId: 2,
      type: QUESTION_TYPES.SINGLE,
      questions: [],
    },
    {
      id: PART.CONVERSATION,
      questionGroupId: 3,
      type: QUESTION_TYPES.BUNDLE,
      bundles: [],
    },
    {
      id: PART.SHORT_TALK,
      questionGroupId: 4,
      type: QUESTION_TYPES.BUNDLE,
      bundles: [],
    },
    {
      id: PART.INCOMPLETE_SENTENCE,
      questionGroupId: 5,
      type: QUESTION_TYPES.SINGLE,
      questions: [],
    },
    {
      id: PART.TEXT_COMPLETION,
      questionGroupId: 6,
      type: QUESTION_TYPES.BUNDLE,
      bundles: [],
    },
    {
      id: PART.SINGLE_PASSAGE,
      questionGroupId: 7,
      type: QUESTION_TYPES.BUNDLE,
      bundles: [],
    },
    {
      id: PART.DOUBLE_PASSAGE,
      questionGroupId: 8,
      type: QUESTION_TYPES.BUNDLE,
      bundles: [],
    },
    {
      id: PART.TRIPLE_PASSAGE,
      questionGroupId: 9,
      type: QUESTION_TYPES.BUNDLE,
      bundles: [],
    },
  ],
};
