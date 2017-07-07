/**
 * Created by Artem on 06.07.2017.
 */

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
import './base.less'

import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import ngCookies from 'angular-cookies'
import ocLazyLoad from 'oclazyload/dist/modules/ocLazyLoad.core'
import 'oclazyload/dist/modules/ocLazyLoad.loaders.core'

import userFactory from './userFactory'
import Routes from './routes'
import httpCsrfInterceptor from './httpCsrfInterceptor'

let app = angular.module('myApp', [uiRouter, ocLazyLoad, ngCookies]);

app.config(['$compileProvider', '$stateProvider', '$locationProvider', '$httpProvider',
    function ($compile, $state, $location, $http) {
        $location.hashPrefix('');
        $location.html5Mode(true);
        $compile.debugInfoEnabled(false);
        Routes($compile, $state);
        httpCsrfInterceptor($http);
    }]);

app.factory('userFactory', userFactory);

app.controller('headerCtrl', ['$scope', function ($scope) {


}]);
