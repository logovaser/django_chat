/**
 * Created by logov on 28-Apr-17.
 */

import './base.less'
import template from './base.html'
import controller from './ctrl'

export default function message() {
    window.$compileProvider.component('message', {
        bindings: {
            message: '<',
        },
        template,
        controller
    });
}
