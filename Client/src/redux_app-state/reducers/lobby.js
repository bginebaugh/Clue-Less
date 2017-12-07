const initialState = { 
    gameRoomList: [
        { gameRoomName: 'game1', gameId: 1, playersInRoom: 5},
        { gameRoomName: 'game2', gameId: 2, playersInRoom: 2}
    ]
}


const Lobby = (state = initialState, action) => {

  switch (action.type) {

    case 'UPDATE_GAMEROOMLIST':
    
        console.log("updating gameroom list", action);
    
        return {
            ...state,
            gameRoomList: action.gameRoomList
        }

    case 'APPEND_GAMEROOMLIST':
    
        console.log("adding to gameroom list", action);
    
        return {
            ...state,
            gameRoomList: [
                ...state.gameRoomList,
                action.gameRoom
            ]
        }

    case 'DELETE_FROM_GAMEROOMLIST':
        
            console.log("deleting from gameroom list", action);
        
            return {
                ...state,
                gameRoomList: state.gameRoomList.filter((game) => {
                    return gameId !== action.gameRoom.gameId;
                })
            }

    default:
      return state
  }
}

export default Lobby;


