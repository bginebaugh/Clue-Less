package Messages;

public class LoginResponse extends MessageBase {
	private boolean valid = false;
	private String moreInfo = "";
	private String username = "";

	public boolean getValid() {
		return valid;
	}

	public void setValid(boolean val) {
		valid = val;
	}

	public String getMoreInfo() {
		return moreInfo;
	}

	public void setMoreInfo(String info) {
		moreInfo = info;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		username = name;
	}
}