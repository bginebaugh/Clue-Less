import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import Messages.*;

class User extends Thread {
	private GsonBuilder m_gsonBuilder = null;
	private MessageHandler m_handler = null;
	private UserSocket m_userSocket = null;
	private String m_username = null;
	private int m_userId = -1;
	// private Game m_game = null;
	// private Character m_character = null;

	public User(UserSocket userSocket) {
		m_userSocket = userSocket;
		m_handler = new MessageHandler();
		m_gsonBuilder = new GsonBuilder();
	}

	public void run() {
		m_gsonBuilder.setPrettyPrinting();
		Gson gson = m_gsonBuilder.registerTypeAdapter(MessageBase.class, new CluelessDeserializer()).create();

		MessageBase mb = gson.fromJson(m_userSocket.waitOnMessage(), MessageBase.class);
		m_handler.Handle(mb, this);
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

	public <T> void sendMessage(Message<T> msg) {
		Gson gson = m_gsonBuilder.create();
		String out = gson.toJson(msg);
		System.out.println("Attempting to send " + out);
		m_userSocket.sendMessage(out);
	}
}
