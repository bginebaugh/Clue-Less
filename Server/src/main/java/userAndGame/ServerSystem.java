package userAndGame;

import java.util.ArrayList;
import Messages.*;

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
		boolean foundUser = false;
		
		Message<LoginResponse> out = new Message<LoginResponse>();
		LoginResponse rsp = new LoginResponse();
		System.out.println("Attempting to add user with username " + user.getUsername());
		
		for (int i = 0; i < m_userList.size(); ++i) {
			if (m_userList.get(i).getUsername().equals(user.getUsername())) {
				rsp.setValid(false);
				rsp.setMoreInfo("Username not available");
				out.setUserId(-1);
				user.setDeleted();
				foundUser = true;
				break;
			}
			System.out.println("User with username " + m_userList.get(i).getUsername() + " was not a match");
		}

		if (!foundUser) {
			user.setUserId(m_nextUserId++);
			m_userList.add(user);
			m_userLobbyList.add(user);

			System.out.println("There are now " + m_userList.size() + " users in the system");
			
			rsp.setValid(true);
			out.setUserId(user.getUserId());
		}
		
		rsp.setUsername(user.getUsername());
		out.setMessageType("loginResponse");
		out.setGameId(-1);
		out.setContent(rsp);
		user.sendMessage(out);
		
		distributeGameList();
		
		return !foundUser;
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

	public boolean createGame(String gameName) {
		for (int i = 0; i < m_gameList.size(); ++i) {
			if (m_gameList.get(i).getGameName().equals(gameName)) {
				return false;
			}
		}
		Game game = new Game(gameName);
		game.setGameId(m_nextGameId++);
		m_gameList.add(game);
		m_gameLobbyList.add(game);

		// We created a game, so now we need to tell everybody currently in the lobby
		// about it
		this.distributeGameList();

		return true;
	}

	public void deleteGame(int userId) {
		for (int i = 0; i < m_gameList.size(); ++i) {
			if (m_gameList.get(i).getGameOwner().getUserId() == userId) {
				this.removeGameFromLobby(userId);
				m_gameList.remove(i);
				break;
			}
		}
	}

	public void removeGameFromLobby(int userId) {
		for (int i = 0; i < m_gameLobbyList.size(); ++i) {
			if (m_gameLobbyList.get(i).getGameOwner().getUserId() == userId) {
				m_gameLobbyList.remove(i);
				this.distributeGameList();
				break;
			}
		}
	}
	
	public void refreshGameList() {
		this.distributeGameList();
	}

	private void distributeGameList() {
		GameListForLobbyMessage glflm = new GameListForLobbyMessage();
		Message<GameListForLobbyMessage> outMsg = new Message<GameListForLobbyMessage>();

		// Populate the list with all the lobby games
		for (int i = 0; i < m_gameLobbyList.size(); ++i) {
			Game tmpGame = m_gameLobbyList.get(i);
			glflm.addGame(tmpGame.getGameName(), tmpGame.getGameId(), tmpGame.getNumUsers());
		}

		outMsg.setMessageType("gameListForLobby");
		outMsg.setContent(glflm);

		// Send the message to all the lobby users
		for (int i = 0; i < m_userLobbyList.size(); ++i) {
			m_userLobbyList.get(i).sendMessage(outMsg);
		}
	}
}