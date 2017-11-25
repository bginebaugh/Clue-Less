import React from 'react';
import "./Cell.css"
import { Redirect, withRouter } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { } from "../../redux_app-state/actions/actions";

const mapStateToProps = (state = {}) => {
    return {
        isLoggedIn: state.User.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
     };
};

export class Cell extends React.Component {

    constructor() {
        super();
    }

    login() {
        let path = '/login';
        this.props.history.push(path);
    }

    render() {
        const { className, isLoggedIn } = this.props;
        return (<div className={"cell-piece" + (className ? className : "")}>
            <div className="cell-name">Index:{this.props.index}</div>
            <div className="cell-name">{this.props.name}</div>
        </div>);

    }

}

Cell = withRouter(Cell);

export default connect(mapStateToProps, mapDispatchToProps)(Cell);