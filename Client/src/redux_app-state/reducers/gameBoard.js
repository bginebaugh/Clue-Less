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
            
        case 'POPULATE_CHARACTER_LIST':
            console.log("populate characters on board", action);
            let characterList = action.characterList;
            let newBoard = state.board;
            console.log("this is the board list", characterList);
            characterList.forEach((boardPiece, i) => {
                let x = boardPiece.posX;
                let y = boardPiece.posY;
                newBoard[x][y].playerList = boardPiece.characters;
            });
            console.log("this is the new board", newBoard)
            return {
                ...state,
                board: newBoard
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