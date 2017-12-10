package Messages;

public class MoveMessage extends MessageBase {
	private int row = -1;
	private int col = -1;

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
}
