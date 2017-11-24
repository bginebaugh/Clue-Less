import java.io.*;
import java.net.*;
import java.util.*;

class Server {
	public static void main(String[] args) {
		ArrayList<User> m_userList = new ArrayList<User>();
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
			} catch (IOException e) {
				System.out.println(e);
				return;
			}

			User newUser = new User(myUserSocket);

			newUser.start();

			int numCurrentUsers = m_userList.size();
			m_userList.add(newUser);
			if (m_userList.size() != numCurrentUsers) {
				System.out.println("There are now " + m_userList.size() + " users in the system");
			}
		}

		return;
	}
}
