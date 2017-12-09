package Messages;

public class CharacterTurnMessage extends MessageBase {
	private String turn = "";

	public void setTurn(String name) {
		turn = name;
	}
}
