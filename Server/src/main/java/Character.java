import java.io.*; 
import java.util.*; 

public class Character
{
	public Cell m_location = null; 
	public int m_id = -1; 
	public String m_name = null;
	
	public Character(Cell location, int id, String name) { 
		this.m_location = location; 
		this.m_id = id; 
		this.m_name = name; 
	} 
	
	public boolean setLocation(Cell location) { 
		m_location = location; 
		return true; 
	} 
	
	public Cell getLocation() { 
		return m_location; 
	} 
	
	
	 
} 
