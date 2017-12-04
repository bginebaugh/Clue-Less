//package clue-less server 

import java.io.*; 
import java.util.*; 

public class Game
{ 
	static public int MAX_NUM_PLAYERS = 6; 
	private ArrayList<User> m_userList; 
	private ArrayList<Card> m_secretEnvelope; 
	private User m_currentUser; 
	private ArrayList<Card> m_cardList; 
	
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
		// ToDo!!
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
	
	//Is this going to just form a message and send it?? 
	public void makeSuggestion(int userId, ArrayList<Card> cards) 
	{ 
		//ToDo: Implement 
	} 
	
	//Is this going to just form a message and send it???
	public void makeAccusation(int userId, ArrayList<Card> cards) 
	{ 
		//ToDo: Implement 
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
	
	private boolean compareToEnvelope(ArrayList<Card> cards) 
	{ 
		//ToDo:Implement 
		return true; 
	} 
	
	//Should this be like a list?
	public void removeUserFromTurn(int userId) 
	{ 
		//ToDo: Implement
	} 
	
} 
