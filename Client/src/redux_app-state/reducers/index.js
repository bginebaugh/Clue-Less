import { combineReducers } from 'redux';

import GameBoard from './gameBoard';
import GameSession from "./gameSession";
import Lobby from './lobby';
import User from './user';
import WaitingRoom from './waitingRoom';

export default combineReducers({
  GameBoard,
  GameSession,
  Lobby,
  User,
  WaitingRoom
})