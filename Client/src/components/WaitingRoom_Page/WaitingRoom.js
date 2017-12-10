import React from 'react';
import "./WaitingRoom.css";
import { Redirect, withRouter } from 'react-router-dom';
import { Jumbotron, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import { } from "../../redux_app-state/actions/actions";
import ServerProxy from '../../classes/ServerProxy';

const mapStateToProps = (state = {}) => {
    console.log(state, state.GameSession, state.GameSession.playersList)
    return {
        isLoggedIn: state.User.isLoggedIn,
        myId: state.User.userId,
        gameOwner: state.GameSession.game.gameOwner,
        characterList: state.WaitingRoom.characterList,
        gameId: state.GameSession.game.id,
        gameRoomName: state.GameSession.game.name,
        gameList: state.Lobby.gameRoomList,
        hasGameStarted: state.GameSession.hasGameStarted,
        playersList: state.GameSession.playersList,
        readyToStartGamePlay: state.GameSession.readyToStartGamePlay,
        myCharacter: state.GameSession.myCharacter
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
          dropdownValue: "",
          modal: this.props.hasGameStarted
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

    componentWillReceiveProps(nextProps) {
        this.setState({ modal: nextProps.hasGameStarted });

        if (this.props.readyToStartGamePlay === false && nextProps.readyToStartGamePlay === true) {
            setTimeout(() => {
                let path = '/game';
                this.props.history.push(path);
            },100);
        }
    }

    selectDropdownItem(event) {
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
        return <Button className="margin-top-big" onClick={this.startGame.bind(this)}>Start This Game That You Own</Button>
    }

    handleCharacterSubmit(e) {
        
        ServerProxy.selectCharacter(this.state.dropdownValue);

        this.setState({ dropdownValue: "" });

        e.preventDefault();
    
    }

    startGame() {
        ServerProxy.startGameAsOwner();
    }

    renderCharacterSelectionModal() {
        const that = this;
        const { dropdownValue } = this.state;
        const text = `Choose ${this.state.dropdownValue}!!`;      
        const message = this.props.myCharacter ? `${this.props.myCharacter} selected. Waiting on others...` : `Game has started... Choose your character`;
        return <Modal isOpen={this.state.modal}>
            <ModalHeader>{message}</ModalHeader>
            { this.props.myCharacter ? null :
                <div><ModalBody>
                { that.characterList() }
                </ModalBody>
                <ModalFooter>
                    { this.state.dropdownValue ? <Button color="primary" onClick={this.handleCharacterSubmit.bind(this)}>{text}</Button> : null }
                </ModalFooter></div>
            }
        </Modal>;
    }

    render() {
        const { gameOwner, isLoggedIn, myId } = this.props;
        
        if (this.props.isLoggedIn) {
            return (<div className="waiting-room container">
                <h1 className="margin-bottom-big">You're in <strong>{this.props.gameRoomName}</strong>. Waiting for other players...</h1>
                <h5 className="margin-bottom-big">
                    {this.props.playersList ? `There are/is ${this.props.playersList.length} player(s) (including yourself) in the room.  ` : ""} 
                    Waiting for the leader to hit start. 
                </h5>
                { gameOwner === myId ? this.gameOwnerStartGame() : null}
                { this.renderCharacterSelectionModal() }
            </div>);
        } else {
            return <Redirect to='/login'/>;
        }
    }

}

WaitingRoom = withRouter(WaitingRoom);

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);