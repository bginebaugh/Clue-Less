package Messages;

import java.util.ArrayList;

public class PlayerListForGameMessage {
	private class Info {
		public String username;
		public int userId;
	}

	private ArrayList<Info> playerList = new ArrayList<Info>();

	public void addPlayer(String name, int id) {
		Info info = new Info();
		info.username = name;
		info.userId = id;
		playerList.add(info);
	}
}