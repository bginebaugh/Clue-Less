package userAndGame;

import Messages.*;

public class SelectCharacterMessageHandler {
	public void Handle(SelectCharacterMessage msg, User user) {
		SelectCharacterResponse scr = new SelectCharacterResponse();
		Message<SelectCharacterResponse> out = new Message<SelectCharacterResponse>();

		String charName = msg.getCharacterSelection();

		Game game = user.getGame();
		if (game.assignCharacterToUser(charName, user)) {
			scr.setSuccessfulSelection(true);
			scr.setCharacterName(charName);
			scr.setMoreInfo("Successfully selected " + charName);
		} else {
			scr.setSuccessfulSelection(false);
			scr.setCharacterName(charName);
			scr.setMoreInfo("Could not select " + charName);
		}

		out.setMessageType("selectCharacterResponse");
		out.setGameId(game.getGameId());
		out.setContent(scr);
		user.sendMessage(out);

		// If all the users have chosen, we should kick the game off
		if (game.allUsersHaveCharacters()) {
			game.setup();
		}
	}
}
