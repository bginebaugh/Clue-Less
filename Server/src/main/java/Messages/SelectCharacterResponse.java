package Messages;

public class SelectCharacterResponse extends MessageBase {
	private boolean successfulSelection;
	private String characterName;
	private String moreInfo;

	public boolean isSuccessfulSelection() {
		return successfulSelection;
	}

	public void setSuccessfulSelection(boolean successfulSelection) {
		this.successfulSelection = successfulSelection;
	}

	public String getCharacterName() {
		return characterName;
	}

	public void setCharacterName(String name) {
		characterName = name;
	}

	public String getMoreInfo() {
		return moreInfo;
	}

	public void setMoreInfo(String moreInfo) {
		this.moreInfo = moreInfo;
	}
}