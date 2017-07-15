/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', 'messagesFactory', function ($scope, messagesFactory) {

    $scope.currentChat = null;

    $scope.$on('chatClick', (e, args) => {

        messagesFactory.getMessages().then(res => {
            $scope.currentChat = res.data;
        });


    });

}]
