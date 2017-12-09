const initialState = { 
    game: {
        id: -1,
        name: "",
        gameOwner: null
    },
    hasGameStarted: false,
    playersList: "aa"
}

const GameSession = (state = initialState, action) => {

    switch (action.type) {
  
        case 'UPDATE_GAME':
            console.log("updating game session", action);
        
            return {
                ...state,
                game: action.game
            }
  
        case 'UPDATE_GAMESTARTED':
            console.log("updating game started", action);
        
            return {
                ...state,
                hasGameStarted: action.gameStarted
            }

        case 'UPDATE_PLAYERLIST':
            console.log("updating player list", action);
        
            return {
                ...state,
                playersList: action.playersList
            }

      default:
        return state
    }

  }
  
  export default GameSession