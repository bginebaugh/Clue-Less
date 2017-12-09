package Messages;

import java.util.ArrayList;

public class GameBoardStateMessage extends MessageBase {
	private class BoardCell {
		private int posX = -1;
		private int posY = -1;
		private ArrayList<String> characters = new ArrayList<String>();

		public int getPosX() {
			return posX;
		}

		public int getPosY() {
			return posY;
		}

		public void setPosition(int x, int y) {
			posX = x;
			posY = y;
		}

		public ArrayList<String> getCharacters() {
			return characters;
		}

		public void setCharacters(ArrayList<String> chars) {
			characters = chars;
		}
	}

	private ArrayList<BoardCell> board = new ArrayList<BoardCell>();

	public void addEntry(int x, int y, ArrayList<String> characters) {
		BoardCell cell = new BoardCell();
		cell.setPosition(x, y);
		cell.setCharacters(characters);
		board.add(cell);
	}

}
