/**
 * Created by logov on 28-Apr-17.
 */

import template from './base.html'
import controller from './ctrl'

export default function loginPage() {
    window.$compileProvider.component('loginPage', {template, controller});
}
