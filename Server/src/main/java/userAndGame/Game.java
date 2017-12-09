package userAndGame;

import java.io.*;
import java.util.*;

import Messages.*;

public class Game {
	static public int MAX_NUM_PLAYERS = 6;
	private ArrayList<User> m_userList = new ArrayList<User>();
	private ArrayList<Card> m_secretEnvelope = new ArrayList<Card>(3);
	private User m_currentUser = null;
	private String m_gameName = "";
	private int m_gameId = -1;
	// Shuffled Card List
	private ArrayList<Card> m_cardList = new ArrayList<Card>(Card.TOTAL_CARDS);

	public Game(String gameName) {
		m_gameName = gameName;
	}

	public String getGameName() {
		return m_gameName;
	}

	public User getGameOwner() {
		return m_userList.get(0);
	}

	public int getGameId() {
		return m_gameId;
	}

	public void setGameId(int id) {
		m_gameId = id;
	}

	public void addUser(User user) {
		m_userList.add(user);
		this.distributePlayerList();
	}

	public void removeUser(User user) {
		m_userList.remove(user);
		this.distributePlayerList();
	}

	public void removeAllUsers() {
		m_userList = null;
	}

	public int getNumUsers() {

		return m_userList.size();
	}

	public ArrayList<User> getUserList() {
		return m_userList;
	}

	public boolean isFull() {
		if (m_userList.size() >= MAX_NUM_PLAYERS) {
			return true;
		}
		return false;
	}

	// What exactly should happen here? The User class doesn't have a hand.
	// Also where does the secret envelope get stored.
	public void setup() {
		// Create the Deck
		// 21 cards- because there is 6 weapons, 6 people and 9 Rooms

		ArrayList<Card> deck = new ArrayList<Card>(Card.TOTAL_CARDS);

		for (int i = 0; i < Card.NUM_ROOMS; i++) {
			deck.add(new Card(Card.ROOM, i));
		}

		for (int i = 0; i < Card.NUM_SUSPECTS; i++) {
			deck.add(new Card(Card.SUSPECT, i));
		}

		for (int i = 0; i < Card.NUM_WEAPONS; i++) {
			deck.add(new Card(Card.WEAPON, i));
		}

		// Shuffle Deck
		Random rand = new Random();
		for (int i = 0; i < Card.TOTAL_CARDS; i++) {
			int val = rand.nextInt(deck.size());
			Card card = deck.remove(val);
			m_cardList.add(card);
		}

		// Create the Secret Envelope
		int weapon_id = rand.nextInt(Card.NUM_WEAPONS);
		int room_id = rand.nextInt(Card.NUM_ROOMS);
		int suspect_id = rand.nextInt(Card.NUM_SUSPECTS);

		Card weapon = new Card(Card.WEAPON, weapon_id);
		Card room = new Card(Card.ROOM, room_id);
		Card suspect = new Card(Card.SUSPECT, suspect_id);

		m_cardList.remove(weapon);
		m_cardList.remove(room);
		m_cardList.remove(suspect);

		m_secretEnvelope.add(weapon);
		m_secretEnvelope.add(room);
		m_secretEnvelope.add(suspect);

		// Deal Cards
		int user_index = 0;
		for (int i = 0; i < m_cardList.size(); i++) {
			Card card = m_cardList.get(i);
			if (user_index == m_userList.size()) {
				user_index = 0;
			}

			User user = m_userList.get(user_index);

			user.addCard(card);

			user_index++;
		}
	}


	public boolean makeSuggestion(int userId, ArrayList<Card> cards) {
		// Check if this is a valid Suggestion
		Card weapon = null;
		Card suspect = null;
		Card room = null;

		for (Card card : cards) {
			if (card.getType() == Card.WEAPON) {
				weapon = card;
			}

			if (card.getType() == Card.SUSPECT) {
				suspect = card;
			}

			if (card.getType() == Card.ROOM) {
				room = card;
			}
		}

		if (weapon == null || suspect == null || room == null) {
			// This is not a valid suggestion
			return false;
		} else {
			return true;
			// Send Message
		}

	}

	public boolean makeAccusation(int userId, ArrayList<Card> cards) {
		// Check if this is a valid Suggestion
		Card weapon = null;
		Card suspect = null;
		Card room = null;

		for (Card card : cards) {
			if (card.getType() == Card.WEAPON) {
				weapon = card;
			}

			if (card.getType() == Card.SUSPECT) {
				suspect = card;
			}

			if (card.getType() == Card.ROOM) {
				room = card;
			}
		}

		return compareToEnvelope(weapon, suspect, room);
	}

	public void showCardToUser(ArrayList<Card> cards) {
		
		// Loop through the cards 
		for (Card card : cards) { 
		// Check to see if the card is in the card hand
			if (m_cardList.contains(card)) { 
				
			} 
		} 
	}

	// This function's purpose is to lock the userlist and remove the game from the
	// lobby, as well as notifying all players that the game is starting
	public void start() {
		ServerSystem ss = ServerSystem.getInstance();

		// Remove the game from the lobby, which will update all client's lobbies
		ss.removeGameFromLobby(this.getGameOwner().getUserId());

		// distribute the start message to all players
		StartGameResponse sgr = new StartGameResponse();
		Message<StartGameResponse> out = new Message<StartGameResponse>();

		sgr.setGameRoomName(this.getGameName());
		out.setMessageType("startGameResponse");
		out.setGameId(this.getGameId());
		out.setContent(sgr);

		for (int i = 0; i < m_userList.size(); ++i) {
			User tmp = m_userList.get(i);
			tmp.sendMessage(out);
		}
	}

	// Is this a message?
	public void notifyPlayers(int notice) {
		// ToDo:Implement
	}

	private boolean compareToEnvelope(Card weapon, Card suspect, Card room) {
		if (m_secretEnvelope.contains(weapon) && m_secretEnvelope.contains(suspect)
				&& m_secretEnvelope.contains(room)) {
			return true;
		}
		return false;
	}

	// Should this be like a list?
	public void removeUserFromTurn(int userId) {
		// ToDo: Implement
	}

	private void distributePlayerList() {
		PlayerListForGameMessage plfgm = new PlayerListForGameMessage();
		Message<PlayerListForGameMessage> plfgmOut = new Message<PlayerListForGameMessage>();

		for (int i = 0; i < m_userList.size(); ++i) {
			User tmpUser = m_userList.get(i);
			plfgm.addPlayer(tmpUser.getUsername(), tmpUser.getUserId());
		}
		plfgmOut.setMessageType("playerListForGame");
		plfgmOut.setGameId(this.getGameId());
		plfgmOut.setContent(plfgm);
		for (int i = 0; i < m_userList.size(); ++i) {
			m_userList.get(i).sendMessage(plfgmOut);
		}
	}

}
