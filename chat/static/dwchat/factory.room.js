import {WebSocketBridge} from 'django-channels'

export default ['$scope', function ($scope) {

    let _bridge;
    let _eventDisposers = [];

    function initWSConnection() {
        _bridge = new WebSocketBridge();

        _bridge.connect('');

        _bridge.socket.onopen = function () {
            console.log('Connected to chat socket');
        };
        _bridge.socket.onclose = function () {
            console.log('Disconnected from chat socket');
        };

        _bridge.listen(function (data) {
            $scope.$emit(data.type, data);
        });
    }

    function initEventsDisposer() {
        $scope.$on('$destroy', function () {
            _eventDisposers.forEach(dis => dis())
        });
    }

    initWSConnection();
    initEventsDisposer();

    /**
     * public WS methods
     */
    function sendMessage() {
        _bridge.send({
            type: 'send',
            text: '',
        });
    }

    /**
     * Event subscribe
     */
    function $on(e, callback) {
        _eventDisposers.push($scope.$on(e, callback));
    }


    return {sendMessage, $on}
}]
