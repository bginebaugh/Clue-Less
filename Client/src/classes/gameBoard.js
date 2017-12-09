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

	},

	getNeighbors : function (x,y,board) {
		//assume cell has following four neighbors (up, down, left, right)
		var neighbors = [ [(x-1),y] ,[(x+1),y], [x,(y-1)], [x,(y+1)] ];
		console.log("this is board", x, y, board);
		
		//validate each neighbor
		for (var i = 0; i < 4; i++){
			for ( var j = 0 ; j < board.length ; j++ ) {
				if (board[j] !== null && board[j].m_x == neighbors[i][0] && board[j].m_y == neighbors[i][1]){
					if (board[j].isHallway && !board[j].playerList.length === 0){ //hallway is full 
						neighbors[i][0] = -1; //can also make this null
						neighbors[i][1] = -1; //can also make this null
					}
				}
				else{
					neighbors[i][0] = -1; //this is not a valid cell
					neighbors[i][1] = -1;
				}
			}
		}	
		//if current position is study, add kitchen to neighbor
		if (x == 0 && y == 0 ){
			neighbors [0][0] = 4;
			neighbors [0][1] = 4;
		}
		//if current position is lounge, add conservatory to neighbor
		if (x == 0 && y == 4 ){
			neighbors [0][0] = 4;
			neighbors [0][1] = 0;
		}
			//if current position is conservatory, add lounge to neighbor
		if (x == 4 && y == 0 ){
			neighbors [1][0] = 0;
			neighbors [1][1] = 4;
		}
			//if current position is kitchen, add study to neighbor
		if (x == 0 && y == 4 ){
			neighbors [1][0] = 0;
			neighbors [1][1] = 0;
		}

		return neighbors;


	},

	getValidNeighbors : function (x,y,board) {
		//assume cell has following four neighbors (up, down, left, right)
		console.log("this is board", x, y, board);

		var neighbors = [];

		let min = 0;
		let max = 4;

		if (y > min && board[x][y-1]) {
			console.log("top");
			let cell = board[x][y-1];
			if (cell && (cell.m_isHallway && cell.playerList.length === 0 || !cell.m_isHallway)) {
				neighbors.push([x, y-1]);
			}
		}
		if ( y < max && board[x][y+1]) {
			console.log("bottom");			
			let cell = board[x][y+1];
			if (cell && (cell.m_isHallway && cell.playerList.length === 0 || !cell.m_isHallway)) {
				neighbors.push([x, y+1]);
			}
		}
		if (x > min && board[x-1][y]) {
			console.log("left");		
			let cell = board[x-1][y];
			if (cell && (cell.m_isHallway && cell.playerList.length === 0 || !cell.m_isHallway)) {
				neighbors.push([x-1, y]);
			}
	
		}
		if (x < max && board[x+1][y]) {
			console.log("right");	
			let cell = board[x+1][y];
			if (cell && (cell.m_isHallway && cell.playerList.length === 0 || !cell.m_isHallway)) {
				neighbors.push([x+1, y]);
			}
		
		}

		//corners
		
		//if current position is study, add kitchen to neighbor
		if (x == 0 && y == 0 ){
			neighbors.push([4,4]);
		}
		//if current position is lounge, add conservatory to neighbor
		if (x == 0 && y == 4 ){
			neighbors.push([4,0]);
		}
			//if current position is conservatory, add lounge to neighbor
		if (x == 4 && y == 0 ){
			neighbors.push([0,4]);
		}
			//if current position is kitchen, add study to neighbor
		if (x == 0 && y == 4 ){
			neighbors.push([0,0]);
		}

		return neighbors;


	}

};
	


