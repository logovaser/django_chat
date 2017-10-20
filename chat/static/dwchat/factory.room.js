import {WebSocketBridge} from 'django-channels'

export default ['$rootScope', function ($rootScope) {

    let _bridge;
    let _eventDisposers = [];

    /**
     * factory instance
     */
    let self;

    function initWSConnection() {
        _bridge = new WebSocketBridge();

        _bridge.connect('/');

        _bridge.socket.onopen = function () {
            console.log('Connected to chat socket');
        };
        _bridge.socket.onclose = function () {
            console.log('Disconnected from chat socket');
        };

        _bridge.listen(function (data) {
            $rootScope.$emit(data.type, data);
        });
    }

    function initDisposer() {
        $rootScope.$on('$destroy', () => _eventDisposers.forEach(dis => dis()));
    }

    initWSConnection();
    initDisposer();


    /**
     * public WS methods
     */

    /**
     * @param room_id
     */
    function leaveRoom(room_id) {
        _bridge.send({
            type: 'leave_room',
            room_id,
        });
    }

    /**
     * @param room_id
     */
    function joinRoom(room_id) {
        _bridge.send({
            type: 'join_room',
            room_id,
        });
    }

    /**
     * @param text
     * @param room_id
     * @param file_id
     */
    function sendMessage(text, room_id, file_id) {
        _bridge.send({
            type: 'send_message',
            text, room_id, file_id,
        });
    }

    /**
     * @param message_id
     */
    function delete_message(message_id) {
        _bridge.send({
            type: 'delete_message',
            message_id,
        });
    }

    /**
     * @param message_id
     * @param text
     */
    function edit_message(message_id, text) {
        _bridge.send({
            type: 'edit_message',
            message_id, text,
        });
    }

    /**
     * bridge.listen Events subscribe
     * @param e
     * @param callback
     */
    function $on(e, callback) {
        _eventDisposers.push($rootScope.$on(e, callback));

        return self;
    }

    setTimeout(function () {
        $rootScope.$emit('new_room', {});
    }, 5000);
    setTimeout(function () {
        $rootScope.$emit('removed_room', {});
    }, 5000);


    self = {leaveRoom, joinRoom, sendMessage, delete_message, edit_message, $on};

    return self;
}]
