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
			scr.setMoreInfo("Successfully selected " + charName);
		} else {
			scr.setSuccessfulSelection(false);
			scr.setMoreInfo("Could not select " + charName);
		}
		
		out.setMessageType("selectCharacterResponse");
		out.setGameId(game.getGameId());
		out.setContent(scr);
		user.sendMessage(out);
	}
}
