import React from 'react';
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

export class Home extends React.Component {

    constructor() {
        super();
    }

    login() {
        let path = '/login';
        this.props.history.push(path);
    }

    render() {
        const { isLoggedIn } = this.props;
        return (<div className="container">
            <Jumbotron>
                <h1 className="display-3">Wlcm to Clue-Less!</h1>
                <p className="lead">This is an online version of Clue. More description of this game here. </p>
                <hr className="my-2" />
                <p className="lead">
                { !isLoggedIn
                    ? <Button color="warning pointer-cursor" onClick={this.login.bind(this)}>Click here to log in!</Button>
                    : null
                }
                </p>
            </Jumbotron>
        </div>);

    }

}

Home = withRouter(Home);

export default connect(mapStateToProps, mapDispatchToProps)(Home);