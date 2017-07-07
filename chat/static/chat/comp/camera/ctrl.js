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
    $scope.selectedVideoSource = {};

    let videoElement = $element[0].querySelector('video'),
        _stream;

    function gotDevices(deviceInfos) {
        $scope.deviceInfos = deviceInfos.filter(info => {
            if (info.kind === 'videoinput') return true;
        });
    }

    navigator.mediaDevices.enumerateDevices().then(gotDevices);

    function gotStream(stream) {
        if (_stream) _stream.getTracks().forEach(track => track.stop());

        _stream = stream;
        videoElement.srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
    }

    function start() {
        if (_stream) _stream.getTracks().forEach(track => track.stop());

        let videoSource = $scope.selectedVideoSource.deviceId;
        let constraints = {video: {deviceId: videoSource ? {exact: videoSource} : undefined}};
        navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices)
    }

    start();

    $scope.$watch('selectedVideoSource', start);

    $scope.changeSource = function () {
        let newIndex = -1;
        for (let i = 0, len = $scope.deviceInfos.length; i < len; i++) {
            if ($scope.deviceInfos[i].deviceId === $scope.selectedVideoSource.deviceId) {
                newIndex = i + 1;
                break;
            }
        }

        console.log(newIndex);
        if (newIndex > $scope.deviceInfos.length) newIndex = 0;
        console.log(newIndex);
        $scope.selectedVideoSource = $scope.deviceInfos[newIndex];
    };

    vm.$onDestroy = function () {
        videoElement.pause();
        videoElement.src = "";
        videoElement.load();
        _stream.getTracks().forEach(track => track.stop());
    };
}]
