import { combineReducers } from 'redux';
import { charactersReducer } from './charactersReducer';
import { charactersFilterReducer } from './charactersFilterReducer';
import { episodesReducer } from './episodesReducer';

export const rootReducer = combineReducers({
  characters: charactersReducer,
  filtered_characters: charactersFilterReducer,
  episodes: episodesReducer,
  // filtered_episodes: episodesFilterReducer,
});
