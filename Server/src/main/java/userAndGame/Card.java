package userAndGame;

import java.io.*;
import java.util.*;

public class Card {

	public static ArrayList<String> SUSPECT_CARDS = new ArrayList<String>(Arrays.asList("Miss Scarlet",
			"Professor Plum", "Mrs. Peacock", "Mr. Green", "Colonel Mustard", "Mrs. White"));
	public static ArrayList<String> WEAPON_CARDS = new ArrayList<String>(
			Arrays.asList("Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench"));
	public static ArrayList<String> ROOM_CARDS = new ArrayList<String>(Arrays.asList("Study", "Hall", "Lounge",
			"Library", "Billiard Room", "Dining Room", "Conservatory", "Ballroom", "Kitchen"));

	public static String getCardName(int cardType, int cardId) {
		String out = "";
		switch (cardType) {
		case SUSPECT:
			out = SUSPECT_CARDS.get(cardId);
			break;
		case WEAPON:
			out = WEAPON_CARDS.get(cardId);
			break;
		case ROOM:
			out = ROOM_CARDS.get(cardId);
			break;
		}

		return out;
	}

	public static int getCardType(String name) {
		int ret = -1;
		if (SUSPECT_CARDS.contains(name)) {
			ret = SUSPECT;
		} else if (WEAPON_CARDS.contains(name)) {
			ret = WEAPON;
		} else {
			ret = ROOM;
		}
		return ret;
	}

	public Card() {
	}

	private int m_type = 0;
	private int m_cardId = 0;

	public final static int SUSPECT = 0;
	public final static int WEAPON = 1;
	public final static int ROOM = 2;

	public static int NUM_ROOMS = ROOM_CARDS.size();
	public static int NUM_WEAPONS = WEAPON_CARDS.size();
	public static int NUM_SUSPECTS = SUSPECT_CARDS.size();
	public static int TOTAL_CARDS = NUM_ROOMS + NUM_WEAPONS + NUM_SUSPECTS;

	public Card(int type, int value) {
		this.m_type = type;
		this.m_cardId = value;
	}

	public int getType() {
		return m_type;
	}

	public int getCardId() {
		return m_cardId;
	}

}