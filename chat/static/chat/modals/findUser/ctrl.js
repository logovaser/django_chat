const RESULT_TYPES = {
    DEFAULT: 'default',
    PENDING: 'pending',
    ADDED: 'added',
};

export default ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    let vm = this;

    $scope.searchPhrase = '';
    $scope.searchResults = [];
    $scope.RESULT_TYPES = RESULT_TYPES;

    $scope.$watch('searchPhrase', function (newVal) {
        if (!newVal) return;

        $http.get(`/ajax/users/find/${newVal}`)
            .then(res => {
                $scope.searchResults = res.data.users.map(username => ({
                    username,
                    type: RESULT_TYPES.DEFAULT
                }))
            });
    });

    $scope.addUser = function (result) {

        vm.resolve.chatService.addUser(result.username).then(res => {
            result.type = RESULT_TYPES.PENDING;

            $timeout(() => {
                result.type = RESULT_TYPES.ADDED;
            }, 2000)
        });
    };

    $scope.removeUser = function (result) {
        result.type = RESULT_TYPES.DEFAULT;
    };

}]
