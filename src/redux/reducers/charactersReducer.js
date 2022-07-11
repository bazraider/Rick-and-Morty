import { initState } from '../initState';

export const charactersReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_CHARACTERS':
      return payload;
    default:
      return state;
  }
};
