import React from 'react';
import './Lobby.css';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, CardTitle, CardText, Form, FormGroup, Label, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Col,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem
} from 'reactstrap';

import { updateLoginStatus } from "../../redux_app-state/actions/actions";

import ServerProxy from '../../classes/ServerProxy';

import Game from "../Game_Page/Game";

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
        this.toggleExistingRoomDropdown = this.toggleExistingRoomDropdown.bind(this);
        this.selectDropdownItem = this.selectDropdownItem.bind(this);
        this.state = {
            newRoomSelected: null, // if true, new room. if false, show existing list
            dropdownOpen: false,
            dropdownValue: ""
        }
        this.dummyRoomOptions = ["Canhs Room", "Brians Room", "Christina's Room", "Simran's room", 
            "Sam's room", "Canhs Room", "Brians Room", "Christina's Room", "Simran's room", "Sam's room", "Canhs Room", "Brians Room", "Christina's Room", "Simran's room", "Sam's room"]
    }

    toggleExistingRoomDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    selectDropdownItem(event) {
        console.log(event.target.innerText)
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            dropdownValue: event.target.innerText
        });
    }

    renderNewVsExistingGameButtons() {
        let newButtonDisabled = false;
        let existingButtonDisabled = false;
        let { newRoomSelected } = this.state;

        if (newRoomSelected !== null && newRoomSelected === true) {
            newButtonDisabled = true;
            existingButtonDisabled = false;
        } else if (newRoomSelected !== null && newRoomSelected === false) {
            newButtonDisabled = false;
            existingButtonDisabled = true;
        }

        return <Row>
            <Col sm="6">
                <Card body>
                    <Button disabled={newButtonDisabled} onClick={() => this.setState({newRoomSelected: true})}>New Game</Button>
                </Card>
            </Col>
            <Col sm="6">
                <Card body>
                    <Button disabled={existingButtonDisabled} onClick={() => this.setState({newRoomSelected: false})}>Existing Game</Button>
                </Card>
            </Col>
        </Row>;
    }

    renderRoomOptions() {
        const { newRoomSelected } = this.state;
        if ( newRoomSelected !== null && newRoomSelected === true) {
            return <Form onSubmit={this.handleNewRoomSubmit.bind(this)}>
                <FormGroup>
                    <h3>Enter the name of your new game room</h3>
                    <Input type="text" name="new-room" id="new-room" innerRef={node => this.newRoomName = node} />
                    <hr/>
                    <Button className="btn btn-block pointer-cursor">Submit and Join Game</Button>
                </FormGroup>
            </Form>
        } else if ( newRoomSelected !== null && newRoomSelected === false ) {
            return <div><ListGroup>
                <h3>Select one of the existing games below</h3>
                {this.dummyRoomOptions.map((a, i) => {
                    return <ListGroupItem key={i} className="pointer-cursor" onClick={this.selectDropdownItem}>{a}</ListGroupItem>
                })}
            </ListGroup>
            { this.state.dropdownValue ? `You want to join :: ${this.state.dropdownValue}` : null }
            <hr/>
            <Button disabled={this.state.dropdownValue.length === 0} onClick={this.handleExistingRoomSubmit.bind(this)} className="btn btn-block pointer-cursor">Join Game</Button>
            </div>
        }
    }

    handleNewRoomSubmit(e) {
        
        if (this.newRoomName && this.newRoomName.value && this.newRoomName.value.length > 0) {

            console.log("This is the room typed in", this.newRoomName.value);
            ServerProxy.joinGame(this.newRoomName.value, true);
            this.newRoomName.value = "";

            // todo: have this respond to join room successful or not
            let path = '/game';
            this.props.history.push(path);
            
        }

        e.preventDefault();
    
    }

    handleExistingRoomSubmit() {
        console.log("This is the room you wish to join", this.state.dropdownValue);
        if (this.state.dropdownValue && this.state.dropdownValue.length > 0) {
            ServerProxy.joinGame(this.state.dropdownValue, false);
        }
        this.setState({ dropdownValue: "" });

        // todo: have this respond to join room successful or not
        let path = '/game';
        this.props.history.push(path);
    }

    render() {

        if (this.props.isLoggedIn) {
            return (<div className="container">
                { this.renderRoomOptions() }
                <div className="mt-5">
                    <div className="card-header">New or Existing Game</div>
                    {this.renderNewVsExistingGameButtons()}
                </div>
                <hr/>
            </div>);
        } else {
            return <Redirect to='/login'/>;
        }

    }

}

Lobby = withRouter(Lobby);

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);