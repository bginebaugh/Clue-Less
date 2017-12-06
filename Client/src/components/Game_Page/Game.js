import React from 'react';
import "./Game.css";
import { withRouter } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { } from "../../redux_app-state/actions/actions";

import { GameBoard } from "../../classes/gameBoard";

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

    constructor() {
        super();
    }

    componentDidMount() {
        console.log("this is the game board :: ", GameBoard);
    }

    login() {
        let path = '/login';
        this.props.history.push(path);
    }

    renderCells() {
        // const { board } = this.props;
        let board = GameBoard.board;
        let cells = [];
        for (let i = 0; i < 25; i++) {
            console.log(board[i]);
            let className=board[i] === null
                ? " black-out " 
                : !board[i].m_isHallway
                    ? " room-fill " 
                    : " hallway-fill "
            cells.push(<Cell 
                key={i} index={i} 
                cellPiece={board[i]} 
                className={className}
            />);
        }
        return cells;
    }

    render() {
        const { isLoggedIn } = this.props;
        return (<div className="game-board container">
            { this.renderCells()}
        </div>);

    }

}

Game = withRouter(Game);

export default connect(mapStateToProps, mapDispatchToProps)(Game);