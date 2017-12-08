package userAndGame;
import java.util.ArrayList;

public class ServerSystem {
	private ArrayList<User> m_userList;
	private ArrayList<User> m_userLobbyList;
	private ArrayList<Game> m_gameList;
	private ArrayList<Game> m_gameLobbyList;
	private int m_nextUserId = 0;
	private int m_nextGameId = 0;

	private static ServerSystem instance = null;

	private ServerSystem() {
		m_userList = new ArrayList<User>();
		m_userLobbyList = new ArrayList<User>();
		m_gameList = new ArrayList<Game>();
		m_gameLobbyList = new ArrayList<Game>();
	}

	public static ServerSystem getInstance() {
		if (instance == null) {
			instance = new ServerSystem();
		}
		return instance;
	}

	public boolean addUser(User user) {
		System.out.println("Attempting to add user with username " + user.getUsername());
		for (int i = 0; i < m_userList.size(); ++i) {
			if (m_userList.get(i).getUsername().equals(user.getUsername())) {
				return false;
			}
			System.out.println("User with username " + m_userList.get(i).getUsername() + " was not a match");
		}

		user.setUserId(m_nextUserId++);
		m_userList.add(user);
		m_userLobbyList.add(user);
		
		System.out.println("There are now " + m_userList.size() + " users in the system");
		return true;
	}

	public void removeUser(int userId) {
		for (int i = 0; i < m_userList.size(); ++i) {
			if (m_userList.get(i).getUserId() == userId) {
				if (m_userLobbyList.contains(m_userList.get(i))) {
					m_userLobbyList.remove(m_userLobbyList.get(i));
				}
				m_userList.remove(i);
				break;
			}
		}
	}
	
	public Game getGame(String gameName) throws IndexOutOfBoundsException {
		for (int i = 0; i < m_gameList.size(); ++i) {
			if (m_gameList.get(i).getGameName().equals(gameName)) {
				return m_gameList.get(i);
			}
		}
		
		throw new IndexOutOfBoundsException("Could not find game called " + gameName);
	}

	public boolean createGame(String gameName, User owner) {
		for (int i = 0; i < m_gameList.size(); ++i) {
			if (m_gameList.get(i).getGameName().equals(gameName)) {
				return false;
			}
		}
		Game game = new Game(gameName, owner);
		game.setGameId(m_nextGameId++);
		m_gameList.add(game);
		m_gameLobbyList.add(game);
		return true;
	}

	public void deleteGame(int userId) {
		for (int i = 0; i < m_gameList.size(); ++i) {
			if (m_gameList.get(i).getGameOwner().getUserId() == userId) {
				if (m_gameLobbyList.contains(m_gameList.get(i))) {
					m_gameLobbyList.remove(m_gameList.get(i));
				}
				m_gameList.remove(i);
				break;
			}
		}
	}

	public void removeGameFromLobby(int userId) {
		for (int i = 0; i < m_gameLobbyList.size(); ++i) {
			if (m_gameLobbyList.get(i).getGameOwner().getUserId() == userId) {
				m_gameLobbyList.remove(i);
				break;
			}
		}
	}
}