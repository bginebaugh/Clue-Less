import React from 'react';
import "./Game.css";
import classnames from 'classnames';
import { Redirect, withRouter } from 'react-router-dom';
import { Jumbotron, Button, Col, Row, 
    Nav, NavItem, NavLink, TabContent, TabPane, Card, CardTitle, CardText
} from 'reactstrap';
import { connect } from 'react-redux';
import { } from "../../redux_app-state/actions/actions";

import { GameBoard } from "../../classes/gameBoard";
import { Game as GameClass } from "../../classes/game";

import Cell from "./Cell";

const mapStateToProps = (state = {}) => {
    console.log(state.GameBoard);
    return {
        isLoggedIn: state.User.isLoggedIn,
        board: state.GameBoard
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
     };
};

export class Game extends React.Component {

    constructor(props) {
        super(props);
    
        this.toggleTabs = this.toggleTabs.bind(this);
        this.state = {
          activeTab: null
        };
      }
    
      toggleTabs(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    componentDidMount() {
        console.log("this is the game board :: ", GameBoard);
    }

    renderCells() {
        let board = GameBoard.board;
        let cells = [];
        for (let i = 0; i < 25; i++) {
            let className=board[i] === null
                ? " black-out " 
                : !board[i].m_isHallway
                    ? " room-fill " 
                    : " hallway-fill ";
            className += board[i] && board[i].m_isHallway && board[i].m_x % 2 > 0 
                ? " hallway-tall " 
                : board[i] && board[i].m_isHallway
                    ? " hallway-wide "
                    : "";
            cells.push(<Cell 
                key={i} index={i} 
                cellPiece={board[i]} 
                className={className}
            />);
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
        return <TabPane tabId="1">
            <Row>
                <Col sm="12">
                    <Card body>
                        <CardTitle>Um, where do you want to go?</CardTitle>
                        <CardText>Do some stuff</CardText>
                        <Button onClick={this.moveCharacter.bind(this,["Study",[0,0]],["StudyLib",[1,0]])}>Go somewhere</Button>
                    </Card>
                </Col>
            </Row>
        </TabPane>        
    }

    moveCharacter(origin, destination) {
        GameClass.move(origin, destination);
    }

    renderMakeSuggestionScreen() {
        return <TabPane tabId="2">
            <Row>
                <Col sm="6">
                    <Card body>
                        <CardTitle>Suggest A Character</CardTitle>
                        <CardText>Choose wisely.</CardText>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card body>
                        <CardTitle>Suggest A Weapon</CardTitle>
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
        return <h1>It is your turn</h1>;
    }

    render() {
        const { isLoggedIn } = this.props;

        if (this.props.isLoggedIn) {
            return (<div className="container">
                <Row>
                    <Col xs="7">{this.renderCells()}</Col>
                    <Col className="stacked-rows" xs="5">
                        <Row className="right-top">{this.renderTurnIndicator()}</Row>              
                        <Row className="right-bottom">{this.renderSelectionAction()}</Row>
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