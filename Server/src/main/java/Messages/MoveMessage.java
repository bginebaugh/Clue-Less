package Messages;

public class MoveMessage extends MessageBase {
	private int posX = -1;
	private int posY = -1;

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
}
