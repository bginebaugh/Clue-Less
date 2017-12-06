package Messages;

public class SelectCharacterMessage extends MessageBase {
	private String characterSelection;

	public String getCharacterSelection() {
		return characterSelection;
	}

	public void setCharacterSelection(String characterSelection) {
		this.characterSelection = characterSelection;
	}
}