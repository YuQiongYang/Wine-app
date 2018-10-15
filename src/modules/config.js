import {
    Component
} from 'react'

import http from './http/httpclient'
import rem from './rem/rem'

rem()

Component.prototype.$http = http