/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', function ($scope) {

    $scope.sidePanel = {
        collapsed: true,
    };

    $scope.$on('triggerSidePanel', function () {
        $scope.sidePanel.collapsed = !$scope.sidePanel.collapsed;
    });

}]
