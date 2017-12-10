// User

export const updateLoginStatus = (loggedInBool) => {

	console.log(loggedInBool);
	
	return {
		type: "UPDATE_LOGIN_STATUS",
		loggedInBool
	}
};

export const updateGameroomStatus = (inGameroomBool) => {
	
		console.log(inGameroomBool);
		
		return {
			type: "UPDATE_GAMEROOM_STATUS",
			inGameroomBool
		}
	};

export const updateUsername = (username) => {
	
	console.log(username);
	
	return {
		type: "UPDATE_USERNAME",
		username
	}
};

export const updateUserId = (userId) => {
	
	console.log(userId);
	
	return {
		type: "UPDATE_USERID",
		userId
	}
};

// GameSession

export const updateGame = (game) => {
	
	console.log("game :: ", game);
	
	return {
		type: "UPDATE_GAME",
		game
	}
};

export const updateSuggestionCardChoices = (suggestionCardChoices) => {
	
	console.log("updateSuggestionCardChoices :: ", suggestionCardChoices);
	
	return {
		type: "UPDATE_SUGGESTION_CARD_CHOICES",
		suggestionCardChoices
	}
};

export const updateMyCharacter = (myCharacter) => {
	
	console.log("myCharacter action :: ", myCharacter);
	
	return {
		type: "UPDATE_MYCHARACTER",
		myCharacter
	}
};

export const updateAlertText = (alertText) => {
	
	console.log("updateAlertText action :: ", alertText);
	
	return {
		type: "UPDATE_ALERT_TEXT",
		alertText
	}
};



export const updateMyCards = (myCards) => {
	
	console.log("myCards action :: ", myCards);
	
	return {
		type: "UPDATE_MYCARDS",
		myCards
	}
};

export const updateGameStarted = (gameStarted) => {
	
	console.log("started game :: ", gameStarted);
	
	return {
		type: "UPDATE_GAMESTARTED",
		gameStarted
	}
};

export const updateReadyToStartGamePlay = (readyToStartGamePlay) => {
	
	console.log("updateReadyToStartGamePlay :: ", readyToStartGamePlay);
	
	return {
		type: "UPDATE_READY_TO_START_GAMEPLAY",
		readyToStartGamePlay
	}
};

export const updatePlayerTurn = (playerTurn) => {
	
	console.log("updatePlayerTurn :: ", playerTurn);
	
	return {
		type: "UPDATE_PLAYERTURN",
		playerTurn
	}
};

// Lobby

export const updateGameRoomList = (gameRoomList) => {
	
	console.log("gameRoomList :: ", gameRoomList);
	
	return {
		type: "UPDATE_GAMEROOMLIST",
		gameRoomList
	}
};

export const addToGameRoomList = (gameRoom) => {
	
	console.log("gameRoomToAdd :: ", gameRoom);
	
	return {
		type: "APPEND_GAMEROOMLIST",
		gameRoom
	}
};

export const deleteFromGameRoomList = (gameRoom) => {
	
	console.log("gameRoomToDelete :: ", gameRoom);
	
	return {
		type: "DELETE_FROM_GAMEROOMLIST",
		gameRoom
	}
};

// Waiting Room

export const updateCharacterList = (characterList) => {
	
	console.log("characterList :: ", characterList);
	
	return {
		type: "UPDATE_CHARACTERLIST",
		characterList
	}
};

export const updatePlayerList = (playersList) => {
	
	console.log("new player list :: ", playersList);
	
	return {
		type: "UPDATE_PLAYERLIST",
		playersList
	}
};

// Game Board

export const initiateGameBoard = (gameBoard) => {
	
	console.log("new game board action :: ", gameBoard);
	
	return {
		type: "UPDATE_GAMEBOARD",
		gameBoard
	}
};

export const updateMyPosition = (myPosition) => {
	
	console.log("my new position action :: ", myPosition);
	
	return {
		type: "UPDATE_MY_POSITION",
		myPosition
	}
};

export const populateCharactersOnBoard = (characterList, me, existingPiece) => {
	
	console.log("action :: updating characters on board :: ", characterList, me, existingPiece);
	
	return {
		type: "POPULATE_CHARACTER_LIST",
		characterList,
		me,
		existingPiece
	}
};

export const updateMyNeighbors = (myNeighbors) => {
	
	console.log("neighbors action :: ", myNeighbors);
	
	return {
		type: "UPDATE_MY_NEIGHBORS",
		myNeighbors
	}
};

