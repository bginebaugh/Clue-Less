import React from 'react';
import "./Game.css";
import { withRouter } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { } from "../../redux_app-state/actions/actions";

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

    login() {
        let path = '/login';
        this.props.history.push(path);
    }

    renderCells() {
        const { board } = this.props;
        let cells = [];
        for (let i = 0; i < 25; i++) {
            let className=board[i] === "Nothing" 
                ? " black-out " 
                : board[i].substr(0,2) == "Rm"
                    ? " room-fill " 
                    : " hallway-fill "
            cells.push(<Cell 
                key={i} index={i} 
                name={board[i]} 
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