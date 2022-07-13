import { initState } from '../initState';

export const charactersFilterReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LIST_OF_FILTERED_CHARACTERS':
      return payload;
    default:
      return state;
  }
};
