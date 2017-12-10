package userAndGame;

import Messages.MoveMessage;

public class MoveMessageHandler {
	public void Handle(MoveMessage msg, User user) {
		System.out.println(msg.toString());
		user.getGame().moveUser(user, msg.getPosX(), msg.getPosY());
	}
}
