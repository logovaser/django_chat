/**
 * Created by logov on 28-Apr-17.
 */

import './base.less'
import template from './base.html'
import controller from './ctrl'

export default function room() {
    window.$compileProvider.component('room', {template, controller});
}
