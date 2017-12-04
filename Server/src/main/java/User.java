//package clue-less server 

import java.io.*; 
import java.util.*; 

public class User 
{
	public String m_userName;
	public int    m_userId; 
	public String m_userSocket; 
	public Character m_character; 
	public Game m_game; 
	public Hand m_hand; 
	
	public void addCard(Card card)
	{ 
		m_hand.m_cardList.add(card); 
	} 
	
} 