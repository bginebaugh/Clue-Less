package userAndGame;
import java.io.*;
import java.util.*;
 


public class Board {

	public ArrayList<Cell> m_cells;
	
	public Board () {
    m_cells.add(new Cell(0, 0, "Study", false)); 
    m_cells.add(new Cell(0, 1, "StudyHall", true)); 
    m_cells.add(new Cell(0, 2, "Hall", false)); 
    m_cells.add(new Cell( 0, 3, "HallLounge", true));
	m_cells.add(new Cell( 0, 4, "Lounge", false));
	m_cells.add(new Cell(1,0, "StudyLib", true));
	m_cells.add(new Cell(1,2, "HallBr" , true));
	m_cells.add(new Cell(1,4, "LoungeBr", true));
    m_cells.add(new Cell(2,0, "Library" , false));
	m_cells.add(new Cell(2,1, "LibBr", true));
	m_cells.add(new Cell(2,2, "BillRoom", false));
	m_cells.add(new Cell(2,3, "BrDr" , true));
	m_cells.add(new Cell(2,4, "DiningRoom", false));
	m_cells.add(new Cell(3,0, "LibCons" , true));
	m_cells.add(new Cell(3,2, "BrBr" , true));
    m_cells.add(new Cell(3,4, "DrK", true));
	m_cells.add(new Cell(4,0, "Conservatory", false));
	m_cells.add(new Cell(4,1, "ConsBr" , true));
	m_cells.add(new Cell(4,2, "Ballroom", false));
	m_cells.add(new Cell(4,3, "BrK", true));
	m_cells.add(new Cell(4,4, "Kitchen", false));	
	}
	

	// get cell 3,2 to a list
	public boolean lookup(Cell cellToAdd) {
		// Length of the board game
		int length = 5;
		int indexVal = cellToAdd.m_y * length + cellToAdd.m_x;
		m_cells.add(indexVal, cellToAdd);
		return true;
	}

}
