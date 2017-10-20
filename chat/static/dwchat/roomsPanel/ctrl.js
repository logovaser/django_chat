/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', 'chatService', 'roomFactory', function ($scope, chatService, roomFactory) {

    roomFactory
        .$on('new_room', function () {

        })
        .$on('removed_room', function () {

        })
        .$on('closed_room', function () {

        })
        .$on('edited_room', function () {

        })
        .$on('error', function () {

        });


    /**
     * test data
     */
    $scope.rooms = [
        {
            name: 'Loany DEV\'s room',
            info: 'Tony: hey there',
        },
        {
            name: 'Helpman DEV\'s room',
            info: 'Adam: nope, it doesn\'t fit here because of some unpredictable situations',
        },
        {
            name: 'My room',
            info: 'kek',
        },
        {
            name: 'Blah blah blah chat with very long name',
            info: 'Tony is typing...',
        },
    ];

}]
