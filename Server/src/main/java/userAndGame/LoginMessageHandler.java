package userAndGame;

import Messages.*;

public class LoginMessageHandler {
	public void Handle(LoginMessage msg, User user) {
		ServerSystem ss = ServerSystem.getInstance();
		user.setUsername(msg.getUsername());
		System.out.println("User " + user.getUserId() + "::" + user.getUsername() + " logged in.");

		if (!ss.addUser(user)) {
			System.out.println("Could not add the user to the system");
		}
	}
}
