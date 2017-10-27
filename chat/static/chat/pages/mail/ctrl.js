/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', 'dwchatConfig', function ($scope, dwchatConfig) {

    dwchatConfig.urlPrefix = '/django_web_chat';
    dwchatConfig.wsUrl = '/web_chat/';

}]
