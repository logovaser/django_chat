/**
 * Created by logov on 05-May-17.
 */

import './base.less'
import template from './base.html'
import controller from './ctrl'

export default function chatsList() {

    window.$compileProvider.component('chatsList', {
        bindings: {},
        template,
        controller
    });
}
