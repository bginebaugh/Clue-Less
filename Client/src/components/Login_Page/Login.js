import React from 'react';
import './Login.css';
import Settings from '../../Settings';
import { Button, Form, FormGroup, Label, Input,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Messages from '../../classes/Messages';
import ServerProxy from '../../classes/ServerProxy';

export default class Login extends React.Component {

    constructor() {
        super();
        this.customServer = this.customServer.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            showCustomServer: false,
            modal: false
        }
    }
    
    componentDidMount() {
        this.resetIpToDefault();       
    }
    
    resetIpToDefault() {
        this.ip = Settings.serverBaseUrl;
        this.port = Settings.serverPort;
        this.setState({showCustomServer: false});      
    }

    customServer() {

        const { showCustomServer } = this.state;

        return showCustomServer 
            ? <FormGroup>
                <Label for="custom-ip">Enter a Custom IP address and port</Label>
                <Input type="text" name="custom-ip" id="custom-ip" innerRef={node => this.customIp = node} placeholder="Default :: localhost:11000" />
            </FormGroup>
            : null;

    }

    customizeServerToggle() {

        const { showCustomServer } = this.state;

        return showCustomServer 
            ? <div className="text-center">
                <div className="d-block small mt-3 pointer-cursor" onClick={this.resetIpToDefault.bind(this)}>Login to standard server instead</div>
            </div>
            : <div className="text-center">
                <div className="d-block small mt-3 pointer-cursor" onClick={() => this.setState({showCustomServer: true})}>Login to a specific server (You must know the IP address and port)</div>
            </div>;

    }

    renderModal() {
        return <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
            <ModalBody>Attempting to log in to remote server: {this.ip}:{this.port}...</ModalBody>
        </Modal>;
    }

    loginPage() {

        return <div className="container">
            <div className="card card-login mx-auto mt-5">
                <div className="card-header">Login</div>
                <div className="card-body">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup>
                            <Label for="username">Enter a username</Label>
                            <Input type="text" name="username" id="username" innerRef={node => this.username = node} placeholder="Username" />
                        </FormGroup>
                        {this.customServer()}
                        {this.customizeServerToggle()}
                        <hr/>
                        <Button className="btn btn-block pointer-cursor">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>;

    }

    toggleModal(bool) {

        this.setState({
            modal: bool
        });

    }

    handleSubmit(e) {

        let customAddress;

        if (this.customIp && this.customIp.value && this.customIp.value.length > 0) {
            customAddress = ServerProxy.customAddressFromUser(this.customIp.value);
            if (customAddress && customAddress.ip && customAddress.port) {
                this.ip = customAddress.ip;
                this.port = customAddress.port;
            }
        }

        if (this.username && this.username.value && this.username.value.length > 0) {
            console.log("Your username :: ", this.username.value);
            this.toggleModal(true);
            ServerProxy.loginToServer(this.username.value, this.ip, this.port, this.toggleModal);
        } else {
            alert("Please enter a valid username!");
        }

        e.preventDefault();
    
    }

    render() {

        return (<div>
            {this.loginPage()}
            {this.renderModal()}
        </div>);

    }

}
