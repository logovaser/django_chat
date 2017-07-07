/**
 * Created by logov on 05-May-17.
 */

import {regComponentAsync, regModuleAsync} from './asyncLoaders'
import {redirectToLoginIfNotAuth} from './redirects'

export default function ($compileProvider, $stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            component: 'homePage',
            resolve: {
                uib: regModuleAsync(require('bundle-loader?lazy!angular-ui-bootstrap')),
                tile: regComponentAsync($compileProvider, require('bundle-loader?lazy!./comp/tile/base')),
                // card: regComponentAsync($compileProvider, require('bundle-loader?lazy!./comp/card/base')),
                eventFired: regComponentAsync($compileProvider, require('bundle-loader?lazy!./modals/eventFired/base')),
                home: regComponentAsync($compileProvider, require('bundle-loader?lazy!./pages/home/base')),
            }
        })
        .state('login', {
            url: '/login/',
            component: 'loginPage',
            resolve: {
                login: regComponentAsync($compileProvider, require('bundle-loader?lazy!./pages/login/base')),
            }
        })
        .state('register', {
            url: '/register/',
            component: 'registerPage',
            resolve: {
                register: regComponentAsync($compileProvider, require('bundle-loader?lazy!./pages/register/base')),
            }
        })
        .state('cabinet', {
            url: '/cabinet/',
            component: 'cabinetPage',
            resolve: {
                auth: redirectToLoginIfNotAuth,
                cabinet: regComponentAsync($compileProvider, require('bundle-loader?lazy!./pages/cabinet/base')),
            }
        })
        .state('cameraTest', {
            url: '/camera_test/',
            component: 'cameraTestPage',
            resolve: {
                camera: regComponentAsync($compileProvider, require('bundle-loader?lazy!./comp/camera/base')),
                cameraTest: regComponentAsync($compileProvider, require('bundle-loader?lazy!./pages/cameraTest/base')),
            }
        });
}
