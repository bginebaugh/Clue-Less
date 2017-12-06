import java.io.*;
import java.net.*;
import java.util.*;

public class Server {
	static private ArrayList<User> m_userList = null;

	public static void main(String[] args) {
		m_userList = new ArrayList<User>();
		ServerSocket connListener;
		try {
			connListener = new ServerSocket(11000);
		} catch (IOException e) {
			System.out.println(e);
			return;
		}

		boolean systemRunning = true;
		while (systemRunning) {
			System.out.println("Waiting for connection...");

			Socket clientSocket = null;
			try {
				clientSocket = connListener.accept();
			} catch (IOException e) {
				System.out.println(e);
				return;
			}

			UserSocket myUserSocket;
			try {
				myUserSocket = new UserSocket(clientSocket);
				User newUser = new User(myUserSocket);
				newUser.setUserId(m_userList.size());
				newUser.start();
				int numCurrentUsers = m_userList.size();
				m_userList.add(newUser);
				if (m_userList.size() != numCurrentUsers) {
					System.out.println("There are now " + m_userList.size() + " users in the system");
				}
			} catch (IOException e) {
				System.out.println(e);
				return;
			}
		}

		try {
			connListener.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return;
	}
}
