const initialState = { 
    userId: -1,
    game: {
        id: -1,
        name: "",
        gameOwner: null
    },
    username: "",
    isLoggedIn: false,
    inGameRoom: false
}


const User = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERID':
    console.log("updating login status", action);
    
        return {
            ...state,
            userId: action.userId
        }

    case 'UPDATE_GAME':
        console.log("updating game session", action);
    
        return {
            ...state,
            game: action.game
        }

    case 'UPDATE_USERNAME':
        console.log("updating login status", action);
    
        return {
            ...state,
            username: action.username
        }

    case 'UPDATE_LOGIN_STATUS':
        console.log("updating login status", action);

        return {
            ...state,
            isLoggedIn: action.loggedInBool
        }

    case 'UPDATE_GAMEROOM_STATUS':
        console.log("updating gameroom status", action);

        return {
            ...state,
            inGameRoom: action.inGameroomBool
        }

    default:
      return state
  }
}

export default User