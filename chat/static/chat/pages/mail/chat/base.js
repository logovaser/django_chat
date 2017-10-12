/**
 * Created by logov on 28-Apr-17.
 */

import {regComponent} from '../../../asyncLoaders'

import Room from './room/base'
import RoomsPanel from './roomsPanel/base'

regComponent(Room);
regComponent(RoomsPanel);

import './base.less'
import template from './base.html'
import controller from './ctrl'

export default function chat() {
    window.$compileProvider.component('chat', {template, controller});
}
