import java.io.*;
import java.net.*;

import userAndGame.*;

public class Server {

	public static void main(String[] args) {

		ServerSystem serverSystem = ServerSystem.getInstance();
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
				newUser.start();
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
