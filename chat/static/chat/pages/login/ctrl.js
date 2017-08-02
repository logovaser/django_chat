/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', '$http', 'userFactory', function ($scope, $http, userFactory) {

    $scope.form = {};

    $scope.submit = function () {
        userFactory.login($scope.form, 'cabinet')
    }

}]
