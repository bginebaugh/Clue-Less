import React from 'react';

export default class Login extends React.Component {

    alertMe() {
        alert("Look at me! Hello NorthRaki! Adding more text. Even more text");
    }

    render() {
        return (<div>
            <div>Clue-Less Login!</div>
            <button onClick={this.alertMe.bind(this)}>click me</button>
        </div>);
    }
  
}