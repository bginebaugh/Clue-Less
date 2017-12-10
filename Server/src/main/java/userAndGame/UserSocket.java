package userAndGame;

import java.io.*;
import java.net.*;
import java.nio.charset.*;
import org.json.*;

public class UserSocket {

	private Socket m_socket = null;
	private BufferedReader m_inBuffer = null;
	private InputStreamReader m_input = null;
	private OutputStreamWriter m_output = null;

	public UserSocket(Socket socket) throws IOException {
		m_socket = socket;
		m_output = new OutputStreamWriter(m_socket.getOutputStream(), StandardCharsets.UTF_8);
		m_input = new InputStreamReader(m_socket.getInputStream(), StandardCharsets.UTF_8);
		m_inBuffer = new BufferedReader(m_input);
		System.out.println("Connected to client at address " + m_socket.getRemoteSocketAddress());
	}

	public void sendMessage(String msg) {
		try {
			m_output.write(msg + "@@@");
			m_output.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String waitOnMessage() throws IOException {
		String message = null;
		try {
			message = m_inBuffer.readLine();
		} catch (IOException e) {
			System.out.println("UserSocket failed to waitOnMessage");
			throw e;
		}

		return message;
	}
}
