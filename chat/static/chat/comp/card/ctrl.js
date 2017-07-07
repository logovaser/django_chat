/**
 * Created by logov on 16-May-17.
 */

export default ['$scope', function ($scope) {
    let vm = this;
        // randomInterval;

    // vm.randomInterval = 0;

    vm.$onInit = () => {
        // randomInterval = $interval(function () {
        //     vm.randomInterval++;
        // }, 500);
    };

    vm.$onDestroy = function () {
        // $interval.cancel(randomInterval);
    };

    $scope.triggerTest = function () {
        $scope.$emit('testEvent', {kek: 'kek'})
    };
}]
