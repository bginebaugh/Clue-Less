package userAndGame;
import java.io.*; 
import java.util.*; 

public class Character
{
	public Cell m_location; 
	public int m_id; 
	public String m_name;
	
	public boolean setLocation(Cell location)
	{ 
		m_location = location; 
		return true; 
	} 
	 
} 
