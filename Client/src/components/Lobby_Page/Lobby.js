import React from 'react';
import './Lobby.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateLoginStatus } from "../../redux_app-state/actions/actions";

const mapStateToProps = (state = {}) => {
    return {
        isLoggedIn: state.User.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateLoginStatus: (bool) => dispatch(updateLoginStatus(bool))
    };
};

export class Lobby extends React.Component {

    constructor() {
        super();
    }

    logout() {
        this.props.updateLoginStatus(false);
    }

    render() {

        if (this.props.isLoggedIn) {
            return (<div>
                <div className='btn btn-primary cursor-pointer' onClick={this.logout.bind(this)}>Log out</div>
                <div>Hello</div>
            </div>);
        } else {
            return <Redirect to='/login'/>;
        }

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);