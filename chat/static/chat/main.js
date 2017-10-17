/**
 * Created by Artem on 06.07.2017.
 */

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
import './base.less'

import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import ngCookies from 'angular-cookies'
import ocLazyLoad from 'oclazyload/dist/modules/ocLazyLoad.core'
import 'oclazyload/dist/modules/ocLazyLoad.loaders.core'

import chatService from './chatService'
import userFactory from './userFactory'
import Routes from './routes'
import httpCsrfInterceptor from './httpCsrfInterceptor'

let app = angular.module('myApp', [uiRouter, ocLazyLoad, ngCookies]);

app.config(['$compileProvider', '$stateProvider', '$locationProvider', '$httpProvider',
    function ($compile, $state, $location, $http) {
        $location.hashPrefix('');
        $location.html5Mode(true);
        $compile.debugInfoEnabled(false);
        window.$compileProvider = $compile;
        Routes($state);
        httpCsrfInterceptor($http);
    }]);

app.service('chatService', chatService);
app.factory('userFactory', userFactory);

app.controller('headerCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {

    $scope.user = userFactory.user;

    $scope.logout = function (e) {
        e.preventDefault();
        userFactory.logout();
    };

}]);
