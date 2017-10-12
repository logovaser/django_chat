/**
 * Created by logov on 28-Apr-17.
 */

import {regComponent} from '../../asyncLoaders'

import Chat from './chat/base'

regComponent(Chat);

import './base.less'
import template from './base.html'
import controller from './ctrl'

export default function mailPage() {
    window.$compileProvider.component('mailPage', {template, controller});
}
