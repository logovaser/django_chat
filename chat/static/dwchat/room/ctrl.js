/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    $scope.context = {};

    $scope.messages = [
        {
            text: 'The first two lines within main() update the x-position of our far and mid sprites. Notice that we move the\n' +
            'far layer to the left by 0.128 pixels while we move the mid layer to the left by 0.64 pixels. To move\n' +
            'something to the left we use a negative value while a positive value moves it to the right. Also notice that\n' +
            'we moved our sprites by a fraction of a pixel. Pixi’s renderer can store and work with positions using\n' +
            'sub-pixel values. This is ideal when you want to nudge things across the screen very slowly.',
            meta: 'sent 12.10.2017',
            attachment: {
                name: 'Image_file_1.jpg',
                size: '1.2 MB',
            },
            author: {
                name: 'John Parker',
            },
            mine: true,
        },
        {
            text: 'things across the screen very slowly.',
            meta: 'sent 12.10.2017',
            author: {
                name: 'Benjamin Buttons',
            },
            mine: false,
        },
        {
            text: 'while we move the mid layer.',
            meta: 'sent 12.10.2017',
            author: {
                name: 'Kelly o\'Nill',
            },
            mine: false,
        },
        {
            meta: 'sent 01.10.2017',
            attachment: {
                name: 'Text_file.docx',
                size: '0.3 MB',
            },
            author: {
                name: 'John Parker',
            },
            mine: true,
        },
    ];

    $http.get('/ajax/mail/context')
        .then(res => {
            angular.extend($scope.context, res.data);
        })
        .then(res => {
            $scope.loaded = true;
        });

}]
