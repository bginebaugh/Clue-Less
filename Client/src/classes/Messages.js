import { store } from '../../renderer';

import ServerProxy from "./ServerProxy";

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

        let messageEnd = this.generateMessageEnder();

        return JSON.stringify(obj) + messageEnd;
    },

    generateMessageEnder() {

        return "\n";

    },

    parseJsonResponseFromServer(incomingMessage) {

        return JSON.parse(incomingMessage);

    },

    incomingMessageHandler(jsonObject, messageType) {

        switch(messageType) {
            
            case "loginMessageResponse":
                ServerProxy.handleLoginSuccessOrError(jsonResponse);

            default:
                console.log("Error :: not a proper messageType ::", messageType);
                
        }

    }

}