/**
 * Created by dan on 29.08.17.
 */

import './default.css'
import { WebSocketBridge } from 'django-channels'

const MODULE_NAME = 'djangoChat';

angular.module(MODULE_NAME, [])
    .directive('chat', ['$http', function ($http) {
        return {
            restrict: 'E',
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'base.html'
            },
            scope: {
                rooms: '=',
                recentMessagesUrl: '@',
            },
            link: function (scope, elem, attrs) {
                // chat websocket connection
                let bridge = new WebSocketBridge();
                bridge.connect('/chat/');

                bridge.socket.onopen = function () {
                    console.log('Connected to chat socket');
                };
                bridge.socket.onclose = function () {
                    scope.awaiting_response = false;
                    console.log('Disconnected from chat socket');
                };

                bridge.listen(function (data) {
                    switch (data.type) {
                        // ====================== error ========================
                        case 'error':
                            scope.awaiting_response = false;
                            alert(data.message);
                            break;

                        // =================== new_message =====================
                        case 'new_message':
                            for (let i = 0; i < scope.rooms.length; i++) {
                                if (scope.rooms[i].id === data.room_id) {
                                    scope.rooms[i].messages.push({
                                        author: data.author,
                                        text: data.text,
                                        dt_created: data.dt_created
                                    });
                                    break;
                                }
                            }
                            scope.$apply();
                            break;

                        // ==================== new_room =======================
                        case 'new_room':
                            scope.awaiting_response = false;
                            let room = {
                                id: data.room.id,
                                name: data.room.name
                            };

                            if (data.switch) {
                                room.status = 'active';
                                scope.active_room = room;
                                scope.init_room(room);
                                for (let i = 0; i < scope.rooms.length; i++) {
                                    scope.rooms[i].status = 'inactive';
                                }
                            }
                            else {
                                room.status = 'inactive';
                            }

                            scope.rooms.push(room);
                            scope.new_room_name = '';
                            scope.$apply();
                            break;

                        // =================== leave_room ======================
                        case 'removed_room':
                            scope.awaiting_response = false;
                            scope.rooms = scope.rooms.filter(function (el) {
                                return el.id !== data.room_id
                            });
                            if (scope.rooms.length > 0) {
                                scope.active_room = scope.rooms[0];
                                scope.active_room.status = 'active';
                            }
                            scope.$apply();
                            break;
                    }
                });

                scope.active_room = null;

                // find active room and save it
                for (let i = 0; i < scope.rooms.length; i++) {
                    if (scope.rooms[i].status === 'active') {
                        scope.active_room = scope.rooms[i];
                        break;
                    }
                }

                scope.send_msg = function () {
                    if (scope.msg) {
                        bridge.send({
                            type: 'send',
                            text: scope.msg,
                            room_id: scope.active_room.id
                        });
                        scope.msg = '';
                    }
                };

                scope.msg_input = function (event) {
                    // send message if pressed enter without shift
                    if (event.keyCode === 13 && !event.shiftKey) {
                        scope.send_msg();
                        event.preventDefault();
                    }
                };

                scope.init_room = function (room) {
                    if (room) {
                        if (!room.messages) {
                            let url = scope.recentMessagesUrl.replace('1234567890', room.id);
                            $http.get(url).then(
                                function success(response) {
                                    if (response.data.type === 'success') {
                                        room.messages = response.data.messages;
                                    }
                                },
                                function error(data) {
                                }
                            );
                        }
                    }
                };

                scope.switch_room = function (room_id) {
                    for (let i = 0; i < scope.rooms.length; i++) {
                        if (scope.rooms[i].id === room_id) {
                            // set old room to inactive
                            if (scope.active_room) {
                                scope.active_room.status = 'inactive';
                            }
                            // save new room and set active status
                            scope.active_room = scope.rooms[i];
                            scope.active_room.status = 'active';
                            scope.init_room(scope.active_room);
                            break;
                        }
                    }
                };

                scope.create_room = function () {
                    if (!scope.awaiting_response) {
                        bridge.send({
                            type: 'create_room',
                            room_name: scope.new_room_name
                        });
                        scope.awaiting_response = true;
                    }
                };

                scope.leave_room = function () {
                    if (!scope.awaiting_response) {
                        bridge.send({
                            type: 'leave_room',
                            room_id: scope.active_room.id
                        });
                        scope.awaiting_response = true;
                    }
                };

                scope.invite_user = function () {
                    bridge.send({
                        type: 'invite_user',
                        room_id: scope.active_room.id,
                        user_id: scope.active_room.user_id_to_invite
                    });
                    scope.active_room.user_id_to_invite = '';
                };

                scope.init_room(scope.active_room);
            }
        }
    }]);

export default MODULE_NAME
