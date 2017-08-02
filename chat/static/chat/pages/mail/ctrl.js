/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', '$http', function ($scope, $http) {

    $scope.chats = [];

    $http.get('/ajax/chats/').then(res => {
        $scope.chats = res.data.chats;
    });

    $scope.newChatClick = function () {
        let chatName = prompt('Enter chat name');

        $http.post('/ajax/chats/create/', {
            name: chatName
        });
    };

    $scope.$on('chatClick', (e, chat) => {

        $scope.chats.forEach(chat => chat.is_active = false);
        chat.is_active = true;

    });

}]
