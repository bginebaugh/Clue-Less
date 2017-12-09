import java.io.*;
import java.util.*;

public class Cell {
	public int m_x;
	public int m_y;
	private ArrayList<Character> m_characterList = null;
	private boolean m_isHallway = false;
	private String m_name = null;
	private Weapon m_weapon = null;
	
	public Cell(int x, int y, String name, boolean isHallway){ 
			this.m_x = x; 
			this.m_y = y; 
			this.m_name = name; 
			this.m_isHallway = isHallway; 
	} 
	
	Cell Study = new Cell(0, 0, "Study", false); 
	Cell StudyHall = new Cell(0, 1, "StudyHall", true); 
	Cell Hall = new Cell(0, 2, "Hall", false); 
	Cell HallLounge = new Cell( 0, 3, "HallLounge", true);
	Cell Lounge = new Cell( 0, 4, "Lounge", false);
	Cell StudyLib = new Cell(1,0, "StudyLib", true);
	Cell HallBr = new Cell(1,2, "HallBr" , true);
	Cell LoungeBr = new Cell(1,4, "LoungeBr", true);
	Cell Library = new Cell(2,0, "Library" , false);
	Cell LibBr = new Cell(2,1, "LibBr", true);
	Cell BillRoom = new Cell(2,2, "BillRoom", false);
	Cell BrDr = new Cell(2,3, "BrDr" , true);
	Cell DiningRoom = new Cell(2,4, "DiningRoom", false);
	Cell LibCons = new Cell(3,0, "LibCons" , true);
	Cell BrBr = new Cell(3,2, "BrBr" , true);
	Cell DrK = new Cell(3,4, "DrK", true);
	Cell Conservatory = new Cell(4,0, "Conservatory", false);
	Cell ConsBr = new Cell(4,1, "ConsBr" , true);
	Cell Ballroom = new Cell(4,2, "Ballroom", false);
	Cell BrK = new Cell(4,3, "BrK", true);
	Cell Kitchen = new Cell(4,4, "Kitchen", false);
	
	private ArrayList<Cell> board = new ArrayList<>(Arrays.asList(Study,StudyHall, Hall, HallLounge, Lounge, StudyLib, null, HallBr, null, LoungeBr, Library,
			LibBr, BillRoom, BrDr, DiningRoom, LibCons, null, BrBr, null, DrK,Conservatory, ConsBr, Ballroom,
			BrK, Kitchen)); 
	
	public ArrayList[][] getNeighbors(int x,int y){ 

		ArrayList[][] neighbors = new ArrayList[4][4]; 
		//check if a cell above current position exists
		if (x>0 && x<=4 && y >= 0 && y<= 4){
			neighbors [0][0].add(x-1);
			neighbors [0][1].add(y);	
		}
			
		//check if a cell below current position exists
		if (x >=0 && x < 4 && y >= 0 && y<= 4){
			neighbors [1][0].add(x+1);
			neighbors [1][1].add(y);	
		}
			
		//check if a cell to left of current position exists
		if (x >= 0 && x<= 4 && y>0 && y<=4){
			neighbors  [2][0].add(x);
			neighbors  [2][1].add(y -1);	
		}

		//check if a cell to right of current position exists
		if (x >= 0 && x<= 4 && y >=0 && y < 4 ){
			neighbors  [3][0].add(x);
			neighbors  [3][1].add(y+1);	
		}
			
		//Check if it is a corner
		if (x == 0 && y == 0) { 
			neighbors [0][0].add(4); 
			neighbors [0][1].add(4); 
		} 
		 
		if (x == 4 && y == 0) { 
			neighbors [0][0].add(0); 
			neighbors [0][1].add(4); 
		} 
		
		if (x == 0 && y == 4) { 
			neighbors [1][0].add(4); 
			neighbors [1][1].add(0); 
		} 
		
		if (x == 4 && y == 4) { 
			neighbors [1][0].add(0); 
			neighbors [1][1].add(0); 
		} 

		// validate if the hallway cells are not full 
		for (int i = 0; i < 4; i++) 
		{ 
			if (board.get(neighbors[0][0].get(0)*5 +neighbors[0][1].get(0)).m_isHallway && board.get(neighbors[0][0].get(0)*5 +neighbors[0][1].get(0)).m_characterList.isEmpty()) {
				neighbors [i][0].add(-1); 
				neighbors [i][1].add(-1); 
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
