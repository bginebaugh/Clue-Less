package Messages;

import java.util.ArrayList;

public class GameListForLobbyMessage {
	private class Info {
		public String gameRoomName;
		public int gameId;
		public int playersInRoom;
	}

	ArrayList<Info> gameRoomList = new ArrayList<Info>();

	public void addGame(String name, int id, int numPlayers) {
		Info info = new Info();
		info.gameRoomName = name;
		info.gameId = id;
		info.playersInRoom = numPlayers;
		gameRoomList.add(info);
	}
}