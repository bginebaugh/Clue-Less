import java.io.*;
import java.util.*;

public class Cell {
	public int m_x = -1;
	public int m_y = -1;
	private ArrayList<Character> m_characterList = null;
	private boolean m_isHallway = null;
	private String m_name = null;
	private Weapon m_weapon = null;
	
	public Cell(int x, int y, String name, boolean isHallway){ 
			this.m_x = x; 
			this.m_y = y; 
			this.m_name = name; 
			this.m_isHallway = isHallway; 
	} 
	
	Cell Study = new cell(0, 0, "Study", false); 
	Cell StudyHall = new cell(0, 1, "StudyHall", true); 
	Cell Hall = new cell(0, 2, "Hall", false); 
	Cell HallLounge = new cell( 0, 3, "HallLounge", true);
	Cell Lounge = new cell( 0, 4, "Lounge", false);
	Cell StudyLib = new cell(1,0, "StudyLib", true);
	Cell HallBr = new cell(1,2, "HallBr" , true);
	Cell LoungeBr = new cell(1,4, "LoungeBr", true);
	Cell Library = new cell(2,0, "Library" , false);
	Cell LibBr = new cell(2,1, "LibBr", true);
	Cell BillRoom = new cell(2,2, "BillRoom", false);
	Cell BrDr = new cell(2,3, "BrDr" , true);
	Cell DiningRoom = new cell(2,4, "DiningRoom", false);
	Cell LibCons = new cell(3,0, "LibCons" , true);
	Cell BrBr = new cell(3,2, "BrBr" , true);
	Cell DrK = new cell(3,4, "DrK", true);
	Cell Conservatory = new cell(4,0, "Conservatory", false);
	Cell ConsBr = new cell(4,1, "ConsBr" , true);
	Cell Ballroom = new cell(4,2, "Ballroom", false);
	Cell BrK = new cell(4,3, "BrK", true);
	Cell Kitchen = new cell(4,4, "Kitchen", false);
	
	private arrayList<Cell> board = new ArrayList<>(Arrays.asList(Study,StudyHall, Hall, HallLounge, Lounge, StudyLib, null, HallBr, null, LoungeBr, Library,
			LibBr, BillRoom, BrDr, DiningRoom, LibCons, null, BrBr, null, DrK,Conservatory, ConsBr, Ballroom,
			BrK, Kitchen)); 
	
	public int[][] getNeighbors(int x,int y){ 
		//storing  coordinates of neighboring cells, initialized to -1,-1
		 int neighbors [][] = { {-1,-1} ,{-1,-1}, {-1,-1}, {-1,-1} };
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
		
		return neighbors ;
	}

	public boolean addCharacter(Character character) {
		m_characterList.add(character);
		return true;
	}

	public boolean removeCharacter(Character character) {
		m_characterList.remove(character);
		return true;
	}

	public boolean addWeapon(Weapon weapon) {
		m_weapon = weapon;
		return true;
	}

	public boolean removeWeapon() {
		m_weapon = null;
		return true;
	}

	public void setString(String name) {
		m_name = name;
	}

	public String getString() {
		return m_name;
	}
	
	public int getX() { 
		return m_x; 
	} 
	
	public int getY() { 
		return m_y; 
	} 

}
