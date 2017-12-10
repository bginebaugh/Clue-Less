package Messages;

public class SelectCharacterMessage extends MessageBase {
	private String characterSelection = "";
	private String moreInfo = "";

	public String getCharacterSelection() {
		return characterSelection;
	}

	public void setCharacterSelection(String characterSelection) {
		this.characterSelection = characterSelection;
	}

	public String getMoreInfo() {
		return moreInfo;
	}

	public void setMoreInfo(String moreInfo) {
		this.moreInfo = moreInfo;
	}
}