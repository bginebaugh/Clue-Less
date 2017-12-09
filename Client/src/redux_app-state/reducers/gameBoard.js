const initialState = { 
    board: null,
    myPosition: null,
    myNeighbors: null
}


const GameBoard = (state = initialState, action) => {
    switch (action.type) {

        case 'UPDATE_GAMEBOARD':
            console.log("updating game board", action);
            return {
                ...state,
                board: action.gameBoard
            }

        case 'UPDATE_MY_POSITION':
            console.log("updating my position", action);
            return {
                ...state,
                myPosition: action.myPosition
            }

        case 'UPDATE_MY_NEIGHBORS':
            console.log("updating my neighbors", action);
            return {
                ...state,
                myNeighbors: action.myNeighbors
            }

        default:
            return state

    }

}

export default GameBoard

