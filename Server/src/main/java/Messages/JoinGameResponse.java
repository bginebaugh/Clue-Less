package Messages;

import java.util.ArrayList;

public class JoinGameResponse extends MessageBase {
	private boolean joinedSuccessful;
	private String gameRoomName;
	private int gameOwner;
	private ArrayList<String> playersInRoom;
	private String moreInfo;

	public boolean isJoinedSuccessful() {
		return joinedSuccessful;
	}

	public void setJoinedSuccessful(boolean joinedSuccessful) {
		this.joinedSuccessful = joinedSuccessful;
	}

	public String getGameRoomName() {
		return gameRoomName;
	}

	public void setGameRoomName(String gameRoomName) {
		this.gameRoomName = gameRoomName;
	}

	public int getGameOwner() {
		return gameOwner;
	}

	public void setGameOwner(int gameOwner) {
		this.gameOwner = gameOwner;
	}
	
	public ArrayList<String> getPlayersInRoom() {
		return playersInRoom;
	}
	
	public void setPlayersInRoom(ArrayList<String> players) {
		playersInRoom = players;
	}

	public String getMoreInfo() {
		return moreInfo;
	}

	public void setMoreInfo(String moreInfo) {
		this.moreInfo = moreInfo;
	}
}