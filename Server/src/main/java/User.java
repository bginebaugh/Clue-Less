import java.io.*;

class User extends Thread {
	
	private UserSocket m_userSocket = null;
	private String m_username = null;
	private int m_userId = -1;
	//private Game m_game = null;
	//private Character m_character = null;

	public User(UserSocket userSocket) {
		m_userSocket = userSocket;

		/* TODO
		 * Using the userSocket, get the desired username and verify it
		 * If it is valid, assign a userId
		 */
		m_username = "New User";

		System.out.println("User \"" + m_username + "\" successfully created!");
	}

	public void run() {
		System.out.println("Thread for user \"" + m_username + "\" started!");
		m_userSocket.sendWarningMessage();
	}
}
