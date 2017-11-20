import { store } from '../../renderer';

export default {

    generateMessageHeader(messageType, userId, gameId) {

        let obj = {
            messageType: messageType,
            userId: userId,
            gameId
        };

        return obj;

    },

    generateLoginMessage(name) {

        let userId = store.getState().User.userId;
        let gameId = store.getState().User.gameId;

        let messageHeader = this.generateMessageHeader("loginMessage", userId, gameId);

        let obj = Object.assign({}, messageHeader, { message: { username: name } });

        return JSON.stringify(obj);
    }

}