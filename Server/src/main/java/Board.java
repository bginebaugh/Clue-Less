import java.io.*;
import java.util.*;

// Question: Do we need any methods? 
// None were in the SDD? 
public class Board {

	private ArrayList<Cell> m_cells;

	// get cell 3,2 to a list
	public boolean lookup(Cell cellToAdd) {
		// Length of the board game
		int length = 5;
		int indexVal = cellToAdd.m_y * length + cellToAdd.m_x;
		m_cells.add(indexVal, cellToAdd);
		return true;
	}

}
