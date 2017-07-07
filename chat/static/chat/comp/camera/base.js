/**
 * Created by logov on 05-May-17.
 */

import './base.less'
import template from './base.html'
import controller from './ctrl'

export default function camera($compileProvider) {

    $compileProvider.component('camera', {
        bindings: {
            changeSourceBtn: '<',
            chooseSourceBtn: '<'
        },
        template,
        controller
    });
}
