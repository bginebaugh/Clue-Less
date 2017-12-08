import { GameBoard } from "./gameBoard";
import ServerProxy from "./ServerProxy";

export var m_cardList = [];
export var m_currentPosition = []; //get from UI
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
			move (x,y);
		}
		
		if (string = makeSuggestion){
			//check current position is not hallway
			if ( !GameBoard.board [m_currentPosition].m_isHallway){
				makeSuggestion (character, weapon);
			}
			
		}
		
		if (string = makeAccusation){
			makeAccusation (character, weapon);
		}
	},
	
	move (origin,destination) {

		console.log(origin, destination);
		
		//verify selection of x,y on server 
		//message return on validation
		//update map rendering

		ServerProxy.moveCharacter();
	
	},
	
	makeSuggestion (character, weapon, currentRoom) {
		console.log(character, weapon, currentRoom);
		//notify other clients with character and weapon and room in message
		//The client moves the suspected character to the room
		//prompt for accusation at the end
		
	},
	
	makeAccusation (character, weapon, currentRoom) {
		console.log(character, weapon, currentRoom);
		//notify server of the character, weapon, and room
		//server returns boolean from matching with secret envelope
		
	},
	
	addPlayer (userId) {
		
	
	}

}
	
	
	 