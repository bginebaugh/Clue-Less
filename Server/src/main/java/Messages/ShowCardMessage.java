package Messages;

public class ShowCardMessage extends MessageBase {
	private String card = "";

	public String getCard() {
		return card;
	}

	public void setCard(String card) {
		this.card = card;
	}
}
