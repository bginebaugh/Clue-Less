package Messages;

public class Message<T> {
	private String messageType;
	private int userId;
	private int gameId;
	private T content;

	public String getMessageType() {
		return messageType;
	}

	public void setMessageType(String type) {
		messageType = type;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int id) {
		userId = id;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int id) {
		gameId = id;
	}

	public T getContent() {
		return content;
	}

	public void setContent(T myContent) {
		content = myContent;
	}
}
