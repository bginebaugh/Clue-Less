// package clueless.server
import java.io.*; 
import java.util.*; 

// Question: Does anymore methods need to be added? 
public class Cell
{
	private int m_x; 
	private int m_y; 
	private ArrayList<Character> m_characterList; 
	private boolean m_isHallway;  
	private String m_name;  
	private int m_weapon; 
	
	// Question: What about the name for the character? 
	// Should we detrmine that from the id? 
	public boolean addCharater(int id) 
	{ 
	    if( id <= 6) 
	    { 
	    	Character CharacterToAdd = new Character(); 
	    	CharacterToAdd.m_id = id; 
	    	CharacterToAdd.m_location = new Cell(); 
	    	CharacterToAdd.m_location.m_x = m_x; 
	    	CharacterToAdd.m_location.m_y = m_y; 
	    	m_characterList.add(CharacterToAdd); 
			return true;
		}  
		else 
		{ 
			return false; 
		} 
	} 
	
	public boolean addWeapon(int id) 
	{
		if( id <= 6) 
		{ 
			m_weapon = id; 
			return true; 
		} 
		else 
		{ 
			return false;
		}  
	} 
	
	public void setString(String name) 
	{ 
		m_name = name; 
	} 
	
	public String getString()
	{
		return m_name; 	
	} 
	
} 
	
