import React, { Component } from 'react';

import { Icon } from 'antd-mobile'
import './mask.scss'

class Mask extends Component{
    render(){
        return(
            <div className="mask" style={{display: this.props.isMask? 'block': "none" }}>
                <Icon type="loading">
                </Icon>
            </div>
        )
    }
}

export default Mask

