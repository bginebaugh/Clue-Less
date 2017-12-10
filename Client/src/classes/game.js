import { GameBoard } from "./gameBoard";
import ServerProxy from "./ServerProxy";

export var m_cardList = [];
export var m_players = [];
export var m_hand = [];

export var Hand = {

	
	getcardList () {
		return m_cardList;
	},
	
	getCardList () {
		return m_cardList;
	},
	
	setCardList (card) {
		m_cardList.push (card);
	}

}
	
export var Game = {
		
	selectAction (string) {
	 
		if (string  = move) {
			let neighbors = GameBoard.getNeighbors (Player.m_Xpos, Player.m_Ypos);
			// highlight the positions in neighbors and prompt for input in UI
			move (origin, destination) ; //message to server to move

		}
		
		if (string = makeSuggestion){
			//check current position is not hallway
			if ( !GameBoard.board [(Player.m_Xpos*5 + Player.m_Ypos)].m_isHallway){
				//prompt for cards in UI for making selection
				makeSuggestion (character, weapon, GameBoard.board [(Player.m_Xpos*5 + Player.m_Ypos)].m_name); 
				//prompt for make accusation
				if (response == yes){
					makeAccusation (character, weapon, GameBoard.board [(Player.m_Xpos*5 + Player.m_Ypos)].m_name);
				}
			}
			
		}
		
		if (string = makeAccusation){
			if ( !GameBoard.board [(Player.m_Xpos*5 + Player.m_Ypos)].m_isHallway){
				//prompt for cards in UI for making selection
			makeAccusation (character, weapon, GameBoard.board [(Player.m_Xpos*5 + Player.m_Ypos)].m_name );
			}
		}
	},
	
	move (destinationCoordinates) {

		console.log(destinationCoordinates);
		
		//verify selection of x,y on server 
		//message return on validation
		//update map rendering

		ServerProxy.moveCharacter(destinationCoordinates);
	
	},
	
	makeSuggestion (character, weapon, currentRoom) {
		console.log(character, weapon, currentRoom);
		ServerProxy.makeSuggestion(character, weapon, currentRoom);
		
	},
	
	makeAccusation (character, weapon, currentRoom) {
		console.log(character, weapon, currentRoom);
		ServerProxy.makeAccusation(character, weapon, currentRoom);
		
	},
	
	addPlayer (userId) {
		players.push (userId);
		
	}

}
	
	
	 