//package clueless.server;

import java.io.*;
import java.net.*;
import java.nio.charset.*;
import org.json.*;

public class UserSocket {
	
	private Socket m_socket = null;
	private InputStreamReader m_input = null;
	private OutputStreamWriter m_output = null;

	public UserSocket(Socket socket) throws IOException {
		m_socket = socket;
		m_output = new OutputStreamWriter(m_socket.getOutputStream(), StandardCharsets.UTF_8);
		m_input = new InputStreamReader(m_socket.getInputStream(), StandardCharsets.UTF_8);
		System.out.println("Connected to client at address " + m_socket.getLocalAddress() + ":" + m_socket.getLocalPort());
	}

	public void sendWarningMessage() {
		JSONObject obj = new JSONObject();
		StringWriter out = new StringWriter();

		obj.put("warning", "two weeks left");
		obj.write(out);

		System.out.println("Sending warning to user");
		String jsonText = out.toString();
		try {
			m_output.write(jsonText, 0, jsonText.length());
			m_output.flush();
			System.out.println("Successfully sent to User: " + jsonText);
		} catch (IOException e) {
			System.out.println(e);
			System.out.println("Failed to send warning to user");
		}
	}

}
