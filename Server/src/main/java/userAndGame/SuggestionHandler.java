package userAndGame;

import java.util.ArrayList;

import Messages.*;

public class SuggestionHandler {
	public void Handle(SuggestionMessage msg, User user) {
		Game game = user.getGame();
		ArrayList<String> cards = new ArrayList<String>();
		cards.add(msg.getCharacter());
		cards.add(msg.getWeapon());
		cards.add(msg.getRoom());

		game.makeSuggestion(user, cards);

		// Now that the suggestion was made, find the first user who has a card
		ArrayList<String> matchingCards = null;
		User userWithCard = game.getFirstUserWithCard(user, cards);
		if (userWithCard != null) {
			// Someone can respond, so lets figure that out
			matchingCards = userWithCard.getMatchingCards(cards);

			// Tell that user they have to pick from a certain set
			SuggestionResponsePrompt srp = new SuggestionResponsePrompt();
			Message<SuggestionResponsePrompt> srpOut = new Message<SuggestionResponsePrompt>();

			srp.setCharacterName(user.getCharacter());
			for (String card : matchingCards) {
				srp.addCard(card);
			}

			srpOut.setMessageType("suggestionResponsePrompt");
			srpOut.setGameId(game.getGameId());
			srpOut.setContent(srp);

			userWithCard.sendMessage(srpOut);
			// This is the end of the road here
			// The rest of the suggestion is handled by ShowCardHandler
		} else {
			// Nobody had any cards, so tell the original user
			ShowCardToUser sctu = new ShowCardToUser();
			Message<ShowCardToUser> sctuOut = new Message<ShowCardToUser>();

			sctu.setCharacterName("");
			sctu.setCard("");
			sctuOut.setMessageType("showCardToUser");
			sctuOut.setGameId(game.getGameId());
			sctuOut.setContent(sctu);
			user.sendMessage(sctuOut);
		}
	}
}
