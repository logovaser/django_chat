/**
 * Created by logov on 16-May-17.
 */

export default ['$scope', function ($scope) {
    let vm = this;

    $scope.chatClick = function (chat) {
        $scope.$emit('chatClick', chat);
    };
}]
