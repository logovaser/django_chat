/**
 * Created by logov on 16-May-17.
 */

import './base.less'
import controller from './ctrl'
import template from './base.html'

export default function findUserModal() {

    window.$compileProvider.component('findUserModal', {
        bindings: {
            resolve: '<',
        },
        controller,
        template
    })
}
