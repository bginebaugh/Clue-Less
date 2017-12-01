//package clue-less server 

import java.io.*; 
import java.util.*; 

// Question overall: Do we any additional methods? 
public class Hand
{ 
	private ArrayList<Card> m_cardList; 
	
	// Question: Should we just search for the CardId
	// in the m_cardList? Should we pass the card type? 
	public boolean hasCard(int cardId, int type)
	{ 
		// Need to implement
		return true; 
	} 
	
	// Question: How do we detrmine what the card type is?
	// Store ref. 
	public boolean addCard(int cardId) 
	{ 
		Card CardAdded = new Card(); 
		CardAdded.m_cardId = cardId; 
		//CardAdded.m_type = ??
		m_cardList.add(CardAdded); 
		return true; 
	} 
} 