//package clue-less server 

import java.io.*; 
import java.util.*; 

public class Card
{
	public Card() 
	{ 
	} 
	public int m_type = 0; 
	public int m_cardId = 0; 
	
	public static int SUSPECT = 0; 
	public static int WEAPON = 1; 
	public static int ROOM = 2; 
	
	public static int NUM_ROOMS = 9; 
	public static int NUM_WEAPONS = 6; 
	public static int NUM_SUSPECTS = 6; 
	public static int TOTAL_CARDS = NUM_ROOMS + NUM_WEAPONS + NUM_SUSPECTS; 
	
	public Card(int type, int value) 
	{ 
		this.m_type = type; 
		this.m_cardId = value; 
	} 
	
	public int getType() 
	{ 
		return m_type; 
	} 
	
	

} 