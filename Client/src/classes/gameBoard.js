//Constructor function cell
function cell ( x, y, name, isHallway) {
	var m_x = x;
	var m_y = y;
	var m_name = name;
	var m_isHallway = isHallway;
	var playerList = [];
};

//cells for each of the rooms and hallways
var Study = new cell ( 0,0, 'Study', False);
var StudyHall = new cell (0,1, 'StudyHall' , True);
var Hall = new cell (0,2, 'Hall', False);
var HallLounge = new cell (0,3, 'HallLounge', True);
var Lounge = new cell (0,4, 'Lounge', False);
var StudyLib = new cell (1,0, 'StudyLib', True);
var HallBr = new cell (1,2, 'HallBr' , True);
var LoungeBr = new cell (1,4, 'LoungeBr', True);
var Library = new cell (2,0, 'Library' , False);
var LibBr = new cell (2,1, 'LibBr', True);
var BillRoom = new cell (2,2, 'BillRoom', True);
var BrDr = new cell (2,3, ' BrDr' , True);
var DiningRoom = new cell (2,4, 'DiningRoom', False);
var LibCons = new cell (3,0, 'LibCons' , True);
var BrBr = new cell (3,2, 'BrBr' , True);
var DrK = new cell (3,4, 'DrK', True);
var Conservatory = new cell (4,0, 'Conservatory', False);
var ConsBr = new cell (4,1, 'ConsBr' , True);
var Ballroom = new cell (4,2, 'Ballroom', False);
var BrK = new cell (4,3, 'BrK', True);
var Kitchen = new cell (4,4, 'Kitchen', True);



//gameboard object
var GameBoard = {
	
	
	//make the board cell array list
	board : [Study,StudyHall, Hall, HallLounge, Lounge, StudyLib, HallBr, LoungeBr, Library,
			LibBr, BillRoom, BrDr, DiningRoom, LibCons, BrBr, DrK,Conservatory, ConsBr, Ballroom,
			BrK, Kitchen],
			
			
			
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
			if (board[i].m_x == x && board[i].m_y == (y+1){
				neighbors  [3][0] = x;
				neighbors  [3][1] = y+1;	
			}
		}
		
		return neighbors ;
	}
};

