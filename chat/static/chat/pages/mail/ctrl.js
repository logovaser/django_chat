/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', 'dwchatConfig', 'dwchatRoomService', function (vm, dwchatConfig, roomService) {

    dwchatConfig.urlPrefix = '/django_web_chat';
    dwchatConfig.wsUrl = '/web_chat/';

    roomService.getRoomInfo(29).then(res => vm.room = res.data);

}]
