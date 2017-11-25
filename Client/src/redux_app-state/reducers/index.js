import { combineReducers } from 'redux';

import User from './user';
import GameBoard from './gameBoard';

export default combineReducers({
  GameBoard,
  User
})