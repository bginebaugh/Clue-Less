package userAndGame;

import Messages.*;

public class EndTurnMessageHandler {
	public void Handle(EndTurnMessage msg, User user) {
		Game game = user.getGame();
		User nextUser = game.getUserForNextTurn();
		
		CharacterTurnMessage ctm = new CharacterTurnMessage();
		Message<CharacterTurnMessage> ctmOut = new Message<CharacterTurnMessage>();
		
		ctm.setTurn(nextUser.getCharacter());
		ctmOut.setMessageType("characterTurn");
		ctmOut.setGameId(game.getGameId());
		ctmOut.setContent(ctm);
		
		for (User tmp : game.getUserList()) {
			tmp.sendMessage(ctmOut);
		}
	}
}
