/**
 * Created by logov on 05-May-17.
 */

import './base.less'
import template from './base.html'
import controller from './ctrl'

export default function tile($compileProvider) {

    $compileProvider.component('tile', {
        bindings: {
            heading: '@',
            text: '@',
            color: '@',
            type: '@',
            dragStart: '&',
        },
        template,
        controller
    });
}
