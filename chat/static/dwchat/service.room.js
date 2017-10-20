class RoomService {
    constructor($http) {
        this.$http = $http;
    }


    inviteUser() {
        return this.$http.post('', {})
    }

    removeUser() {
        return this.$http.post('', {})
    }

    getUsersList() {
        return this.$http.get('')
    }

    getMessages() {
        return this.$http.get('')
    }

    markAsRead() {
        return this.$http.post('', {})
    }

    uploadFile(blob) {
        return this.$http.post('', {})
    }
}

RoomService.$inject = ['$http'];

export default RoomService
