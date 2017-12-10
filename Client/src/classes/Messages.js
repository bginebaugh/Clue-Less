import { store } from '../../renderer';
import { addToGameRoomList, deleteFromGameRoomList, populateCharactersOnBoard, updateCharacterList, updateGameRoomList, updateGameStarted, 
    updateMyCards, updateMyCharacter, updateMyPosition, updatePlayerTurn, updateReadyToStartGamePlay, updatePlayerList, updateSuggestionCardChoices, updateAlertText
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
        
        let messageHeader = this.generateMessageHeader("move");
        let x = destinationCoordinates[0];
        let y = destinationCoordinates[1];
        console.log("I want to go to ::", x, y);
        
        let obj = Object.assign({}, messageHeader, { content: { 
            row: x,
            col: y
        }});

        let messageEnd = this.generateMessageEnder();
        
        return JSON.stringify(obj) + messageEnd;

    },

    generateMakeSuggestionMessage(character, weapon, room) {
        
        let messageHeader = this.generateMessageHeader("suggest");
        
        let obj = Object.assign({}, messageHeader, { content: { 
            character: character,
            weapon: weapon,
            room: room
        }});

        let messageEnd = this.generateMessageEnder();
        
        return JSON.stringify(obj) + messageEnd;

    },

    generateEndTurnMessage() {
        
        let messageHeader = this.generateMessageHeader("endTurn");
        
        let obj = Object.assign({}, messageHeader, { content: { 
        }});

        let messageEnd = this.generateMessageEnder();
        
        return JSON.stringify(obj) + messageEnd;

    },

    generateMakeAccusationMessage(character, weapon, room) {
        
        let messageHeader = this.generateMessageHeader("accuse");
        
        let obj = Object.assign({}, messageHeader, { content: { 
            character: character,
            weapon: weapon,
            room: room
        }});

        let messageEnd = this.generateMessageEnder();
        
        return JSON.stringify(obj) + messageEnd;

    },

    generateShowCardMessage(card) {
        
        let messageHeader = this.generateMessageHeader("showCard");
        
        let obj = Object.assign({}, messageHeader, { content: { 
            card: card
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

                    //then start game... if cards will be dispatched
                    store.dispatch(updateReadyToStartGamePlay(true));
                }
                break;

            case "gameBoardState":
                console.log("gameBoardState", jsonResponse);
                if (jsonResponse && jsonResponse.content && jsonResponse.content.board) {
                    store.dispatch(populateCharactersOnBoard(jsonResponse.content.board, 
                        store.getState().GameSession.myCharacter,
                        store.getState().GameBoard.myPosition
                    ));

                    //also need to update my position
                    let board = store.getState().GameBoard.board;
                    console.log("gameBoardState :: board", board)
                    let myCharacter = store.getState().GameSession.myCharacter;
                    console.log("gameBoardState :: myCharacter", myCharacter)
                    let boardPieces = jsonResponse.content.board;
                    console.log("gameBoardState :: boardPieces", boardPieces)
                    let myPiece = boardPieces.filter((piece) => { return piece.characters.indexOf(myCharacter) > -1 });
                    console.log("gameBoardState :: myPiece", myPiece)
                    if (myPiece && myPiece.length > 0) {
                        let x = myPiece[0].row;
                        let y = myPiece[0].col;
    
                        console.log("my board piece", board[x][y]);
                        store.dispatch(updateMyPosition(board[x][y]));
                    }
                }
                break;

            case "characterTurn":
                console.log("characterTurn", jsonResponse);
                if (jsonResponse && jsonResponse.content && jsonResponse.content.turn) {
                    store.dispatch(updatePlayerTurn(jsonResponse.content.turn));
                }
                break;                
                
            case "moveResponse":
                console.log("moveResponse", jsonResponse);
                if (jsonResponse && jsonResponse.content && jsonResponse.content.valid && jsonResponse.content.characterName) {
                    let message = `Moving ${jsonResponse.content.characterName} to ${jsonResponse.content.row}, ${jsonResponse.content.col}`;
                    store.dispatch(updateAlertText(message));
                    console.log(message);
                }
                break;  

            case "suggestionBroadcast":
                console.log("suggestionBroadcast", jsonResponse);
                let characterName1 = jsonResponse.content.characterName;
                let character1 = jsonResponse.content.character;
                let weapon1 = jsonResponse.content.weapon;
                let room1 = jsonResponse.content.room;
                let message1 = `${characterName1} suggested ${character1} obliterated the victim with a ${weapon1} in the ${room1}`;
                
                store.dispatch(updateAlertText(message1));
                console.log(message1);
                break;

            case "accusationBroadcast":
                console.log("accusationBroadcast", jsonResponse);
                let characterName2 = jsonResponse.content.characterName;
                let character2 = jsonResponse.content.character;
                let weapon2 = jsonResponse.content.weapon;
                let room2 = jsonResponse.content.room;
                let valid2 = jsonResponse.content.valid;
                let message2 = `${characterName2} ACCUSED ${character2} OF destroying the victim with a ${weapon2} in the ${room2}`;
                store.dispatch(updateAlertText(message2));

                if (valid2) {
                    setTimeout(() => {
                        store.dispatch(updateAlertText(`The accusation was right! Game over. ${characterName2} wins!`));
                    }, 2000);
                }
                console.log(message2);                
                break;

            case "suggestionResponsePrompt":
                console.log("suggestionResponsePrompt", jsonResponse);
                let characterName = jsonResponse.content.characterName;
                let cardChoices = jsonResponse.content.cardChoices;
                console.log(`${characterName} and ${cardChoices}`);
                if (cardChoices && cardChoices.length > 0) {
                    store.dispatch(updateSuggestionCardChoices(cardChoices));
                }
                break;

            case "showCardToUser":
                console.log("showCardToUser", jsonResponse);
                let characterName4 = jsonResponse.content.characterName;
                let card4 = jsonResponse.content.card;
                console.log(`${characterName} and ${cardChoices}`);
                let message4 = `${characterName4} is showing you this card :: ${card4}`;
                if (characterName4 && card4) {
                    store.dispatch(updateAlertText(message4));
                }
                break;

            default:
                console.log("Response error :: not a proper messageType ::", messageType);
                break;
        }

    }

}