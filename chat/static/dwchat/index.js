import DWChat from './base'
import Room from './room/base'
import Message from './room/message/base'
import RoomsPanel from './roomsPanel/base'

const moduleName = 'DWChat';

angular.module(moduleName, [])
    .component('dwchat', DWChat)
    .component('dwchatRoom', Room)
    .component('dwchatMessage', Message)
    .component('dwchatRoomsPanel', RoomsPanel);

export default moduleName;
