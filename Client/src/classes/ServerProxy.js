import Messages from "./Messages";
import net from "net";

export default {
    
    customAddressFromUser(customAddress) {

        let parsedAddress = [];
        let parsedIP = "";
        let parsedPort = "";
        
        if (customAddress && customAddress.length > 0) {
            parsedAddress = customAddress.split(":");
        }

        if (parsedAddress && parsedAddress.length === 2) {
            parsedIP = parsedAddress[0];
            parsedPort = parsedAddress[1];
        }

        return {
            ip      : parsedIP,
            port    : parsedPort
        }

    },

    // fixme: right way to set a timeout on trying to connect
    // cbWithTimeout(timeout, callback) {  
    //     let isTimedOut;
    
    //     setTimeout(function () {
    //         callback();
    //         return;
    //     }, timeout);
    
    //     callback();
    //     return;

    // },

    loginToServer(username, ip, port, cb) {

        let usernameJson = Messages.generateLoginMessage(username);

        // fixme: right way to set a timeout on trying to connect
        // let connectToServer = (port, ip, usernameJson) => {
        //     tcpConnection.connect(port, ip, () => {
        //         console.log('Connected');
        //         tcpConnection.write(usernameJson);
        //     });
        // }

        tcpConnection = new net.Socket();
        
        try {

            console.log(`Attempting to connect to ${ip}:${port}...`);

            // fixme: right way to set a timeout on trying to connect
            // this.cbWithTimeout(5000,() => {
            //     console.log(port, ip, usernameJson);
            //     connectToServer(port, ip, usernameJson);
            // });

            tcpConnection.connect(port, ip, () => {
                cb(false);
                console.log('Connected');
                tcpConnection.write(usernameJson);
            });

            tcpConnection.on('data', (data) => {
                console.log('Received: ' + data);
            });

            tcpConnection.on('error', (error) => {
                cb(false);
                console.log(error);
                alert(`Sorry, connection to ${ip}:${port} is not available right now!!`);
            });

            tcpConnection.on('close', () => {
                cb(false);
                console.log('Connection closed');
            });

        } catch (err) {

            alert("The connection is not available! ::", err);

        }
    }

}