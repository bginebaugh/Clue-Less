const initialState = { 
    characterList: []
}
// const initialState = { 
//     characterList: [
//         { characterName: 'Col. Mustard', available: true},
//         { characterName: 'Mrs. White', available: true},
//         { characterName: 'Miss. Scarlet', available: false},
//         { characterName: 'Mr. Green', available: true},
//     ]
// }

const WaitingRoom = (state = initialState, action) => {

  switch (action.type) {

    case 'UPDATE_CHARACTERLIST':
    
        console.log("updating gameroom list", action);
    
        return {
            ...state,
            characterList: action.characterList
        }

    // case 'APPEND_GAMEROOMLIST':
    
    //     console.log("adding to gameroom list", action);
    
    //     return {
    //         ...state,
    //         gameRoomList: [
    //             ...state.gameRoomList,
    //             action.gameRoom
    //         ]
    //     }

    // case 'DELETE_FROM_GAMEROOMLIST':
        
    //         console.log("deleting from gameroom list", action);
        
    //         return {
    //             ...state,
    //             gameRoomList: state.gameRoomList.filter((game) => {
    //                 return gameId !== action.gameRoom.gameId;
    //             })
    //         }

    default:
        return state;

  }
}

export default WaitingRoom;


