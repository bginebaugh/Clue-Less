import { List } from 'immutable';

const initialState = { 
    userId: -1,
    gameId: -1,
    userName: "",
    isLoggedIn: false
}


const User = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERID':
        return {
            // code
        } 	

    case 'UPDATE_GAMEID':
	  return {
            // code
      }
    case 'UPDATE_USERNAME':
    return {
            // code
      }

    default:
      return state
  }
}

export default User