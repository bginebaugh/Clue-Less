package Messages;

import java.util.ArrayList;

public class AssignCardsMessage extends MessageBase {
	private ArrayList<String> cards;

	public void setCards(ArrayList<String> cards_) {
		cards = cards_;
	}

	public ArrayList<String> getCards() {
		return cards;
	}
}