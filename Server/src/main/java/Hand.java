import java.io.*;
import java.util.*;

public class Hand {
	public ArrayList<Card> m_cardList;

	public boolean hasCard(int cardId, int type) {
		for (int i = 0; i < m_cardList.size(); i++) {
			if (m_cardList.get(i).m_cardId == cardId) {
				for (int j = 0; j < m_cardList.size(); j++) {
					if (m_cardList.get(j).m_type == type) {
						return true;
					} else {
						return false;
					}
				}
			} else {
				return false;
			}
		}
		return false;
	}

	public boolean addCard(Card card) {
		m_cardList.add(card);
		return true;
	}
}