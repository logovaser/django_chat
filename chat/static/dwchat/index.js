import ChatService from "./service.chat";
import RoomService from "./service.room";
import RoomFactory from "./factory.room";

import DWChat from './dwchat/base'
import Room from './room/base'
import Message from './message/base'
import RoomsPanel from './roomsPanel/base'

const moduleName = 'DWChat';

angular.module(moduleName, [])
    .service('chatService', ChatService)
    .service('roomService', RoomService)
    .factory('roomFactory', RoomFactory)
    .component('dwchat', DWChat)
    .component('dwchatRoom', Room)
    .component('dwchatMessage', Message)
    .component('dwchatRoomsPanel', RoomsPanel);

export default moduleName;
