import React from 'react';
import "./Cell.css"
import { Redirect, withRouter } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { } from "../../redux_app-state/actions/actions";

const mapStateToProps = (state = {}) => {
    return {
        isLoggedIn: state.User.isLoggedIn,
        board: state.GameBoard.board
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
     };
};

export class Cell extends React.Component {

    constructor() {
        super();
        this.state = {
            rerender: false
        }
    }

    login() {
        let path = '/login';
        this.props.history.push(path);
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWIllReceiveProps Cell", this.props.board, nextProps.board)
        if(this.props.board !== nextProps.board) {
            console.log("forcing update in cell");
            this.forceUpdate();
        }
        this.forceUpdate();
        this.setState({ rerender: !this.state.rerender });
    }

    // compon

    // componentDidReceiveProps(nextProps) {
    //     console.log("componentDidReceiveProps Cell", this.props.board, nextProps.board)
    //     if(this.props.board !== nextProps.board) {
    //         console.log("forcing update in cell");
    //         this.forceUpdate();
    //     }
    //     this.forceUpdate();
    // }

    render() {
        const { board, className, isLoggedIn, xCoord, yCoord } = this.props;
        let cellPiece = board[xCoord][yCoord];
        console.log("cellPiece", xCoord, yCoord, board, cellPiece);
        return (<div className="cell-piece hover01">
            <div className={(className ? className : "")}>
                <div className="cell-name">{cellPiece !== null && !cellPiece.m_isHallway ? cellPiece.m_name : ""}</div>
                <div className="cell-name display-none-till-hover">{cellPiece !== null ? `[${cellPiece.m_x},${cellPiece.m_y}]` : null }</div>
                {cellPiece && cellPiece.playerList && cellPiece.playerList.length > 0 
                    ? cellPiece.playerList.map((player, i) => {
                        return <div key={i}>{player}</div>
                    })
                    : null
                }
            </div>
        </div>);
 
    }

}

Cell = withRouter(Cell);

export default connect(mapStateToProps, mapDispatchToProps)(Cell);