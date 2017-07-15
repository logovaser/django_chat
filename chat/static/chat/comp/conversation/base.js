/**
 * Created by logov on 05-May-17.
 */

import './base.less'
import template from './base.html'
import controller from './ctrl'

export default function conversation() {
    window.$compileProvider.component('conversation', {
        bindings: {
            current: '<'
        },
        template,
        controller
    });
}
