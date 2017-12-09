package Messages;

import java.util.ArrayList;

public class CharacterListUpdateMessage extends MessageBase {
	private class CharAvail {
		public String characterName = "";
		public boolean available = false;
	}
	private ArrayList<CharAvail> fullCharacterList = new ArrayList<CharAvail>();
	
	public void addCharacter(String name, boolean avail) {
		CharAvail charAvail = new CharAvail();
		charAvail.characterName = name;
		charAvail.available = avail;
		fullCharacterList.add(charAvail);
	}
}
