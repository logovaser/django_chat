/**
 * Created by logov on 17-May-17.
 */

export default ['$element', function ($element) {

    let vm = this;

    vm.styles = {
        authorPhoto: {
            'background-image': "url('/static/chat/user_photo_sample.jpg')",
        },
        attachmentPhoto: {
            'background-image': "url('/static/chat/download (3).jpg')",
        },
    };

    vm.$onInit = () => {
        if (vm.message.mine) $element.addClass('django_chat-flex-row-reverse');
    };

}]
