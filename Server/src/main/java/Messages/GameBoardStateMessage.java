package Messages;

import java.util.ArrayList;

public class GameBoardStateMessage extends MessageBase {
	private class BoardCell {
		private int row = -1;
		private int col = -1;
		private ArrayList<String> characters = new ArrayList<String>();

		public int getRow() {
			return row;
		}

		public int getCol() {
			return col;
		}

		public void setPosition(int newRow, int newCol) {
			row = newRow;
			col = newCol;
		}

		public ArrayList<String> getCharacters() {
			return characters;
		}

		public void setCharacters(ArrayList<String> chars) {
			characters = chars;
		}
	}

	private ArrayList<BoardCell> board = new ArrayList<BoardCell>();

	public void addEntry(int row, int col, ArrayList<String> characters) {
		BoardCell cell = new BoardCell();
		cell.setPosition(row, col);
		cell.setCharacters(characters);
		board.add(cell);
	}

}
