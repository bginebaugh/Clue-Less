package userAndGame;

import java.io.*;
import java.util.*;

public class Hand {
	private ArrayList<Card> m_cardList = new ArrayList<Card>();

	public boolean hasCard(Card card) {
		return m_cardList.contains(card);
	}

	public boolean hasCard(String name) {
		boolean ret = false;
		for (Card card : m_cardList) {
			if (Card.getCardName(card.getType(), card.getCardId()).equals(name)) {
				ret = true;
				break;
			}
		}
		return ret;
	}

	public boolean addCard(Card card) {
		m_cardList.add(card);
		return true;
	}

	public ArrayList<Card> getCardList() {
		return m_cardList;
	}
}