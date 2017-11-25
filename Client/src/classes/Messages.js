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

        let obj = Object.assign({}, messageHeader, { message: { username: name } });

        let messageEnd = this.generateMessageEnder();

        return JSON.stringify(obj) + messageEnd;
    },

    generateJoinGameMessage(gameName, isNew) {
        
        
        let messageHeader = this.generateMessageHeader("joinGame");

        let obj = Object.assign({}, messageHeader, { message: { 
            gameRoomName: gameName,
            isNew: isNew
        }});

        let messageEnd = this.generateMessageEnder();
        
        return JSON.stringify(obj) + messageEnd;
    },

    parseJsonResponseFromServer(incomingMessage) {

        return JSON.parse(incomingMessage);

    },

    incomingMessageHandler(jsonObject, messageType) {

        switch(messageType) {
            
            case "loginMessageResponse":
                ServerProxy.handleLoginSuccessOrError(jsonResponse);

            default:
                console.log("Response error :: not a proper messageType ::", messageType);
                
        }

    }

}