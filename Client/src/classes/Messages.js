import { store } from '../../renderer';

import ServerProxy from "./ServerProxy";

export default {

    generateMessageHeader(messageType) {

        let userId = store.getState().User.userId;
        let gameId = store.getState().User.gameId;

        let obj = {
            messageType: messageType,
            userId: userId,
            gameId
        };

        return obj;

    },

    generateMessageEnder() {

        return "\n";

    },

    generateLoginMessage(name) {


        let messageHeader = this.generateMessageHeader("loginMessage");

        let obj = Object.assign({}, messageHeader, { content: { username: name } });

        let messageEnd = this.generateMessageEnder();

        return JSON.stringify(obj) + messageEnd;
    },

    generateJoinGameMessage(gameName, isNew) {
        
        
        let messageHeader = this.generateMessageHeader("joinGame");

        let obj = Object.assign({}, messageHeader, { content: { 
            gameRoomName: gameName,
            isNew: isNew
        }});

        let messageEnd = this.generateMessageEnder();
        
        return JSON.stringify(obj) + messageEnd;
    },

    parseJsonResponseFromServer(incomingMessage) {

        return JSON.parse(incomingMessage);

    },

    incomingMessageHandler(jsonResponse, messageType) {

        switch(messageType) {
            
            case "loginResponse":
                ServerProxy.handleLoginSuccessOrError(jsonResponse);
                break;

            default:
                console.log("Response error :: not a proper messageType ::", messageType);
                break;
        }

    }

}