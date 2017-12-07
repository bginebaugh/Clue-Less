import { GameBoard } from "./gameBoard";

export var m_cardList = [];
export var m_currentPosition = position; //get from UI
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
	

var Game = {
	
	m_hand : Hand,
	
	selectAction : function (string) {
	 
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
	
	move : function (x,y) {
		
		//verify selection of x,y on server 
		//message return on validation
		//update map rendering
	
	},
	
	
	makeSuggestion : function (character, weapon) {
		let room = GameBoard.board [m_currentPosition].m_name;
		//notify other clients with character and weapon and room in message
		//The client moves the suspected character to the room
		//prompt for accusation at the end
		
	},
	
	makeAccusation : function (character, weapon) {
		let room = GameBoard.board [m_currentPosition].m_name;
		//notify server of the character, weapon, and room
		//server returns boolean from matching with secret envelope
		
	},
	
	
	
	addPlayer : function (userId) {
		
		
	},
}
	
	
	 