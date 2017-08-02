/**
 * Created by logov on 16-May-17.
 */

export default ['chatService', '$uibModal', function (chatService, $uibModal) {

    const MessageStatuses = {
        SENDING: 'sending',
        NOT_READ: 'not-read',
        READ: 'read',
        NOT_SENT: 'not-sent',
    };

    let vm = this;

    vm.$onInit = () => {
        console.log(vm);
        chatService.setChatId(vm.current.id);

        chatService.getMessages().then(res => {
            vm.current.messages = res.data.messages
        });
    };

    vm.newMessage = {};

    vm.sendMessage = function (newMessage) {
        let message = angular.copy(newMessage);
        message.status = MessageStatuses.SENDING;

        chatService.sendMessage(message.text)
            .then(res => {
                message.status = MessageStatuses.NOT_READ;
            }, rej => {
                message.status = MessageStatuses.NOT_SENT;
            });
        vm.current.messages.push(message);
    };

    vm.addUsersClick = function () {
        $uibModal.open({
            component: 'findUserModal',
            size: 'sm',
            resolve: {chatService}
        })
    };
}]
