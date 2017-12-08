package userAndGame;

import Messages.*;

public class MessageHandler {
	void Handle(MessageContainer messageContainer, User user) {

		MessageBase mb = messageContainer.getMessageBase();

		switch (mb.getClass().getSimpleName()) {
		case "LoginMessage":
			LoginMessage loginMsg = (LoginMessage) mb;
			user.setUsername(loginMsg.getUsername());
			System.out.println("User " + user.getUserId() + "::" + user.getUsername() + " logged in.");

			// TODO this should be handled by a specific MessageHandlerClass eventually
			Message<LoginResponse> out = new Message<LoginResponse>();
			LoginResponse rsp = new LoginResponse();

			rsp.setValid(true);
			rsp.setUsername(user.getUsername());
			out.setMessageType("loginResponse");
			out.setUserId(user.getUserId());
			out.setGameId(-1);
			out.setContent(rsp);
			user.sendMessage(out);
			break;
		case "JoinGameMessage":
			JoinGameMessage joinGameMsg = (JoinGameMessage) mb;
			// TODO get game from message gameid

			Message<JoinGameResponse> jgrOut = new Message<JoinGameResponse>();
			JoinGameResponse jgr = new JoinGameResponse();

			if (joinGameMsg.getNew()) {
				System.out.println("User " + user.getUserId() + " is trying to create a new game called "
						+ joinGameMsg.getGameRoomName());
				// TODO try to create game
				jgr.setJoinedSuccessful(true);
				jgr.setGameRoomName(joinGameMsg.getGameRoomName());
				jgr.setGameOwner(user.getUserId());
				jgr.setMoreInfo("Game Created Successfully");
			} else {
				System.out.println("User " + user.getUserId() + " is trying to joing an existing game called "
						+ joinGameMsg.getGameRoomName());
				// TODO try to join game
				jgr.setJoinedSuccessful(true);
				jgr.setGameRoomName(joinGameMsg.getGameRoomName());
				jgr.setGameOwner(11); // TODO get the actual game owner
				jgr.setMoreInfo("Game Joined Successfully");
			}

			jgrOut.setMessageType("joinGame");
			jgrOut.setUserId(user.getUserId());
			jgrOut.setGameId(11); // TODO get the actual gameId
			jgrOut.setContent(jgr);
			user.sendMessage(jgrOut);
			break;
		default:
			System.out.println("The message type " + mb.getClass().getSimpleName() + " is not yet supported");
			break;
		}
	}
}
