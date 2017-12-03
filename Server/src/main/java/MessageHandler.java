import Messages.*;

public class MessageHandler {
	void Handle(MessageBase message, User user) {
		switch (message.getClass().getSimpleName()) {
		case "LoginMessage":
			LoginMessage msg = (LoginMessage) message;
			user.setUsername(msg.getUsername());
			System.out.println("User " + user.getUserId() + "::" + user.getUsername() + " logged in.");
			
			//TODO this should be handled by a specific MessageHandlerClass eventually
			Message<LoginResponse> out = new Message<LoginResponse>();
			LoginResponse rsp = new LoginResponse();
			
			rsp.setValid(true);
			out.setMessageType("loginResponse");
			out.setUserId(user.getUserId());
			out.setGameId(-1);
			out.setContent(rsp);
			user.sendMessage(out);
			break;
		default:
			System.out.println("The message type " + message.getClass().toString() + " is not yet supported");
			break;
		}
	}
}
