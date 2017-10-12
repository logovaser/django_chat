/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    $scope.context = {};

    $http.get('/ajax/mail/context')
        .then(res => {
            angular.extend($scope.context, res.data);
        })
        .then(res => {
            $scope.loaded = true;
        });

}]
