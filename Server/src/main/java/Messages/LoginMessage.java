package Messages;

public class LoginMessage extends MessageBase {
	private String username;

	public void setUsername(String name) {
		username = name;
	}

	public String getUsername() {
		return username;
	}
}
