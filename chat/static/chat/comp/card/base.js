/**
 * Created by logov on 05-May-17.
 */

import './base.less'
import template from './base.html'
import controller from './ctrl'

export default function card() {

    window.$compileProvider.component('card', {
        bindings: {
            heading: '@',
            text: '@',
            imgSrc: '@'
        },
        template,
        controller
    });
}
