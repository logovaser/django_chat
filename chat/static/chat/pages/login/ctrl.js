/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', '$http', '$state', 'userFactory', function ($scope, $http, $state, userFactory) {

    $scope.form = {};

    $scope.submit = function () {
        $http.post('/ajax/login/', $scope.form).then(res => {
            let data = res.data;
            if (data.type === 'success') userFactory.setAuth();
            $state.go('cabinet');
        });
    }

}]
