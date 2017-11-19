export default {

    generateUsernameJsonString(name) {
        let obj = {
            name: name
        }
        return JSON.stringify(obj);
    }
    
}