package userAndGame;

import Messages.*;

public class ShowCardHandler {
	public void Handle(ShowCardMessage msg, User user) {
		Game game = user.getGame();

		User currentUser = game.getCurrentTurnUser();

		ShowCardToUser sctu = new ShowCardToUser();
		Message<ShowCardToUser> sctuOut = new Message<ShowCardToUser>();

		sctu.setCharacterName(user.getCharacter());
		sctu.setCard(msg.getCard());
		sctuOut.setMessageType("showCardToUser");
		sctuOut.setGameId(game.getGameId());
		sctuOut.setContent(sctu);
		currentUser.sendMessage(sctuOut);
	}
}
