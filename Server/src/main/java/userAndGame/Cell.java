package userAndGame;
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
	
	public ArrayList<Integer> getNeighbors(int x,int y){ 

		ArrayList<Integer> neighbors = new ArrayList<Integer> (); 
		//check if a cell above current position exists
		if (x>0 && x<=4 && y >= 0 && y<= 4){
			neighbors.add(x-1);
			neighbors.add(y);	
		}
			
		//check if a cell below current position exists
		if (x >=0 && x < 4 && y >= 0 && y<= 4){
			neighbors.add(x+1);
			neighbors.add(y);	
		}
			
		//check if a cell to left of current position exists
		if (x >= 0 && x<= 4 && y>0 && y<=4){
			neighbors.add(x);
			neighbors.add(y -1);	
		}

		//check if a cell to right of current position exists
		if (x >= 0 && x<= 4 && y >=0 && y < 4 ){
			neighbors.add(x);
			neighbors.add(y+1);	
		}
			
		//Check if it is a corner
		if (x == 0 && y == 0) { 
			neighbors.add(0,4); 
			neighbors.add(1,4); 
		} 
		 
		if (x == 4 && y == 0) { 
			neighbors.add(0,0); 
			neighbors.add(1,4); 
		} 
		
		if (x == 0 && y == 4) { 
			neighbors.add(2,4); 
			neighbors.add(3,0); 
		} 
		
		if (x == 4 && y == 4) { 
			neighbors.add(2,0); 
			neighbors.add(3,0); 
		} 

		Board gameBoard = new Board(); 
		// validate if the hallway cells are not full 
		for (int i = 0; i < 4; i++) 
		{ 
		    int index1 = i*5; 
		    int index2 = i+1; 
			if (gameBoard.m_cells.get(neighbors.get(index1) + neighbors.get(index2)).m_isHallway && gameBoard.m_cells.get(neighbors.get(index1) +neighbors.get(index2)).m_characterList.isEmpty()) {
				neighbors.add(index1,1000 ); 
				neighbors.add(index2, 1000); 
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
