package Messages;

public class MessageContainer {
	private MessageHeader m_messageHeader;
	private MessageBase m_messageBase;

	public MessageHeader getMessageHeader() {
		return m_messageHeader;
	}

	public void setMessageHeader(MessageHeader messageHeader) {
		this.m_messageHeader = messageHeader;
	}

	public MessageBase getMessageBase() {
		return m_messageBase;
	}

	public void setMessageBase(MessageBase messageBase) {
		this.m_messageBase = messageBase;
	}

}