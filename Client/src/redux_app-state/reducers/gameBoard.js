//Constructor function cell
function cell( x, y, name, isHallway) {
	return {
		m_x: x,
		m_y: y,
		m_name: name,
		m_isHallway: isHallway,
		playerList: []
	}
};

//cells for each of the rooms and hallways
var Study = cell( 0, 0, 'Study', false);
var StudyHall = cell( 0, 1, 'StudyHall' , true);
var Hall = cell( 0, 2, 'Hall', false);
var HallLounge = cell( 0, 3, 'HallLounge', true);
var Lounge = cell( 0, 4, 'Lounge', false);
var StudyLib = cell(1,0, 'StudyLib', true);
var HallBr = cell(1,2, 'HallBr' , true);
var LoungeBr = cell(1,4, 'LoungeBr', true);
var Library = cell(2,0, 'Library' , false);
var LibBr = cell(2,1, 'LibBr', true);
var BillRoom = cell(2,2, 'BillRoom', false);
var BrDr = cell(2,3, ' BrDr' , true);
var DiningRoom = cell(2,4, 'DiningRoom', false);
var LibCons = cell(3,0, 'LibCons' , true);
var BrBr = cell(3,2, 'BrBr' , true);
var DrK = cell(3,4, 'DrK', true);
var Conservatory = cell(4,0, 'Conservatory', false);
var ConsBr = cell(4,1, 'ConsBr' , true);
var Ballroom = cell(4,2, 'Ballroom', false);
var BrK = cell(4,3, 'BrK', true);
var Kitchen = cell(4,4, 'Kitchen', false);



//gameboard object
var myGameBoard = {
	
	
	//make the board cell array list
	board : [Study,StudyHall, Hall, HallLounge, Lounge, StudyLib, null, HallBr, null, LoungeBr, Library,
			LibBr, BillRoom, BrDr, DiningRoom, LibCons, null, BrBr, null, DrK,Conservatory, ConsBr, Ballroom,
            BrK, Kitchen],
}

// transform board into 5x5
let twoDBoard = [];
let firstRow = myGameBoard.board.slice(0,5);
let secondRow = myGameBoard.board.slice(5,10);
let thirdRow = myGameBoard.board.slice(10,15);
let fourthRow = myGameBoard.board.slice(15,20);
let fifthRow = myGameBoard.board.slice(20);

twoDBoard = [[...firstRow], [...secondRow], [...thirdRow], [...fourthRow], [...fifthRow]];

const initialState = { 
    board: twoDBoard,
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
            console.log("POPULATE_CHARACTER_LIST", action);
            let characterList = action.characterList;
            let newBoard = state.board;
            // console.log("this is the board list", characterList);

            // first splice me out of the board
            if (action.existingPiece) {
                let x = action.existingPiece.m_x;
                let y = action.existingPiece.m_y;
                console.log("my existing piece", newBoard[x][y]);
                let myIndex = newBoard[x][y].playerList.indexOf(action.me);
                newBoard[x][y].playerList.splice(myIndex, 1);
            }

            characterList.forEach((boardPiece, i) => {
                let x = boardPiece.row;
                let y = boardPiece.col;
                console.log("x and y", x, y);
                console.log("newBoard",newBoard);
                console.log("board piece in POPULATE_CHARACTER_LIST", newBoard[x][y]);
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