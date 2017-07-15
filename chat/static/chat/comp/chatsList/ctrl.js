/**
 * Created by logov on 16-May-17.
 */

export default ['$scope', 'messagesFactory', function ($scope, messagesFactory) {
    let vm = this;

    messagesFactory.getChatsList().then(res => {
        vm.chats = res.data.chats;
    });

    $scope.chatClick = function (chat) {
        $scope.$emit('chatClick', chat);
    };

    vm.$onInit = () => {

    };

    vm.$onDestroy = function () {

    };
}]
