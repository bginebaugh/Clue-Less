package userAndGame;

import java.io.*;
import java.util.*;

import Messages.GameBoardStateMessage;
import userAndGame.Cell.CellType;

public class Board {

	private ArrayList<Cell> m_cells = new ArrayList<Cell>();
	private final int m_width = 5;
	private final int m_height = 5;

	public Board() {

		// Size the board properly
		for (int i = 0; i < m_width * m_height; ++i) {
			m_cells.add(new Cell());
		}

		int index = 0;
		for (int y = 0; y < m_height; ++y) {
			for (int x = 0; x < m_width; ++x) {
				Cell cell = this.getCell(x, y);
				if (y % 2 == 0) {
					// Even rows
					if (x % 2 == 0) {
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
					if (x % 2 == 0) {
						// Even columns are halls
						cell.setType(Cell.CellType.CELL_TYPE_HALLWAY);
					} else {
						// Odd columns are empty
						cell.setType(Cell.CellType.CELL_TYPE_EMPTY);
					}
				}
				cell.setPosition(x, y);
				System.out.println(
						"Cell at (" + x + ", " + y + ") is type " + cell.getType() + ", called " + cell.getName());
			}
		}

		// Finally, set the initial positions
		this.getCell(3, 0).addCharacter("Miss Scarlet");
		this.getCell(0, 1).addCharacter("Professor Plum");
		this.getCell(4, 1).addCharacter("Colonel Mustard");
		this.getCell(0, 3).addCharacter("Mrs. Peacock");
		this.getCell(1, 4).addCharacter("Mr. Green");
		this.getCell(3, 4).addCharacter("Mrs. White");
	}

	public Cell getCell(int x, int y) {
		return m_cells.get(y * m_width + x);
	}

	public GameBoardStateMessage getBoardState() {
		GameBoardStateMessage gbsm = new GameBoardStateMessage();
		for (Cell cell : m_cells) {
			if (cell.hasCharacters()) {
				gbsm.addEntry(cell.getX(), cell.getY(), cell.getCharacters());
			}
		}

		return gbsm;
	}

}
