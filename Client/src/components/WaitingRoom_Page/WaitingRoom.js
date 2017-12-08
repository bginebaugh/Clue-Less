import React from 'react';
import "./WaitingRoom.css";
import { Redirect, withRouter } from 'react-router-dom';
import { Jumbotron, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { } from "../../redux_app-state/actions/actions";
import ServerProxy from '../../classes/ServerProxy';

const mapStateToProps = (state = {}) => {
    return {
        isLoggedIn: state.User.isLoggedIn,
        myId: state.User.userId,
        gameOwner: state.User.game.gameOwner,
        characterList: state.WaitingRoom.characterList,
        gameId: state.User.game.id,
        gameRoomName: state.User.game.name,
        gameList: state.Lobby.gameRoomList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
     };
};

export class WaitingRoom extends React.Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
          dropdownValue: ""
        };
        this.currentGame = this.props.gameList.filter((room) => {
            return room.gameId === this.props.gameId
        });
        console.log("this is currentroom", this.props.gameId, this.currentGame, this.props.gameList)
    }
    
    toggle() {
    this.setState({
        dropdownOpen: !this.state.dropdownOpen
    });
    }

    componentDidMount() {
    }

    selectDropdownItem(event) {
        console.log("this is dropdown item", event.target.innerText);
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            dropdownValue: event.target.innerText
        });
    }

    characterList() {
        let { characterList } = this.props;

        return <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
                Select your character
            </DropdownToggle>
            <DropdownMenu>
                {characterList.map((character, i) => {
                    return character.available 
                        ? <DropdownItem key={i} onClick={this.selectDropdownItem.bind(this)}>{character.characterName}</DropdownItem>
                        : <DropdownItem key={i} disabled>{character.characterName}</DropdownItem>
                })}
            </DropdownMenu>
        </Dropdown>
    }

    gameOwnerStartGame() {
        return <Button onClick={this.startGame.bind(this)}>Start Game Because You Own This Piece</Button>
    }

    handleCharacterSubmit(e) {
        
        ServerProxy.selectCharacter(this.state.dropdownValue);

        this.setState({ dropdownValue: "" });

        e.preventDefault();
    
    }

    startGame() {
        let path = '/game';
        this.props.history.push(path);
    }

    render() {
        const { gameOwner, isLoggedIn, myId } = this.props;
        const text = `Choose ${this.state.dropdownValue}`;
        
        if (this.props.isLoggedIn) {
            return (<div className="waiting-room container">
                <div>This page looks awful. Don't worry I'll format. You are in room {this.props.gameRoomName}</div>
                <hr/>
                <div>Waiting for { 6 - this.currentGame.playersInRoom} other players, or for the game owner to hit start. TBU. will work when messages work </div>
                <hr/>
                { gameOwner === myId ? this.gameOwnerStartGame() : null}
                <hr/>
                { this.characterList() }
                <hr/>
                { this.state.dropdownValue ? <Button onClick={this.handleCharacterSubmit.bind(this)}>{text}</Button> : null }
            </div>);
        } else {
            return <Redirect to='/login'/>;
        }
    }

}

WaitingRoom = withRouter(WaitingRoom);

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);