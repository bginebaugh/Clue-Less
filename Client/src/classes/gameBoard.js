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
export var GameBoard = {
	
	
	//make the board cell array list
	board : [Study,StudyHall, Hall, HallLounge, Lounge, StudyLib, null, HallBr, null, LoungeBr, Library,
			LibBr, BillRoom, BrDr, DiningRoom, LibCons, null, BrBr, null, DrK,Conservatory, ConsBr, Ballroom,
			BrK, Kitchen],
			
			
	
	// add character to cell		
	addCharacter : function ( character, cell) {

		board [cell].playerList.push (character);

	}	,

	getNeighbors : function (x,y) {
		//storing  coordinates of neighboring cells, initialized to -1,-1
		var neighbors = [ [-1,-1] ,[-1,-1], [-1,-1], [-1,-1] ];
		//check if a cell above current position exists
		for ( var i = 0 ; i < board.length ; i++ ) {
			if (board[i].m_x == (x-1) && board[i].m_y == y){
				neighbors [0][0] = (x-1);
				neighbors [0][1] = y;	
			}
		}
		//check if a cell below current position exists
		for ( var i = 0 ; i < board.length ; i++ ) {
			if (board[i].m_x == (x+1) && board[i].m_y == y){
				neighbors [1][0] = (x-1);
				neighbors [1][1] = y;	
			}
		}
		//check if a cell to left of current position exists
		for ( var i = 0 ; i < board.length ; i++ ) {
			if (board[i].m_x == x && board[i].m_y == (y-1)){
				neighbors  [2][0] = x;
				neighbors  [2][1] = y -1;	
			}
		}
		//check if a cell to right of current position exists
		for ( var i = 0 ; i < board.length ; i++ ) {
			if (board[i].m_x == x && board[i].m_y == (y+1)){
				neighbors  [3][0] = x;
				neighbors  [3][1] = y+1;	
			}
		}
		//validate hallway cells are not full
		for ( var i = 0; i < 4; i++){
			if(neighbors [i][0] > 0 && neighbors [i][1] > 0){
				if (board[(neighbors [i][0]*5+neighbors [i][1])].isHallway && !board[(neighbors [i][0]*5+neighbors [i][1])].playerList.Isempty()){
					neighbors [i][0] = -1;
					neighbors [i][1] = -1;
				}
			}
		}

		return neighbors;


	}

};
	


