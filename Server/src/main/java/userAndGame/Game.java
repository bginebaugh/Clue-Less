package userAndGame;

import java.io.*;
import java.util.*;

import Messages.*;

public class Game {

	private class CharAvailable {
		public CharAvailable(String name, boolean avail) {
			characterName = name;
			available = avail;
		}

		public String characterName = "";
		public boolean available = false;
	}

	static public int MAX_NUM_PLAYERS = 6;
	private ArrayList<User> m_userList = new ArrayList<User>();
	private ArrayList<User> m_userTurnList = new ArrayList<User>();
	private ArrayList<Card> m_secretEnvelope = new ArrayList<Card>();
	private ArrayList<CharAvailable> m_charSelectionList = new ArrayList<CharAvailable>();
	private int m_currentTurnIndex = 0;
	private User m_gameOwner = null;
	private String m_gameName = "";
	private int m_gameId = -1;
	// Shuffled Card List
	private ArrayList<Card> m_cardList = new ArrayList<Card>(Card.TOTAL_CARDS);
	private Board m_board = null;

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
		if (m_userList.size() == 0) {
			m_gameOwner = user;
		}
		m_userList.add(user);
		user.setGame(this);
		this.distributePlayerList();
	}

	public void removeUser(User user) {
		if (m_gameOwner.equals(user)) {
			// TODO delete the game
		}
		m_userList.remove(user);
		user.clearGame();
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

	public User getCurrentTurnUser() {
		return m_userTurnList.get(m_currentTurnIndex);
	}

	public User getUserFromCharacter(String characterName) {
		User user = null;
		for (User tmp : m_userList) {
			if (tmp.getCharacter().equals(characterName)) {
				user = tmp;
			}
		}
		return user;
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

		// Shuffle Deck
		Random rand = new Random();

		// Create the Secret Envelope
		int weapon_id = rand.nextInt(Card.NUM_WEAPONS);
		int room_id = rand.nextInt(Card.NUM_ROOMS);
		int suspect_id = rand.nextInt(Card.NUM_SUSPECTS);

		for (int i = 0; i < Card.NUM_SUSPECTS; i++) {
			if (i == suspect_id) {
				m_secretEnvelope.add(new Card(Card.SUSPECT, i));
			} else {
				deck.add(new Card(Card.SUSPECT, i));
			}
		}

		for (int i = 0; i < Card.NUM_WEAPONS; i++) {
			if (i == weapon_id) {
				m_secretEnvelope.add(new Card(Card.WEAPON, i));
			} else {
				deck.add(new Card(Card.WEAPON, i));
			}
		}
		for (int i = 0; i < Card.NUM_ROOMS; i++) {
			if (i == room_id) {
				m_secretEnvelope.add(new Card(Card.ROOM, i));
			} else {
				deck.add(new Card(Card.ROOM, i));
			}
		}

		// Subtract 3 for the cards in the secret envelope
		for (int i = 0; i < Card.TOTAL_CARDS - 3; i++) {
			int val = rand.nextInt(deck.size());
			Card card = deck.remove(val);
			m_cardList.add(card);
		}

		// Deal Cards
		int user_index = 0;
		for (Card card : m_cardList) {
			if (user_index == m_userList.size()) {
				user_index = 0;
			}

			User user = m_userList.get(user_index);

			user.addCard(card);

			user_index++;
		}

		for (User user : m_userList) {
			AssignCardsMessage acm = new AssignCardsMessage();
			Message<AssignCardsMessage> out = new Message<AssignCardsMessage>();

			for (Card card : user.getCardsInHand()) {
				acm.addCard(Card.getCardName(card.getType(), card.getCardId()));
			}

			out.setMessageType("cardAssignments");
			out.setGameId(this.getGameId());
			out.setContent(acm);
			user.sendMessage(out);
		}

		for (User user : m_userList) {
			String output = "User " + user.getUsername() + " hand is: ";
			for (Card card : user.getCardsInHand()) {
				output += Card.getCardName(card.getType(), card.getCardId()) + ", ";
			}
			System.out.println(output);
		}

		System.out.println("Secret Envelope:\n\tWeapon: " + Card.getCardName(Card.WEAPON, weapon_id) + "\n\tRoom: "
				+ Card.getCardName(Card.ROOM, room_id) + "\n\tSuspect: " + Card.getCardName(Card.SUSPECT, suspect_id));

		// Set up the board and distribute the board state
		m_board = new Board();
		this.distributeBoardState();

		// Finally, figure out who the first player is and tell them
		User firstPlayer = this.getFirstPlayer();
		CharacterTurnMessage ctm = new CharacterTurnMessage();
		Message<CharacterTurnMessage> ctmOut = new Message<CharacterTurnMessage>();
		ctm.setTurn(firstPlayer.getCharacter());
		ctmOut.setMessageType("characterTurn");
		ctmOut.setGameId(this.getGameId());
		ctmOut.setContent(ctm);

		for (User user : m_userList) {
			user.sendMessage(ctmOut);
		}
	}

	public boolean moveUser(User user, int row, int col) {
		boolean ret = false;
		MoveResponse mr = new MoveResponse();
		Message<MoveResponse> out = new Message<MoveResponse>();

		mr.setCharacterName(user.getCharacter());
		mr.setPosition(row, col);
		out.setMessageType("moveResponse");
		out.setGameId(this.getGameId());
		out.setContent(mr);

		if (m_board.moveCharacter(user.getCharacter(), row, col)) {
			ret = true;
			mr.setValid(true);
			for (User tmp : m_userList) {
				tmp.sendMessage(out);
			}
		} else {
			// The move wasn't valid
			ret = false;
			mr.setValid(false);
			user.sendMessage(out);
		}

		this.distributeBoardState();
		return ret;
	}

	public boolean makeSuggestion(User user, ArrayList<String> cards) {
		// Check if this is a valid Suggestion
		String weapon = "";
		String suspect = "";
		String room = "";

		for (String card : cards) {
			int type = Card.getCardType(card);
			if (type == Card.WEAPON) {
				weapon = card;
			} else if (type == Card.ROOM) {
				room = card;
			} else {
				suspect = card;
			}
		}

		if (weapon.equals("") || suspect.equals("") || room.equals("")) {
			// This is not a valid suggestion
			System.out.println("Invalid suggestion. Cry. Out of time to handle this properly");
			return false;
		} else {
			// Broadcast the suggestion to everyone
			SuggestionBroadcast sb = new SuggestionBroadcast();
			Message<SuggestionBroadcast> out = new Message<SuggestionBroadcast>();

			sb.setCharacterName(user.getCharacter());
			sb.setCharacter(suspect);
			sb.setWeapon(weapon);
			sb.setRoom(room);

			out.setMessageType("suggestionBroadcast");
			out.setGameId(this.getGameId());
			out.setContent(sb);
			for (User tmp : m_userList) {
				tmp.sendMessage(out);
			}

			// Move the suggested user to the room
			Board.Position p = m_board.getCellCoordinates(room);
			m_board.warpCharacter(suspect, p.row, p.col);
			this.distributeBoardState();
			return true;
		}
	}

	public boolean makeAccusation(User user, ArrayList<String> cards) {
		// Check if this is a valid Suggestion
		String weapon = "";
		String suspect = "";
		String room = "";

		for (String card : cards) {
			int type = Card.getCardType(card);
			if (type == Card.WEAPON) {
				weapon = card;
			} else if (type == Card.ROOM) {
				room = card;
			} else {
				suspect = card;
			}
		}

		boolean result = compareToEnvelope(weapon, suspect, room);

		AccusationBroadcast ab = new AccusationBroadcast();
		Message<AccusationBroadcast> abOut = new Message<AccusationBroadcast>();

		ab.setCharacterName(user.getCharacter());
		ab.setValid(result);
		ab.setCharacter(suspect);
		ab.setWeapon(weapon);
		ab.setRoom(room);
		abOut.setMessageType("accusationBroadcast");
		abOut.setGameId(this.getGameId());
		abOut.setContent(ab);
		for (User tmp : m_userList) {
			tmp.sendMessage(abOut);
		}

		// Move the accused suspect
		Board.Position p = m_board.getCellCoordinates(room);
		m_board.warpCharacter(suspect, p.row, p.col);
		this.distributeBoardState();

		// If the accusation was bad, we remove the current user from the turn list
		if (!result) {
			m_userTurnList.remove(user);
			--m_currentTurnIndex; // Now getting the next user will work properly
		}

		return result;
	}

	public boolean assignCharacterToUser(String charName, User user) {
		boolean ret = false;
		for (CharAvailable ch : m_charSelectionList) {
			if (ch.characterName.equals(charName)) {
				if (ch.available) {
					user.setCharacter(ch.characterName);
					ch.available = false;
					ret = true;
					break;
				}
			}
		}
		// Always redistribute the list, just in case a client is out of sync
		this.distributeCharList();

		return ret;
	}

	public boolean allUsersHaveCharacters() {
		boolean allChosen = true;
		for (User user : m_userList) {
			if (user.getCharacter().equals("")) {
				allChosen = false;
				break;
			}
		}

		return allChosen;
	}

	private void populateCharSelectionList() {
		for (String suspect : Card.SUSPECT_CARDS) {
			m_charSelectionList.add(new CharAvailable(suspect, true));
		}
	}

	private void distributeCharList() {
		CharacterListUpdateMessage clum = new CharacterListUpdateMessage();
		Message<CharacterListUpdateMessage> out = new Message<CharacterListUpdateMessage>();

		for (CharAvailable ch : m_charSelectionList) {
			clum.addCharacter(ch.characterName, ch.available);
		}

		out.setMessageType("characterListUpdate");
		out.setGameId(this.getGameId());
		out.setContent(clum);

		for (User user : m_userList) {
			user.sendMessage(out);
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

		populateCharSelectionList();
		distributeCharList();
	}

	public User getFirstUserWithCard(User startAfterMe, ArrayList<String> cards) {
		int startingIndex = m_userList.indexOf(startAfterMe);
		int index = startingIndex;
		User userOut = null;
		boolean found = false;

		for (int i = 0; i < m_userList.size() - 1; ++i) {
			if (index == m_userList.size()) {
				index = 0;
			}

			User tmp = m_userList.get(index);
			for (String card : cards) {
				if (tmp.isCardInHand(card)) {
					userOut = tmp;
					found = true;
					break;
				}
			}
			if (found) {
				break;
			}
			++index;
		}
		return userOut;
	}

	private boolean compareToEnvelope(String weapon, String suspect, String room) {
		boolean weaponFound = false;
		boolean suspectFound = false;
		boolean roomFound = false;
		for (Card card : m_secretEnvelope) {
			String cardName = Card.getCardName(card.getType(), card.getCardId());

			if (cardName.equals(weapon)) {
				weaponFound = true;
			} else if (cardName.equals(suspect)) {
				suspectFound = true;
			} else if (cardName.equals(room)) {
				roomFound = true;
			}
		}

		return weaponFound && suspectFound && roomFound;
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

		ServerSystem ss = ServerSystem.getInstance();
		ss.refreshGameList();
	}

	private void distributeBoardState() {
		Message<GameBoardStateMessage> gbsmOut = new Message<GameBoardStateMessage>();
		gbsmOut.setMessageType("gameBoardState");
		gbsmOut.setGameId(this.getGameId());
		gbsmOut.setContent(m_board.getBoardState());

		for (User user : m_userList) {
			user.sendMessage(gbsmOut);
		}
	}

	private User getFirstPlayer() {
		for (User user : m_userList) {
			if (user.getCharacter().equals("Miss Scarlet")) {
				// We found Miss Scarlet, so this user will go first
				break;
			}
			++m_currentTurnIndex;
		}

		if (m_currentTurnIndex == m_userList.size()) {
			// We didn't find Miss Scarlet, so just start at 0
			m_currentTurnIndex = 0;
		}

		// Set up the userTurnList
		int index = m_currentTurnIndex;
		;
		for (int i = 0; i < m_userList.size(); ++i) {
			if (index == m_userList.size()) {
				index = 0;
			}

			m_userTurnList.add(m_userList.get(index));
			++index;
		}

		m_currentTurnIndex = 0;
		return m_userTurnList.get(0);
	}
}
