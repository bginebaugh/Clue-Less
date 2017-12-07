import { combineReducers } from 'redux';

import GameBoard from './gameBoard';
import Lobby from './lobby';
import User from './user';
import WaitingRoom from './waitingRoom';

export default combineReducers({
  GameBoard,
  Lobby,
  User,
  WaitingRoom
})