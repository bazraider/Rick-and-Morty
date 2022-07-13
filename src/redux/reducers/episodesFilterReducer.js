import { initState } from '../initState';

export const episodesFilterReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LIST_OF_FILTERED_EPISODES':
      return payload;
    default:
      return state;
  }
};