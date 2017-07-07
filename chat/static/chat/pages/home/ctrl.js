/**
 * Created by logov on 17-May-17.
 */

export default ['$scope', '$uibModal', '$document', function ($scope, $uibModal, $document) {

    $scope.hello = 'Hi there';

    // $scope.cards = [
    //     {
    //         id: Math.random(),
    //         heading: 'Post 1',
    //         text: 'The evolution of Angular 1 capabilities has been to enable isolated and encapsulated components, and for good reason. Some of the early applications were highly coupled with the use of $scope and nested controllers. Originally Angular didn’t provide a solution, but now it does.Good components do not expose their internal logic. Thanks to the way they are designed, this is pretty easy to accomplish. However, resist any temptation to abuse components by using $scope unless absolutely necessary, such as emitting/broadcasting events.',
    //         src: '/res/download (1).jpg'
    //     },
    //     {
    //         id: Math.random(),
    //         heading: 'Post 2',
    //         text: 'The evolution of Angular 1 capabilities has been to enable isolated and encapsulated components, and for good reason. Some of the early applications were highly coupled with the use of $scope and nested controllers. Originally Angular didn’t provide a solution, but now it does.Good components do not expose their internal logic. Thanks to the way they are designed, this is pretty easy to accomplish. However, resist any temptation to abuse components by using $scope unless absolutely necessary, such as emitting/broadcasting events.',
    //         src: '/res/download (2).jpg'
    //     },
    //     {
    //         id: Math.random(),
    //         heading: 'Post 3',
    //         text: 'The evolution of Angular 1 capabilities has been to enable isolated and encapsulated components, and for good reason. Some of the early applications were highly coupled with the use of $scope and nested controllers. Originally Angular didn’t provide a solution, but now it does.Good components do not expose their internal logic. Thanks to the way they are designed, this is pretty easy to accomplish. However, resist any temptation to abuse components by using $scope unless absolutely necessary, such as emitting/broadcasting events.',
    //         src: '/res/download (3).jpg'
    //     },
    // ];

    $scope.tiles = [
        {
            id: Math.random(),
            heading: 'Post 1',
            text: 'The evolution of Angular 1 capabilities has been to enable isolated and encapsulated components, and for good reason. Some of the early applications were highly coupled with the use of $scope and nested controllers. Originally Angular didn’t provide a solution, but now it does.Good components do not expose their internal logic. Thanks to the way they are designed, this is pretty easy to accomplish. However, resist any temptation to abuse components by using $scope unless absolutely necessary, such as emitting/broadcasting events.',
        },
        {
            id: Math.random(),
            heading: 'Post 2',
            text: 'The evolution of Angular 1 capabilities has been to enable isolated and encapsulated components, and for good reason. Some of the early applications were highly coupled with the use of $scope and nested controllers. Originally Angular didn’t provide a solution, but now it does.Good components do not expose their internal logic. Thanks to the way they are designed, this is pretty easy to accomplish. However, resist any temptation to abuse components by using $scope unless absolutely necessary, such as emitting/broadcasting events.',
        },
        {
            id: Math.random(),
            heading: 'Post 3',
            text: 'The evolution of Angular 1 capabilities has been to enable isolated and encapsulated components, and for good reason. Some of the early applications were highly coupled with the use of $scope and nested controllers. Originally Angular didn’t provide a solution, but now it does.Good components do not expose their internal logic. Thanks to the way they are designed, this is pretty easy to accomplish. However, resist any temptation to abuse components by using $scope unless absolutely necessary, such as emitting/broadcasting events.',
        },
        {
            id: Math.random(),
            type: 'empty'
        },
    ];

    let dragTileStyle = {
        position: 'fixed',
        zIndex: 1000,
        width: '300px',
        pointerEvents: 'none',
        className: '',
    };
    let regularTileStyle = {};

    $scope.draggedTile = {};

    $scope.onTileDragStart = function (tile, e) {
        e.stopPropagation();

        let $tile = angular.element(e.currentTarget).parent().parent()[0];
        let tileViewportOffset = $tile.getBoundingClientRect();

        let newStyle = angular.copy(dragTileStyle);
        newStyle.left = tileViewportOffset.left + 'px';
        newStyle.top = tileViewportOffset.top + 'px';
        newStyle.width = $tile.clientWidth + 'px';
        newStyle.height = $tile.clientHeight + 'px';

        angular.copy(tile, $scope.draggedTile);
        $scope.draggedTile.style = newStyle;
        angular.copy(getEmptyTile(), tile);
        trimTilesEnd($scope.tiles);

        setTimeout(() => {
            $scope.$apply(() => $scope.animateDragTile(e, newStyle));
        });
    };

    $scope.animateDragTile = function (e, newStyle) {
        newStyle.className = 'transition';
        newStyle.top = `${e.pageY - 150}px`;
        newStyle.left = `${e.pageX - 150}px`;

        setTimeout(() => {
            $scope.$apply(() => $scope.disableDragTileTransition(newStyle));
        }, 300);
    };

    $scope.disableDragTileTransition = function (newStyle) {
        newStyle.className = '';
    };

    $document.on('mousemove', function (e) {
        if (angular.equals({}, $scope.draggedTile) || $scope.draggedTile.busy) return;
        $scope.$apply(() => {
            $scope.draggedTile.style.className = '';
            $scope.draggedTile.style.top = `${e.clientY - 150}px`;
            $scope.draggedTile.style.left = `${e.clientX - 150}px`;
        });
    });

    $scope.tileClick = function (tile, e) {
        if (!angular.equals($scope.draggedTile, {}) && tile.type === 'empty') {

            let $tile = e.currentTarget;
            let tileViewportOffset = $tile.getBoundingClientRect();

            $scope.draggedTile.busy = true;
            $scope.draggedTile.style.className = 'transition';
            $scope.draggedTile.style.left = tileViewportOffset.left + 'px';
            $scope.draggedTile.style.top = tileViewportOffset.top + 'px';
            $scope.draggedTile.style.width = $tile.clientWidth + 'px';
            $scope.draggedTile.style.height = $tile.clientHeight + 'px';

            setTimeout(() => {
                $scope.$apply(() => {
                    $scope.draggedTile.busy = false;
                    angular.copy($scope.draggedTile, tile);
                    tile.style = regularTileStyle;
                    $scope.draggedTile = {};
                    trimTilesEnd($scope.tiles);
                });
            }, 300);
        }
    };

    $scope.equals = angular.equals;

    $scope.$on('testEvent', (e, args) => {
        $uibModal.open({
            component: 'eventFired',
            resolve: {
                heading: () => e.name,
                text: () => args.kek
            }
        });
    });

    function trimTilesEnd(tiles) {
        let len = tiles.length;
        if (tiles[len - 1].type === 'empty') {
            if (tiles[len - 2].type === 'empty') {
                tiles.pop();
                trimTilesEnd(tiles)
            }
        } else {
            tiles.push(getEmptyTile());
        }
    }

    function getEmptyTile() {
        return {
            id: Math.random(),
            heading: '',
            text: '',
            type: 'empty',
            style: {}
        }
    }
}]
