package userAndGame;

import java.util.ArrayList;

import Messages.*;

public class JoinGameMessageHandler {
	public void Handle(JoinGameMessage msg, User user) {
		ServerSystem ss = ServerSystem.getInstance();
		Message<JoinGameResponse> jgrOut = new Message<JoinGameResponse>();
		JoinGameResponse jgr = new JoinGameResponse();
		int gameIdToUse = -1;
		String desiredName = msg.getGameRoomName();

		if (msg.getNew()) { // We want to create a new game
			System.out.println("User " + user.getUserId() + " is trying to create a new game called " + desiredName);

			if (ss.createGame(desiredName)) { // This is not a duplicate
				try {
					Game game = ss.getGame(desiredName);
					gameIdToUse = game.getGameId();
					jgr.setJoinedSuccessful(true);
					jgr.setMoreInfo("Game Created Successfully");
				} catch (IndexOutOfBoundsException e) {
					System.out.println("Game " + desiredName + " failed to get created");
					jgr.setJoinedSuccessful(false);
					jgr.setMoreInfo("Very bad server error during game creation");
				}
			} else {
				System.out.println("Game " + desiredName + " already exists");
				jgr.setJoinedSuccessful(false);
				jgr.setMoreInfo("Could not create game " + desiredName);
			}

			jgr.setGameOwner(user.getUserId());

		} else { // We want to join an existing game
			System.out
					.println("User " + user.getUserId() + " is trying to joing an existing game called " + desiredName);
			// TODO try to join game
			try {
				Game game = ss.getGame(desiredName);
				gameIdToUse = game.getGameId();

				if (!game.isFull()) {
					jgr.setJoinedSuccessful(true);
					jgr.setMoreInfo("Game Created Successfully");
				} else {
					jgr.setJoinedSuccessful(false);
					jgr.setMoreInfo("Game is full");
				}
			} catch (IndexOutOfBoundsException e) {
				jgr.setJoinedSuccessful(false);
				jgr.setMoreInfo("Game does not exist");
			}
		}

		jgr.setGameRoomName(desiredName);
		jgrOut.setMessageType("joinGame");
		jgrOut.setUserId(user.getUserId());
		jgrOut.setGameId(gameIdToUse); // TODO get the actual gameId
		jgrOut.setContent(jgr);
		user.sendMessage(jgrOut);

		// Add User to game object after notifying them of success
		if (jgr.isJoinedSuccessful()) {
			Game game = ss.getGame(desiredName);
			game.addUser(user);
		}
	}
}
