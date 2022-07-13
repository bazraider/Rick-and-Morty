import { combineReducers } from 'redux';
import { charactersReducer } from './charactersReducer';
import { charactersFilterReducer } from './charactersFilterReducer';

export const rootReducer = combineReducers({
  characters: charactersReducer,
  filtered_characters: charactersFilterReducer,
});
