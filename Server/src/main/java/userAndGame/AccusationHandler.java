package userAndGame;

import java.util.ArrayList;

import Messages.AccusationMessage;

public class AccusationHandler {
	public void Handle(AccusationMessage msg, User user) {
		ArrayList<String> cards = new ArrayList<String>();
		cards.add(msg.getCharacter());
		cards.add(msg.getWeapon());
		cards.add(msg.getRoom());

		Game game = user.getGame();

		game.makeAccusation(user, cards);
	}
}
