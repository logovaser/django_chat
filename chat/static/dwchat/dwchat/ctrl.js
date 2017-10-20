/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', 'chatService', function ($scope, chatService) {

    $scope.sidePanel = {
        collapsed: true,
    };

    $scope.$on('triggerSidePanel', function () {
        $scope.sidePanel.collapsed = !$scope.sidePanel.collapsed;
    });

}]
