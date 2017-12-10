package userAndGame;

import java.io.*;
import java.util.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import Messages.*;

public class User extends Thread {
	private boolean m_deleteMe = false;
	private GsonBuilder m_gsonBuilder = null;
	private MessageHandler m_handler = null;
	private UserSocket m_userSocket = null;
	private String m_username = null;
	private int m_userId = -1;
	private Game m_game = null;
	private String m_character = "";
	private Hand m_hand = new Hand();

	public User(UserSocket userSocket) {
		m_userSocket = userSocket;
		m_handler = new MessageHandler();
		m_gsonBuilder = new GsonBuilder();
	}

	public void run() {
		m_gsonBuilder.setPrettyPrinting();
		Gson gson = m_gsonBuilder.registerTypeAdapter(MessageContainer.class, new CluelessDeserializer()).create();

		while (!m_deleteMe) {
			try {
				MessageContainer mc = gson.fromJson(m_userSocket.waitOnMessage(), MessageContainer.class);
				m_handler.Handle(mc, this);
			} catch (IOException e) {
				m_deleteMe = true;
			}
		}

		System.out.println("User " + m_userId + ": " + m_username + " is going bye-bye");
	}

	public void setDeleted() {
		m_deleteMe = true;
	}

	public String getUsername() {
		return m_username;
	}

	public void setUsername(String username) {
		m_username = username;
	}

	public int getUserId() {
		return m_userId;
	}

	public void setUserId(int id) {
		m_userId = id;
	}

	public Game getGame() {
		return m_game;
	}

	public void setGame(Game game) {
		m_game = game;
	}

	public void clearGame() {
		m_game = null;
	}

	public String getCharacter() {
		return m_character;
	}

	public void setCharacter(String character) {
		m_character = character;
	}

	public void addCard(Card card) {
		m_hand.addCard(card);
	}

	public ArrayList<Card> getCardsInHand() {
		return m_hand.getCardList();
	}

	public boolean isCardInHand(Card card) {
		return m_hand.hasCard(card);
	}

	public boolean isCardInHand(String name) {
		return m_hand.hasCard(name);
	}

	public ArrayList<String> getMatchingCards(ArrayList<String> cards) {
		ArrayList<String> cardsOut = new ArrayList<String>();
		for (String card : cards) {
			if (m_hand.hasCard(card)) {
				cardsOut.add(card);
			}
		}
		return cardsOut;
	}

	public <T> void sendMessage(Message<T> msg) {
		msg.setUserId(this.getUserId());
		Gson gson = m_gsonBuilder.create();
		String out = gson.toJson(msg);
		System.out.println("Sending this to " + this.getUsername() + ":\n" + out);
		m_userSocket.sendMessage(out);
	}
}
