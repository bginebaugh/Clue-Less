package userAndGame;

import Messages.*;

public class StartGameMessageHandler {
	public void Handle(StartGameMessage msg, User user) {
		ServerSystem ss = ServerSystem.getInstance();
		Game game = ss.getGame(msg.getGameRoomName());
		game.start();
	}
}
