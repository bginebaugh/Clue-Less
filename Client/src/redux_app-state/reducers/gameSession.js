const initialState = { 
    game: {
        id: -1,
        name: "",
        gameOwner: null
    },
    hasGameStarted: false,
    myCharacter: null,
    myCards: null,
    playersList: null,
    readyToStartGamePlay: false,
    playerTurn: null,
    suggestionCardChoices: ["a","b"]
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

        case 'UPDATE_READY_TO_START_GAMEPLAY':
            console.log("UPDATE_READY_TO_START_GAMEPLAY", action);
        
            return {
                ...state,
                readyToStartGamePlay: action.readyToStartGamePlay
            }

        case 'UPDATE_MYCHARACTER':
            console.log("updating my character", action);
        
            return {
                ...state,
                myCharacter: action.myCharacter
            }

        case 'UPDATE_MYCARDS':
            console.log("updating my cards", action);
        
            return {
                ...state,
                myCards: action.myCards
            }

        case 'UPDATE_SUGGESTION_CARD_CHOICES':
            console.log("UPDATE_SUGGESTION_CARD_CHOICES my cards", action);
        
            return {
                ...state,
                suggestionCardChoices: action.suggestionCardChoices
            }

        case 'UPDATE_PLAYERLIST':
            console.log("updating player list", action);
        
            return {
                ...state,
                playersList: action.playersList
            }

        case 'UPDATE_PLAYERTURN':
            console.log("UPDATE_PLAYERTURN", action);
        
            return {
                ...state,
                playerTurn: action.playerTurn
            }

      default:
        return state
    }

  }
  
  export default GameSession