import java.util.*;

import userAndGame.UserSocket;

import java.io.*;
import java.net.*;

class ConnectionListener implements Runnable {
	private ArrayList<UserSocket> m_userListRef = null;

	public ConnectionListener(ArrayList<UserSocket> userList) {
		m_userListRef = userList;
	
	}

	public void run() {
		ServerSocket connListener;
		try {
			connListener = new ServerSocket(11000);
		} catch (IOException e) {
			System.out.println(e);
			return;
		}

		while (true) {

			System.out.println("Waiting for connection...");

			Socket clientSocket = null;
			try {
				clientSocket = connListener.accept();
				m_userListRef.add(new UserSocket(clientSocket));
				System.out.println("User connected");
				System.out.println("User list size is now " + m_userListRef.size());
				try {
					Thread.sleep(1);
				} catch (InterruptedException e) {
					System.out.println("Apparently you can't do this bullshit");
				}
			} catch (IOException e) {
				System.out.println(e);
				return;
			}
			if (m_userListRef.size() > 0)
			{
				break;
			}
		}
	}
}
