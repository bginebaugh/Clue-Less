import React from 'react';
import "./Game.css";
import classnames from 'classnames';
import { Redirect, withRouter } from 'react-router-dom';
import { Jumbotron, Button, Col, Row, 
    Nav, NavItem, NavLink, TabContent, TabPane, Card, CardTitle, CardText, Modal, 
    ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';
import { connect } from 'react-redux';
import { initiateGameBoard, updateMyPosition, updateMyNeighbors, updateSuggestionCardChoices } from "../../redux_app-state/actions/actions";

import { GameBoard } from "../../classes/gameBoard";
import { Game as GameClass } from "../../classes/game";

import ServerProxy from '../../classes/ServerProxy';

import Cell from "./Cell";

const mapStateToProps = (state = {}) => {
    return {
        isLoggedIn: state.User.isLoggedIn,
        board: state.GameBoard.board,
        myPosition: state.GameBoard.myPosition,
        myNeighbors: state.GameBoard.myNeighbors,
        myCharacter: state.GameSession.myCharacter,
        myCards: state.GameSession.myCards,
        playerTurn: state.GameSession.playerTurn,
        suggestionCardChoices: state.GameSession.suggestionCardChoices
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initiateGameBoard: (gameBoard) => dispatch(initiateGameBoard(gameBoard)),
        updateMyPosition: (cell) => dispatch(updateMyPosition(cell)),
        updateMyNeighbors: (neighbors) => dispatch(updateMyNeighbors(neighbors)),
        updateSuggestionCardChoices: (cards) => dispatch(updateSuggestionCardChoices(cards))
    };
};

export class Game extends React.Component {

    constructor(props) {
        super(props);
    
        this.toggleTabs = this.toggleTabs.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleCharacterWindowDropdown = this.toggleCharacterWindowDropdown.bind(this);
        this.toggleWeaponWindowDropdown = this.toggleWeaponWindowDropdown.bind(this);
        this.suggestCharacter = this.suggestCharacter.bind(this);
        this.suggestWeapon = this.suggestWeapon.bind(this);
        this.accuseCharacter = this.accuseCharacter.bind(this);
        this.accuseWeapon = this.accuseWeapon.bind(this);
        this.endTurn = this.endTurn.bind(this);
        this.toggleSuggestionCardChoicesModal = this.toggleSuggestionCardChoicesModal.bind(this);
        this.state = {
          activeTab: null,
          neighbors: null,
          modal: false,
          suggestionCardChoicesModal: false,
          dropDownCharacterWindowOpen: false,
          dropDownWeaponWindowOpen: false,
          suggestCharacterChoice: null,
          suggestWeaponChoice: null,
          accuseCharacterChoice: null,
          accuseWeaponChoice: null,
          suggestedCardToSend: null
        };
        this.neighbors = null;
    }

    endTurn() {
        ServerProxy.endTurn();
    }
    
    toggleTabs(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
      }

    toggleSuggestionCardChoicesModal() {
        this.setState({
            suggestionCardChoicesModal: !this.state.suggestionCardChoicesModal
          });        
    }

    toggleCharacterWindowDropdown() {
        this.setState({
          dropDownCharacterWindowOpen: !this.state.dropDownCharacterWindowOpen
        });
    }

    toggleWeaponWindowDropdown() {
        this.setState({
          dropDownWeaponWindowOpen: !this.state.dropDownWeaponWindowOpen
        });
    }

    componentDidMount() {        
    }

    componentWillReceiveProps(nextProps) {
        let nullChecker = this.props.myPosition && this.props.board;
        if(nullChecker && this.props.myPosition !== nextProps.myPosition) {
            console.log("myPosdiff", this.props.myPosition, nextProps.myPosition)
            let { myPosition } = nextProps;
            console.log("updating neighbors with position change");
            let myCoordinates = [myPosition.m_x, myPosition.m_y];
            let neighbors = GameBoard.getValidNeighbors(myPosition.m_x, myPosition.m_y, this.props.board);
            this.props.updateMyNeighbors(neighbors);
            console.log("neighbors", neighbors);
        }
        if(nextProps.suggestionCardChoices && nextProps.suggestionCardChoices.length > 0) {
            console.log("you need to show your cards", nextProps.suggestionCardChoices);
            this.setState({ suggestionCardChoicesModal: true });
        }
    }

    renderCells() {
        let board = this.props.board;
        let cells = [];
        let { myNeighbors } = this.props;
        for (let i = 0; i < board.length; i++) {
            let row = board[i];
            if (row) {
                for (let j = 0; j < row.length; j++) {
                    let key = i + "_" + j;
                    let isNeighbor = false;
                    
                    myNeighbors ? myNeighbors.forEach((neighbor) => {
                        if(board[i][j] && board[i][j].m_x === neighbor[0] && board[i][j].m_y === neighbor[1]) {
                            isNeighbor = true;
                        }
                    }) : null;
        
                    let highlightClassName = this.state.activeTab === '1' && isNeighbor
                        ? " highlight "
                        : "";
        
                    let className= board[i][j] === null
                        ? " black-out " 
                        : !board[i][j].m_isHallway
                            ? " room-fill " 
                            : " hallway-fill ";
                    className += board[i][j] && board[i][j].m_isHallway && board[i][j].m_x % 2 > 0 
                        ? " hallway-tall " 
                        : board[i][j] && board[i][j].m_isHallway
                            ? " hallway-wide "
                            : "";
                    className += highlightClassName;
                    let cellPiece = board[i][j];
                    cells.push(<div key={key} className="cell-piece hover01">
                            <div className={(className ? className : "")}>
                                <div className="cell-name">{cellPiece !== null && !cellPiece.m_isHallway ? cellPiece.m_name : ""}</div>
                                <div className="cell-name display-none-till-hover">{cellPiece !== null 
                                    ? `[${cellPiece.m_x},${cellPiece.m_y}]` 
                                    : null }</div>
                                {cellPiece && cellPiece.playerList && cellPiece.playerList.length > 0 
                                    ? cellPiece.playerList.map((player, j) => {
                                        let key = "cell" + i + "_" + j;
                                        return <div key={key}>{player}</div>
                                    })
                                    : null
                                }
                            </div>
                        </div>
                    );
                }
            }
        }
        return <div className="game-board">{cells}</div>;
    }

    generateNavItem(tab, text) {
        return <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === tab })} onClick={() => { this.toggleTabs(tab); }}>
                {text}
            </NavLink>
        </NavItem>;
    }

    renderSelectionAction() {
        return <div>
            <h4>Select An Action</h4>
            <Nav tabs>
                {this.generateNavItem('1','Move Character')}
                {this.generateNavItem('2','Make Suggestion')}
                {this.generateNavItem('3','Make Accusation')}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <div className="margin-top"></div>
                {this.renderMoveCharacterScreen()}
                {this.renderMakeSuggestionScreen()}
                {this.renderMakeAccusationScreen()}
            </TabContent>
        </div>;
    }

    renderMoveCharacterScreen() {
        let { board, myPosition, myNeighbors } = this.props;
        if (this.state.activeTab === '1') {
            console.log("updating neighbors");
            let myCoordinates = [myPosition.m_x, myPosition.m_y];
            let neighbors = GameBoard.getValidNeighbors(myPosition.m_x, myPosition.m_y, this.props.board);
            if (!this.props.myNeighbors) {
                this.props.updateMyNeighbors(neighbors);
            }
            console.log("neighbors", neighbors);
        }

        return <TabPane tabId="1">
            <Row>
                <Col sm="12">
                    <Card body>
                        <CardTitle>Where do you want to go?</CardTitle>
                        { board && myNeighbors ? myNeighbors.map((position, i) => {
                            let onClick = this.moveCharacter.bind(this,position);
                            return <Button key={i} onClick={onClick} className="margin-bottom">{board[position[0]][position[1]].m_name}</Button>
                        }) : null }
                    </Card>
                </Col>
            </Row>
        </TabPane>        
    }

    moveCharacter(destination) {
        GameClass.move(destination);
        this.setState({ activeTab: null });
    }

    dropDownForSuggestionOrAccusation(collection, dropdownType, toggleFunction, callback, stateItem) {    
        return <Dropdown key={"dropdown"+stateItem} isOpen={this.state[dropdownType]} toggle={toggleFunction.bind(this)}>
            <DropdownToggle key={"dropdownToggle"+stateItem} caret>
                {this.state[stateItem] ? this.state[stateItem] : "Please select"}
            </DropdownToggle>
            <DropdownMenu key={"dropdownMenu"+stateItem}>
                {collection.map((character, i) => {
                    let key = stateItem + "_" + i;
                    return <DropdownItem key={key} onClick={callback}>{character}</DropdownItem>
                })}
            </DropdownMenu>
        </Dropdown>
                
    }

    suggestCharacter(event) {
        this.setState({
            suggestCharacterChoice: event.target.innerText
        });        
    }

    suggestWeapon(event) {
        this.setState({
            suggestWeaponChoice: event.target.innerText
        });                
    }

    accuseCharacter(event) {
        console.log("accuseCharacter", event)
        this.setState({
            accuseCharacterChoice: event
        });        
    }

    accuseWeapon(event) {
        console.log("accuseWeapon", event)
        this.setState({
            accuseWeaponChoice: event
        });   
    }

    renderMakeSuggestionScreen() {
        let characters = ["Miss Scarlet", "Professor Plum", "Mrs. Peacock", "Mr. Green", "Colonel Mustard", "Mrs. White"];
        let weapons = ["Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench"];
        let enabled = this.state.suggestCharacterChoice && this.state.suggestWeaponChoice;
            
        return <TabPane tabId="2">
            <Row>
                <Col sm="6">
                    <Card body>
                        <CardTitle className="no-border">Character</CardTitle>
                        { this.dropDownForSuggestionOrAccusation(characters, "dropDownCharacterWindowOpen", 
                            this.toggleCharacterWindowDropdown, this.suggestCharacter.bind(this), "suggestCharacterChoice")}
                    </Card>
                </Col>
                <Col sm="6">
                    <Card body>
                    <CardTitle className="no-border">Weapon</CardTitle>
                        { this.dropDownForSuggestionOrAccusation(weapons, "dropDownWeaponWindowOpen", 
                            this.toggleWeaponWindowDropdown, this.suggestWeapon.bind(this), "suggestWeaponChoice")}
                    </Card>
                </Col>
            </Row>
            <div className="margin-top"></div>
            <Card><Button disabled={!enabled} onClick={this.makeSuggestion.bind(this, this.state.suggestCharacterChoice, this.state.suggestWeaponChoice)}>Make your suggestion</Button></Card>
        </TabPane>        
    }

    makeSuggestion(character, weapon) {
        let currentRoom = this.props.myPosition.m_name;
        GameClass.makeSuggestion(character, weapon, currentRoom);
    }

    renderMakeAccusationScreen() {
        let characters = ["Miss Scarlet", "Professor Plum", "Mrs. Peacock", "Mr. Green", "Colonel Mustard", "Mrs. White"];
        let weapons = ["Candlestick", "Knife", "Lead Pipe", "Revolver", "Rope", "Wrench"];
        let enabled = this.state.accuseCharacterChoice && this.state.accuseWeaponChoice;
        let { accuseCharacterChoice, accuseWeaponChoice } = this.state;
        let { m_name } = this.props.myPosition;
        let message = `${accuseCharacterChoice || "[Character]"} w/a ${accuseWeaponChoice || "[Weapon]"} in the ${m_name}!`;
            
        // {/* { this.dropDownForSuggestionOrAccusation(characters, "dropDownCharacterWindowOpen", 
        //     this.toggleCharacterWindowDropdown, this.accuseCharacter.bind(this), "accuseCharacterChoice")} */}
        // {/* { this.dropDownForSuggestionOrAccusation(weapons, "dropDownWeaponWindowOpen", 
        //     this.toggleWeaponWindowDropdown, this.accuseWeapon.bind(this), "accuseWeaponChoice")} */}
        return <TabPane tabId="3">
            <Row>
                <Col sm="6">
                    <Card body>
                    <CardTitle className="no-border">Character</CardTitle>
                    { characters.map((character, i) => {
                        let onClick = this.accuseCharacter.bind(this, character);
                        return <Button key={i} onClick={onClick} className="margin-bottom-slim">{character}</Button>
                    }) }
                    </Card>
                </Col>
                <Col sm="6">
                    <Card body>
                    <CardTitle className="no-border">Weapon</CardTitle>
                        { weapons.map((character, i) => {
                                let onClick = this.accuseWeapon.bind(this, character);
                                return <Button key={i} onClick={onClick} className="margin-bottom-slim">{character}</Button>
                            }) }
                    </Card>
                </Col>
            </Row>
            <div className="margin-top"></div>
            <Card><Button disabled={!enabled} onClick={this.makeAccusation.bind(this, this.state.accuseCharacterChoice, this.state.accuseWeaponChoice)}>{message}</Button></Card>
        </TabPane>        
    }

    makeAccusation(character, weapon) {
        let currentRoom = this.props.myPosition.m_name;
        GameClass.makeAccusation(character, weapon, currentRoom);
    }

    renderTurnIndicator() {
        let { myCharacter, playerTurn } = this.props;
        let myTurn = myCharacter && playerTurn && myCharacter === playerTurn;
        return myTurn 
            ? <h1>It is your turn</h1>
            : <h1>{playerTurn}'s turn</h1>
    }

    renderCardModel() {
        return (
            <div>
              <Modal style={{ width: '600px' }} isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Your cards</ModalHeader>
                <ModalBody>
                    <Row>
                    {this.props.myCards 
                        ? this.props.myCards.map((card, i) => {
                            return (
                                <Col key={i} sm="4">
                                    <Card className="max-height" inverse style={{ backgroundColor: '#333', borderColor: '#333' }} body outline>
                                        <CardText>{card}</CardText>
                                    </Card>
                                </Col>
                            )
                        }) 
                        : null }
                    </Row>
                </ModalBody>
                <ModalFooter>
                  <Button color="info" onClick={this.toggleModal}>Understood</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
    }

    renderSuggestionCardModel() {
        return (
            <div>
              <Modal style={{ width: '600px' }} isOpen={this.state.suggestionCardChoicesModal} className={this.props.className}>
                <ModalHeader>Your card choices to show the suggestor</ModalHeader>
                <ModalBody>
                    <Row>
                    {this.props.suggestionCardChoices 
                        ? this.props.suggestionCardChoices.map((card, i) => {
                            return (
                                <Col onClick={(event) => this.setState({suggestedCardToSend: event.target.innerText})}key={i} sm="4">
                                    <Card className="max-height" inverse style={{ backgroundColor: '#333', borderColor: '#333' }} body outline>
                                        <CardText>{card}</CardText>
                                    </Card>
                                </Col>
                            )
                        }) 
                        : null }
                    </Row>
                </ModalBody>
                <ModalFooter>
                  <Button color="info" onClick={this.showCard.bind(this)}>{ this.state.suggestedCardToSend ? this.state.suggestedCardToSend : "Send to Suggestor"}</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
    }

    showCard() {
        ServerProxy.showCard(this.state.suggestedCardToSend);
        this.setState({ suggestedCardToSend: null });
        this.props.updateSuggestionCardChoices(null);
        this.toggleSuggestionCardChoicesModal();
    }

    render() {
        const { isLoggedIn, board, myPosition, myCharacter, playerTurn } = this.props;

        let myTurn = myCharacter && playerTurn && myCharacter === playerTurn;

        if (this.props.isLoggedIn) {
            return (<div className="container">
                <Row>
                    <Col xs="7">{ myCharacter ? <h3 className="margin-bottom">Hello, {myCharacter}</h3> : null}</Col>
                    <Col xs="5">
                        <Row className="pull-right">
                            <Button color="secondary" onClick={this.toggleModal}>View your cards</Button>
                            { myTurn ? <Button className="margin-left" color="danger" onClick={this.endTurn}>End your turn</Button> : null }
                            {this.renderCardModel()}
                            {this.renderSuggestionCardModel()}
                        </Row>              
                    </Col>
                </Row>

                <Row>
                    <Col xs="7">{this.props.board ? this.renderCells() : null}</Col>
                    <Col className="stacked-rows" xs="5">
                        <Row className="right-top">{this.renderTurnIndicator()}</Row>              
                        { board && myPosition && myTurn ? <Row className="right-bottom">{this.renderSelectionAction()}</Row> : null }
                    </Col>
                </Row>
            </div>);
        } else {
            return <Redirect to='/login'/>;
        }



    }

}

Game = withRouter(Game);

export default connect(mapStateToProps, mapDispatchToProps)(Game);