export const updateLoginStatus = (loggedInBool) => {

	console.log(loggedInBool);
	
	return {
		type: "UPDATE_LOGIN_STATUS",
		loggedInBool
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
