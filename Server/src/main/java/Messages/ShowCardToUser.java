package Messages;

public class ShowCardToUser extends MessageBase {
	private String characterName = "";
	private String card = "";

	public String getCharacterName() {
		return characterName;
	}

	public void setCharacterName(String characterName) {
		this.characterName = characterName;
	}

	public String getCard() {
		return card;
	}

	public void setCard(String card) {
		this.card = card;
	}
}
