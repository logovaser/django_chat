/**
 * Created by logov on 12-May-17.
 */

export default ['$scope', '$element', function ($scope, $element) {

    let vm = this;

    vm.$onInit = function () {

        $scope.settings = angular.extend({
            changeSourceBtn: false,
            chooseSourceBtn: true
        }, vm);
    };

    $scope.deviceInfos = [];
    $scope.selectedVideoSource = null;

    let videoElement = $element[0].querySelector('video'),
        _stream;

    function gotDevices(deviceInfos) {
        $scope.deviceInfos = deviceInfos.filter(info => {
            if (info.kind === 'videoinput') return true;
        });
        if ($scope.deviceInfos) $scope.selectedVideoSource = $scope.deviceInfos[0];
    }

    navigator.mediaDevices.enumerateDevices().then(gotDevices);

    function gotStream(stream) {
        if (_stream) _stream.getTracks().forEach(track => track.stop());

        _stream = stream;
        videoElement.srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
    }

    function start(selectedVideoSource) {
        if (_stream) _stream.getTracks().forEach(track => track.stop());
        if (!selectedVideoSource) return;

        let videoSource = selectedVideoSource.deviceId;
        let constraints = {video: {deviceId: videoSource ? {exact: videoSource} : undefined}};
        navigator.mediaDevices.getUserMedia(constraints).then(gotStream)
    }

    start($scope.selectedVideoSource);

    $scope.$watch('selectedVideoSource', start);

    $scope.changeSource = function () {
        let newIndex = $scope.deviceInfos.indexOf($scope.selectedVideoSource);

        if (newIndex < 0) return;
        newIndex++;
        if (newIndex >= $scope.deviceInfos.length) newIndex = 0;
        $scope.selectedVideoSource = $scope.deviceInfos[newIndex];
    };

    vm.$onDestroy = function () {
        videoElement.pause();
        videoElement.src = "";
        videoElement.load();
        _stream.getTracks().forEach(track => track.stop());
    };
}]
