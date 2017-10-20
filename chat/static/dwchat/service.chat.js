class ChatService {
    constructor($http) {
        this.$http = $http;
    }

    getRoomsList() {
        return this.$http.get('')
    }

    createRoom() {
        return this.$http.post('', {

        })
    }

    getRoomInfo() {
        return this.$http.get('')
    }

    deleteRoom() {
        return this.$http.delete('')
    }
}

ChatService.$inject = ['$http'];

export default ChatService
