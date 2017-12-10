import React from 'react';
import "./Game.css";
import classnames from 'classnames';
import { Redirect, withRouter } from 'react-router-dom';
import { Jumbotron, Button, Col, Row, 
    Nav, NavItem, NavLink, TabContent, TabPane, Card, CardTitle, CardText, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import { initiateGameBoard, updateMyPosition, updateMyNeighbors } from "../../redux_app-state/actions/actions";

import { GameBoard } from "../../classes/gameBoard";
import { Game as GameClass } from "../../classes/game";

import Cell from "./Cell";

const mapStateToProps = (state = {}) => {
    return {
        isLoggedIn: state.User.isLoggedIn,
        board: state.GameBoard.board,
        myPosition: state.GameBoard.myPosition,
        myNeighbors: state.GameBoard.myNeighbors,
        myCharacter: state.GameSession.myCharacter,
        myCards: state.GameSession.myCards,
        playerTurn: state.GameSession.playerTurn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initiateGameBoard: (gameBoard) => dispatch(initiateGameBoard(gameBoard)),
        updateMyPosition: (cell) => dispatch(updateMyPosition(cell)),
        updateMyNeighbors: (neighbors) => dispatch(updateMyNeighbors(neighbors))        
    };
};

export class Game extends React.Component {

    constructor(props) {
        super(props);
    
        this.toggleTabs = this.toggleTabs.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
          activeTab: null,
          neighbors: null,
          modal: false,
          suggestion: {
              character: null,
              weapon: null
          },
          accusation: {
              character: null,
              weapon: null
          }
        };
        this.neighbors = null;
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
        console.log("board in componentwillreceiveprops", this.props.board, nextProps.board)
        if(this.props.board !== nextProps.board) {
            console.log("forcing update in game");
            this.forceUpdate();
        }
        this.forceUpdate();
    }

    renderCells() {
        let board = this.props.board;
        console.log("hitting renderCells again", board);
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
                    cells.push(<div className="cell-piece hover01">
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
            <h4 className="margin-top">Select An Action</h4>
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

    dropDownForSuggestionOrAccusation(collection, callback) {    
        return <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
                Select your character
            </DropdownToggle>
            <DropdownMenu>
                {collection.map((character, i) => {
                    return <DropdownItem key={i} onClick={callback}>{character}</DropdownItem>
                })}
            </DropdownMenu>
        </Dropdown>
                
    }

    renderMakeSuggestionScreen() {
        return <TabPane tabId="2">
            <Row>
                <Col sm="6">
                    <Card body>
                        <CardTitle>Character</CardTitle>
                        <CardText>Choose wisely.</CardText>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card body>
                        <CardTitle>Weapon</CardTitle>
                        <CardText>Do you have evidence?</CardText>
                    </Card>
                </Col>
            </Row>
            <div className="margin-top"></div>
            <Card><Button onClick={this.makeSuggestion.bind(this,"Miss. Scarlet", "Axe", "Conservatory")}>Make your suggestion</Button></Card>
        </TabPane>        
    }

    makeSuggestion(character, weapon, currentRoom) {
        GameClass.makeSuggestion(character, weapon, currentRoom);
    }

    renderMakeAccusationScreen() {
        return <TabPane tabId="3">
            <Row>
            <Col sm="6">
                <Card body>
                    <CardTitle>Accuse A Character</CardTitle>
                    <CardText>Choose wisely.</CardText>
                </Card>
            </Col>
            <Col sm="6">
                <Card body>
                    <CardTitle>Choose Your Weapon</CardTitle>
                    <CardText>Are you sure?</CardText>
                </Card>
            </Col>
            </Row>
            <div className="margin-top"></div>
            <Card><Button onClick={this.makeAccusation.bind(this,"Miss. Scarlet", "Axe", "Conservatory")}>Make your accusation. Good luck.</Button></Card>
        </TabPane>       
    }

    makeAccusation(character, weapon, currentRoom) {
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
                            {this.renderCardModel()}
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