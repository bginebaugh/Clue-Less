//package clue-less server 

import java.io.*; 
import java.util.*; 

public class Game
{ 
	static public int MAX_NUM_PLAYERS = 6; 
	private ArrayList<User> m_userList; 
	private ArrayList<Card> m_secretEnvelope(3); 
	private User m_currentUser; 
	// Shuffled Card List 
	private ArrayList<Card> m_cardList(TOTAL_CARDS); 
	
	public void addUser(User user) 
	{ 
		m_userList.add(user); 
	} 
	
	public void removeUser(User user) 
	{ 
		m_userList.remove(user); 
	} 
	 
	public void removeAllUsers()
	{ 
		m_userList = null; 
	} 
	
	public int getNumUsers() 
	{ 
 
		return m_userList.size(); 
	} 
	
	public boolean isFull() 
	{ 
		if (m_userList.size() >= MAX_NUM_PLAYERS) 
		{ 
			return true;
		} 
		return false; 
	} 
	
	// What exactly should happen here? The User class doesn't have a hand. 
	// Also where does the secret envelope get stored. 
	public void setup()
	{ 
		// Create the Deck 
		// 21 cards- because there is 6 weapons, 6 people and 9 Rooms
		ArrayList<Card> deck = new ArrayList<Card>(TOTAL_CARDS)
		
		for (int i = 0; i<NUM_ROOMS; i++) 
		{ 
			deck.add(new Card(ROOM, i));  
		} 
		
		for (int i = 0; i<NUM_SUSPECTS; i++) 
		{ 
			deck.add(new Card(SUSPECT, i)); 
		} 
		
		for (int i = 0; i<NUM_WEAPONS; i++) 
		{ 
			deck.add(new Card(WEAPON,i));
		} 
		
		// Shuffle Deck 
		Random rand = new Random(); 
		for (int i = 0; i < TOTAL_CARDS; i++) 
		{ 
			int val = rand.nextInt(deck.size()); 
			Card card = deck.remove(val); 
			m_cardList.add(card); 
		} 
		
		// Create the Secret Envelope 
		int weapon_id = rand.nextInt(NUM_WEAPONS); 
		int room_id = rand.nextInt(NUM_ROOMS); 
		int suspect_id = rand.nextInt(NUM_SUSPECTS); 
		
		Card weapon = new Card(WEAPON, weapon_id); 
		Card room = new Card(ROOM, room_id);  
		Card suspect = new Card(SUSPECT, suspect_id); 
		
		m_cardList.remove(weapon); 
		m_cardList.remove(room); 
		m_cardList.remove(suspect); 
		
		m_secretEnvelope.add(weapon); 
		m_secretEnvelope.add(room); 
		m_secretEnvelope.add(suspect);
		
		// Deal Cards 
		int user_index = 0; 
		for (int i = 0; i< m_cardList.size(); i++)
		{ 
			Card card = m_cardList.get(i); 
			if (user_index == m_userList.size()) 
			{ 
				user_index = 0; 
			} 
			
			User user = m_userList.get(user_index); 
			
			user.addCard(card); 
			
			user_index++; 
		} 		
	} 
	
	public boolean setCharacter(int userId, Character character) 
	{ 
		for (int i=0; i<m_userList.size(); i++) 
		{ 
			if(m_userList.get(i).m_userId == userId) 
			{ 
				m_userList.get(i).m_character = character; 
				return true; 
			}
		} 
		return false; 
	} 
	
	public boolean moveCharacter(int userId, int posX, int posY) 
	{ 
		for (int i=0; i<m_userList.size(); i++) 
		{ 
			if(m_userList.get(i).m_userId == userId) 
			{ 
				m_userList.get(i).m_character.m_location.m_x = posX; 
				m_userList.get(i).m_character.m_location.m_y = posY; 
				return true; 
			}
		} 
		return false; 
	} 
	
	public boolean makeSuggestion(int userId, ArrayList<Card> cards) 
	{ 
		// Check if this is a valid Suggestion 
		Card weapon = null; 
		Card suspect = null; 
		Card room = null; 
		
		for (Card card : cards) 
		{ 
			if (card.getType() == WEAPON) 
			{ 
				weapon = card; 
			} 
			
			if (card.getType() == SUSPECT)			
			{ 
				suspect = card; 
			} 
			
			if (card.getType() == ROOM) 
			{ 
				room = card; 
			} 
		} 
		
		if (weapon == null || suspect == null || room == null) 
		{ 
			// This is not a valid suggestion 
			return false; 
		} 
		else 
		{ 
			return true; 
			// Send Message 
		} 
				
	} 
	
	public boolean makeAccusation(int userId, ArrayList<Card> cards) 
	{ 
		// Check if this is a valid Suggestion 
		Card weapon = null; 
		Card suspect = null; 
		Card room = null; 
		
		for (Card card : cards) 
		{ 
			if (card.getType() == WEAPON) 
			{ 
				weapon = card; 
			} 
			
			if (card.getType() == SUSPECT)			
			{ 
				suspect = card; 
			} 
			
			if (card.getType() == ROOM) 
			{ 
				room = card; 
			} 
		} 
		
		return compareToEnvelope(weapon, suspect, room); 
	} 
	
	// Is this going to just form a message and send it?? 
	public void showCardToUser(int userId, int cardId) 
	{ 
		//ToDo: Implement 
	} 
	
	//What should this function have in it??
	public void start()
	{ 
		//ToDo: Implement 
	} 
	
	// Is this a message? 
	public void notifyPlayers(int notice) 
	{ 
		//ToDo:Implement 
	} 
	
	private boolean compareToEnvelope(Card weapon, Card suspect, Card room) 
	{ 
		if (m_secretEnvelope.contains(weapon) && m_secretEnvelope.contains(suspect) && m_secretEnvelope.contains(room))
		{ 
			return true; 
		} 
		return false; 
	} 
	
	//Should this be like a list?
	public void removeUserFromTurn(int userId) 
	{ 
		//ToDo: Implement
	} 
	
} 
