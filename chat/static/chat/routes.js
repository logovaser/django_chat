/**
 * Created by logov on 05-May-17.
 */

import {regComponentAsync, regModuleAsync} from './asyncLoaders'
import {redirectToLoginIfNotAuth} from './redirects'

export default function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            component: 'homePage',
            resolve: {
                uib: regModuleAsync(require('bundle-loader?lazy!angular-ui-bootstrap')),
                tile: regComponentAsync(require('bundle-loader?lazy!./comp/tile/base')),
                // card: regComponentAsync(require('bundle-loader?lazy!./comp/card/base')),
                eventFired: regComponentAsync(require('bundle-loader?lazy!./modals/eventFired/base')),
                home: regComponentAsync(require('bundle-loader?lazy!./pages/home/base')),
            }
        })
        .state('login', {
            url: '/login/',
            component: 'loginPage',
            resolve: {
                login: regComponentAsync(require('bundle-loader?lazy!./pages/login/base')),
            }
        })
        .state('register', {
            url: '/register/',
            component: 'registerPage',
            resolve: {
                register: regComponentAsync(require('bundle-loader?lazy!./pages/register/base')),
            }
        })
        .state('cabinet', {
            url: '/cabinet/',
            component: 'cabinetPage',
            resolve: {
                auth: redirectToLoginIfNotAuth,
                cabinet: regComponentAsync(require('bundle-loader?lazy!./pages/cabinet/base')),
            }
        })
        .state('cameraTest', {
            url: '/camera_test/',
            component: 'cameraTestPage',
            resolve: {
                camera: regComponentAsync(require('bundle-loader?lazy!./comp/camera/base')),
                cameraTest: regComponentAsync(require('bundle-loader?lazy!./pages/cameraTest/base')),
            }
        })
        .state('mail', {
            url: '/mail/',
            component: 'mailPage',
            resolve: {
                uib: regModuleAsync(require('bundle-loader?lazy!angular-ui-bootstrap')),
                // django_web_chat: regModuleAsync(require('bundle-loader?lazy!django_web_chat')),
                mail: regComponentAsync(require('bundle-loader?lazy!./pages/mail/base')),
            }
        });
}
