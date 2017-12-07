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

export const updateGame = (game) => {
	
	console.log("game :: ", game);
	
	return {
		type: "UPDATE_GAME",
		game
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