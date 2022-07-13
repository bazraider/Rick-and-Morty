import { initState } from '../initState';

export const locationsReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_LOCATIONS':
      return payload;
    default:
      return state;
  }
};
