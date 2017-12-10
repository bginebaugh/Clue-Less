package userAndGame;

import Messages.*;

public class MessageHandler {
	void Handle(MessageContainer messageContainer, User user) {
		ServerSystem serverSystem = ServerSystem.getInstance();
		MessageBase mb = messageContainer.getMessageBase();

		switch (mb.getClass().getSimpleName()) {
		case "LoginMessage":
			LoginMessage loginMsg = (LoginMessage) mb;
			new LoginMessageHandler().Handle(loginMsg, user);
			break;
		case "JoinGameMessage":
			JoinGameMessage joinGameMsg = (JoinGameMessage) mb;
			new JoinGameMessageHandler().Handle(joinGameMsg, user);
			break;
		case "StartGameMessage":
			StartGameMessage startGameMsg = (StartGameMessage) mb;
			new StartGameMessageHandler().Handle(startGameMsg, user);
			break;
		case "SelectCharacterMessage":
			SelectCharacterMessage selectCharacterMsg = (SelectCharacterMessage) mb;
			new SelectCharacterMessageHandler().Handle(selectCharacterMsg, user);
			break;
		case "MoveMessage":
			MoveMessage moveMsg = (MoveMessage) mb;
			new MoveMessageHandler().Handle(moveMsg, user);
			break;
		case "SuggestionMessage":
			SuggestionMessage suggestionMsg = (SuggestionMessage) mb;
			new SuggestionHandler().Handle(suggestionMsg, user);
			break;
		case "ShowCardMessage":
			ShowCardMessage showCardMsg = (ShowCardMessage) mb;
			new ShowCardHandler().Handle(showCardMsg, user);
			break;
		case "AccusationMessage":
			AccusationMessage accusationMsg = (AccusationMessage) mb;
			new AccusationHandler().Handle(accusationMsg, user);
			break;
		default:
			System.out.println("The message type " + mb.getClass().getSimpleName() + " is not yet supported");
			break;
		}
	}
}
