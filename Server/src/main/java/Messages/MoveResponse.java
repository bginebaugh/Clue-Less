package Messages;

public class MoveResponse extends MessageBase {
	private boolean valid = false;
	private String characterName = "";
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
