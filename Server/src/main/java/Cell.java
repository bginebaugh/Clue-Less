// package clueless.server
import java.io.*; 
import java.util.*; 

public class Cell
{
	public int m_x; 
	public int m_y; 
	private ArrayList<Character> m_characterList; 
	private boolean m_isHallway;  
	private String m_name;  
	private Weapon m_weapon; 
	
	public boolean addCharacter(Character character) 
	{  
	    m_characterList.add(character); 
	    return true; 
	
	} 
	
	public boolean removeCharacter(Character character) 
	{ 
		m_characterList.remove(character); 
		return true; 
	} 
	
	public boolean addWeapon(Weapon weapon) 
	{
		m_weapon = weapon; 
		return true; 
	} 

	public boolean removeWeapon() 
	{ 
		m_weapon = null; 
		return true; 
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
	
