package userAndGame;

import java.io.*;
import java.util.*;

import Messages.GameBoardStateMessage;
import userAndGame.Cell.CellType;

public class Board {

	private ArrayList<Cell> m_cells = new ArrayList<Cell>();
	private final int m_width = 5;
	private final int m_height = 5;

	public class Position {
		public Position(int row_, int col_) {
			row = row_;
			col = col_;
		}

		public int row = -1;
		public int col = -1;
	}

	public Board() {

		// Size the board properly
		for (int i = 0; i < m_width * m_height; ++i) {
			m_cells.add(new Cell());
		}

		int index = 0;
		for (int row = 0; row < m_height; ++row) {
			for (int col = 0; col < m_width; ++col) {
				Cell cell = this.getCell(row, col);
				if (row % 2 == 0) {
					// Even rows
					if (col % 2 == 0) {
						// Even columns are rooms
						cell.setName(Card.getCardName(Card.ROOM, index));
						cell.setType(Cell.CellType.CELL_TYPE_ROOM);
						++index;
					} else {
						// Odd columns are halls
						cell.setType(Cell.CellType.CELL_TYPE_HALLWAY);
					}
				} else {
					// Odd rows
					if (col % 2 == 0) {
						// Even columns are halls
						cell.setType(Cell.CellType.CELL_TYPE_HALLWAY);
					} else {
						// Odd columns are empty
						cell.setType(Cell.CellType.CELL_TYPE_EMPTY);
					}
				}
				cell.setPosition(row, col);
				System.out.println(
						"Cell at (" + row + ", " + col + ") is type " + cell.getType() + ", called " + cell.getName());
			}
		}

		// Finally, set the initial positions
		this.getCell(0, 3).addCharacter("Miss Scarlet");
		this.getCell(1, 0).addCharacter("Professor Plum");
		this.getCell(1, 4).addCharacter("Colonel Mustard");
		this.getCell(3, 0).addCharacter("Mrs. Peacock");
		this.getCell(4, 1).addCharacter("Mr. Green");
		this.getCell(4, 3).addCharacter("Mrs. White");
	}

	public Cell getCell(int row, int col) {
		return m_cells.get(row * m_width + col);
	}

	public GameBoardStateMessage getBoardState() {
		GameBoardStateMessage gbsm = new GameBoardStateMessage();
		for (Cell cell : m_cells) {
			if (cell.hasCharacters()) {
				gbsm.addEntry(cell.getRow(), cell.getCol(), cell.getCharacters());
			}
		}

		return gbsm;
	}

	public Position getCharacterPosition(String name) {
		Position p = new Position(-1, -1);
		for (Cell cell : m_cells) {
			if (cell.hasCharacter(name)) {
				p.row = cell.getRow();
				p.col = cell.getCol();
				break;
			}
		}
		return p;
	}

	public ArrayList<Cell> getNeighbors(int row, int col) {
		return getNeighbors(this.getCell(row, col));
	}

	public ArrayList<Cell> getNeighbors(Cell cell) {
		ArrayList<Cell> neighbors = new ArrayList<Cell>();

		if (cell.getRow() > 0) {
			neighbors.add(this.getCell(cell.getRow() - 1, cell.getCol()));
		}

		if (cell.getRow() < m_height - 1) {
			neighbors.add(this.getCell(cell.getRow() + 1, cell.getCol()));
		}

		if (cell.getCol() > 0) {
			neighbors.add(this.getCell(cell.getRow(), cell.getCol() - 1));
		}

		if (cell.getCol() < m_width - 1) {
			neighbors.add(this.getCell(cell.getRow(), cell.getCol() + 1));
		}

		if (cell.getRow() == 0 && cell.getCol() == 0) {
			neighbors.add(this.getCell(m_height - 1, m_width - 1));
		}

		if (cell.getRow() == 0 && cell.getCol() == m_width - 1) {
			neighbors.add(this.getCell(m_height - 1, 0));
		}

		if (cell.getRow() == m_height - 1 && cell.getCol() == 0) {
			neighbors.add(this.getCell(0, m_width - 1));
		}

		if (cell.getRow() == m_height - 1 && cell.getCol() == m_width - 1) {
			neighbors.add(this.getCell(0, 0));
		}

		return neighbors;
	}

	public boolean moveCharacter(String name, int destRow, int destCol) {
		System.out.println("Trying to move " + name + " to " + destRow + ", " + destCol);
		boolean ret = false;
		Position p = this.getCharacterPosition(name);
		Cell current = this.getCell(p.row, p.col);

		ArrayList<Cell> neighbors = this.getNeighbors(current);
		Cell desired = this.getCell(destRow, destCol);
		if (neighbors.contains(desired)) {
			// Verify that the character can move there
			if (desired.addCharacter(name)) {
				current.removeCharacter(name);
				ret = true;
			}
		}

		return ret;
	}
}
