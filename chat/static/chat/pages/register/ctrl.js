/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', '$http', function ($scope, $http) {

    $scope.form = {};

    $scope.submit = function () {
        $http.post('/ajax/register/', $scope.form);
    }

}]
