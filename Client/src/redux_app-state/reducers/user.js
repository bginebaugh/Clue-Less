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

    case 'UPDATE_LOGIN_STATUS':
        console.log("updating login status", action);

        return {
            ...state,
            isLoggedIn: action.loggedInBool
        }

    default:
      return state
  }
}

export default User