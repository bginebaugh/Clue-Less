package Messages;

public class JoinGameMessage extends MessageBase {
	private boolean isNew;
	private String gameRoomName;

	public void setNew(boolean isNew_) {
		isNew = isNew_;
	}

	public boolean getNew() {
		return isNew;
	}

	public void setGameRoomName(String gameRoomName_) {
		gameRoomName = gameRoomName_;
	}

	public String getGameRoomName() {
		return gameRoomName;
	}
}