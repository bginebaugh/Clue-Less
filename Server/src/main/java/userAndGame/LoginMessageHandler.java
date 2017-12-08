package userAndGame;

import Messages.*;

public class LoginMessageHandler {
	public void Handle(LoginMessage msg, User user) {
		ServerSystem ss = ServerSystem.getInstance();
		Message<LoginResponse> out = new Message<LoginResponse>();
		LoginResponse rsp = new LoginResponse();

		user.setUsername(msg.getUsername());
		System.out.println("User " + user.getUserId() + "::" + user.getUsername() + " logged in.");

		if (ss.addUser(user)) {
			rsp.setValid(true);
			out.setUserId(user.getUserId());
		} else {
			System.out.println("Could not add the user to the system");
			// TODO this should be handled by a specific MessageHandlerClass eventually
			rsp.setValid(false);
			out.setUserId(-1);
			user.setDeleted();
		}
		rsp.setUsername(user.getUsername());
		out.setMessageType("loginResponse");
		out.setGameId(-1);
		out.setContent(rsp);
		user.sendMessage(out);
	}

}
