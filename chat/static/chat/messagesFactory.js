/**
 * Created by Artem on 10.07.2017.
 */

export default ['$http', function ($http) {

    let getChatsList = function () {
        return $http.get('/ajax/chats/')
    };

    let getMessages = function () {
        return $http.get('/ajax/messages/')
    };

    return {
        getChatsList,
        getMessages
    }
}]
