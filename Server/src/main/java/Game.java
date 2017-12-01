//package clue-less server 

import java.io.*; 
import java.util.*; 

public class Game
{ 
	static public int MAX_NUM_PLAYERS = 6; 
	//private ArrayList<User> m_userList; 
	private ArrayList<Card> m_secretEnvelope; 
	//private User m_currentUser; 
	private ArrayList<Card> m_cardList; 
	
	// Note: Can't implement yet the user class is not created. 
	public void addUser(int userId) 
	{ 
		// ToDo: Implement 
	} 
	
	// Note: Can't implement yet the user class is not created. 
	public void removeUser(int userId) 
	{ 
		// ToDo: Implement 
	} 
	
	// Note: Can't implement yet the user class is not created. 
	public void removeAllUsers()
	{ 
		// ToDo: Implement 
	} 
	
	// Note Can't implement yet the user class is not created. 
	public int getNumUsers() 
	{ 
		// ToDo: Implement 
		return 1; 
	} 
	
	public boolean isFull() 
	{ 
		// ToDo: Implement
		return true;
	} 
	
	public void setup()
	{ 
		//ToDo: Implement 
	} 
	
	public boolean setCharacter(int userId, int CharacterId) 
	{ 
		//TODo: Implement 
		return true; 
	} 
	
	public boolean moveCharacter(int userId, int posX, int posY) 
	{ 
		//ToDo: Implement
		return true; 
	} 
	
	public void makeSuggestion(int userId, ArrayList<Card> cards) 
	{ 
		//ToDo: Implement 
	} 
	
	public void makeAccusation(int userId, ArrayList<Card> cards) 
	{ 
		//ToDo: Implement 
	} 
	
	public void showCardToUser(int userId, int cardId) 
	{ 
		//ToDo: Implement 
	} 
	
	public void start()
	{ 
		//ToDo: Implement 
	} 
	
	
	
	
	
} 
