package Messages;

import java.util.ArrayList;

public class SuggestionResponsePrompt extends MessageBase {
	private String characterName = "";
	private ArrayList<String> cardChoices = new ArrayList<String>();

	public String getCharacterName() {
		return characterName;
	}

	public void setCharacterName(String characterName) {
		this.characterName = characterName;
	}

	public void addCard(String card) {
		cardChoices.add(card);
	}
}
