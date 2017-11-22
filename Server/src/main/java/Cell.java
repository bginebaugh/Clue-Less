// package clueless.server
import java.io.*; 
import java.util.*; 

public class Cell
{
	private int m_x; 
	private int m_y; 
	private ArrayList<Character> m_charaterList; 
	private boolean m_isHallway;  
	private String m_name;  
	
	public boolean addCharater(int id) 
	{ 
	    //Need to implement
		return true; 
	
	} 
	
	public boolean addWeapon(int id) 
	{ 
		// Need to implement.
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
	
