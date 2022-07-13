import { initState } from '../initState';

export const episodesReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_EPISODES_FROM_THIS_SEASON':
      return payload;
    default:
      return state;
  }
};
