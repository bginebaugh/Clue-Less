import { store } from '../../renderer';
import { addToGameRoomList, deleteFromGameRoomList, updateCharacterList, updateGameRoomList, updateGameStarted, 
    updateMyCards, updateMyCharacter, updatePlayerList
} from "../redux_app-state/actions/actions";
import ServerProxy from "./ServerProxy";

export default {

    generateMessageHeader(messageType) {

        let userId = store.getState().User.userId;
        let gameId = store.getState().GameSession.game.id;

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

    generateSelectCharacterMessage(character) {

        let messageHeader = this.generateMessageHeader("selectCharacter");
        
        let obj = Object.assign({}, messageHeader, { content: { 
            characterSelection: character
        }});

        let messageEnd = this.generateMessageEnder();
        
        return JSON.stringify(obj) + messageEnd;

    },

    generateStartGameMessage() {
        
        let messageHeader = this.generateMessageHeader("startGame");
        
        let obj = Object.assign({}, messageHeader, { content: { 
            gameRoomName: store.getState().GameSession.game.name,
            gameId: store.getState().GameSession.game.id
        }});

        let messageEnd = this.generateMessageEnder();
        
        return JSON.stringify(obj) + messageEnd;

    },

    generateMoveCharacterMessage(destinationCoordinates) {
        
        let messageHeader = this.generateMessageHeader("moveCharacter");
        
        let obj = Object.assign({}, messageHeader, { content: { 
            destinationCoordinates: destinationCoordinates
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

            case "joinGame":
                ServerProxy.handleJoinGameResponse(jsonResponse);
                break;

            // message updating gamelist
            case "gameListForLobby":
                console.log("gameListForLobby")
                let gameRoomList = jsonResponse.content.gameRoomList;
                store.dispatch(updateGameRoomList(gameRoomList));
                break;

            case "playerListForGame":
                console.log("playerListForGame",jsonResponse.content.playerList);
                let playerList = jsonResponse.content.playerList;
                store.dispatch(updatePlayerList(playerList));
                break;

            case "startGameResponse":
                console.log("startGameResponse", jsonResponse);
                store.dispatch(updateGameStarted(true));
                break;
            
            case "characterListUpdate":
                console.log("characterListUpdate", jsonResponse);
                store.dispatch(updateCharacterList(jsonResponse.content.fullCharacterList));
                break;

            case "selectCharacterResponse":
                console.log("selectCharacterResponse", jsonResponse);
                if (jsonResponse && jsonResponse.content && jsonResponse.content.successfulSelection) {
                    store.dispatch(updateMyCharacter(jsonResponse.content.characterName));
                }
                break;

            case "cardAssignments":
                console.log("cardAssignments", jsonResponse);
                if (jsonResponse && jsonResponse.content && jsonResponse.content.cards) {
                    store.dispatch(updateMyCards(jsonResponse.content.cards));
                }
                break;

                
                

            default:
                console.log("Response error :: not a proper messageType ::", messageType);
                break;
        }

    }

}