package Messages;

public class MoveResponse extends MessageBase {
	private boolean valid = false;
	private String characterName = "";
	private int row = -1;
	private int col = -1;

	public int getRow() {
		return row;
	}

	public int getCol() {
		return col;
	}

	public void setPosition(int inRow, int inCol) {
		row = inRow;
		col = inCol;
	}

	public String getCharacterName() {
		return characterName;
	}

	public void setCharacterName(String name) {
		characterName = name;
	}

	public boolean getValid() {
		return valid;
	}

	public void setValid(boolean x) {
		valid = x;
	}
}
