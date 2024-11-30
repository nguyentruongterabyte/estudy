import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isComplete: false,
  vocabularies: [
    {
      id: 1,
      word: 'fad',
      pronunciation: '/fæd/',
      definition: 'a practice followed enthusiastically for a short time; a craze',
      example: 'The mini dress was a fad once thought to be finished, but now it is making a comeback.',
      photo: 'https://estudyme.hoc102.com/legacy-data/kstoeic/images/ToeicVc_ev019.jpg',
    },

    {
      id: 2,
      word: 'inspiration',
      pronunciation: '/ˌɪnspəˈreɪʃn/',
      definition: 'A thing or person that arouses a feeling',
      example: 'Dreams can be a rich source of inspiration for an artist.',
      photo: 'https://estudyme.hoc102.com/legacy-data/kstoeic/images/ToeicVc_ev020.jpg',
    },
  ],
};

const vocabulariesSlice = createSlice({
  name: 'vocabularies',
  initialState,
  reducers: {
    // is complete false/true
    toggleComplete: (state, action) => ({
      ...state,
      isComplete: action.payload.toggle,
    }),

    // add vocabularies
    addVocabularies: (state, action) => {
      const vocabularies = [...state.vocabularies];
      const updatedVocabularies = [...state.vocabularies];

      const newVocabularies = action.payload.words;

      newVocabularies.forEach((word) => {
        const exists = vocabularies.some((vocab) => vocab.word.toLowerCase() === word.toLowerCase());

        if (!exists) {
          updatedVocabularies.push({
            id: updatedVocabularies.length + 1,
            word: word,
            pronunciation: '',
            definition: '',
            example: '',
            photo: '',
          });
        }
      });

      return {
        ...state,
        vocabularies: updatedVocabularies,
      };
    },

    // change vocabularies
    changeVocabularies: (state, action) => ({
      ...state,
      vocabularies: action.payload.vocabularies,
    }),

    // remove vocabularies
    removeVocabularies: (state, action) => {
      const wordsToRemove = action.payload.words;

      const updatedVocabularies = state.vocabularies.filter(
        (vocab) => !wordsToRemove.some((word) => vocab.word.toLowerCase() === word.toLowerCase()),
      );

      return {
        ...state,
        vocabularies: updatedVocabularies,
      };
    },

    // update photo
    updatePhoto: (state, action) => ({
      ...state,
      vocabularies: [
        ...state.vocabularies.map((vocab) =>
          vocab.id === action.payload.id ? { ...vocab, photo: action.payload.photo } : vocab,
        ),
      ],
    }),

    // update example
    updateExample: (state, action) => ({
      ...state,
      vocabularies: [
        ...state.vocabularies.map((vocab) =>
          vocab.id === action.payload.id ? { ...vocab, example: action.payload.example } : vocab,
        ),
      ],
    }),

    // update definition
    updateDefinition: (state, action) => ({
      ...state,
      vocabularies: [
        ...state.vocabularies.map((vocab) =>
          vocab.id === action.payload.id ? { ...vocab, definition: action.payload.definition } : vocab,
        ),
      ],
    }),

    // update pronunciation
    updatePronunciation: (state, action) => ({
      ...state,
      vocabularies: [
        ...state.vocabularies.map((vocab) =>
          vocab.id === action.payload.id ? { ...vocab, pronunciation: action.payload.pronunciation } : vocab,
        ),
      ],
    }),
  },
});

export const {
  toggleComplete,
  addVocabularies,
  changeVocabularies,
  removeVocabularies,
  updatePhoto,
  updatePronunciation,
  updateDefinition,
  updateExample,
} = vocabulariesSlice.actions;

export default vocabulariesSlice.reducer;
export const finished = (state) => state.vocabularies.isComplete;
export const vocabularyList = (state) => state.vocabularies.vocabularies;
