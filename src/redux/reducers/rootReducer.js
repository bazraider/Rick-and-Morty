import { combineReducers } from 'redux';
import { charactersReducer } from './charactersReducer';
import { charactersFilterReducer } from './charactersFilterReducer';
import { episodesReducer } from './episodesReducer';
import { episodesFilterReducer } from './episodesFilterReducer';
import { locationsReducer } from './locationsReducer';

export const rootReducer = combineReducers({
  characters: charactersReducer,
  filtered_characters: charactersFilterReducer,
  episodes: episodesReducer,
  filtered_episodes: episodesFilterReducer,
  locations: locationsReducer,
});
