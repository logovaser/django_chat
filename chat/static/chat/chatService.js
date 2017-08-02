export default ['$http', class {

    constructor($http) {
        this.$http = $http;
    }

    setChatId(id) {
        this.chatId = id;
    }

    getMessages() {
        return this.$http.get(`/ajax/messages/${this.chatId}/`)
    }

    sendMessage(message) {
        return this.$http.post(`/ajax/messages/send/`, {
            text: message,
            chat_id: this.chatId
        })
    }

    addUser(username) {
        return this.$http.post(`/ajax/chats/add_user/`, {
            username,
            chat_id: this.chatId
        })
    }

    removeUser(username) {

    }

}]
