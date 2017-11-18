import java.io.*;
import java.net.*;

class Server {
	public static void main(String[] args) {
		ServerSocket connListener;
		try {
			connListener = new ServerSocket(11000);
		} catch (IOException e) {
			System.out.println(e);
			return;
		}

		System.out.println("Waiting for connection...");

		Socket clientSocket = null;
		try {
			clientSocket = connListener.accept();
		} catch (IOException e) {
			System.out.println(e);
			return;
		}
		
		UserSocket myUser;
		try {
			myUser = new UserSocket(clientSocket);
		} catch (IOException e) {
			System.out.println(e);
			return;
		}

		myUser.sendWarningMessage();

		return;
	}
}
