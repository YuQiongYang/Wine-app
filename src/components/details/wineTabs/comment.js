import React, { Component } from 'react';

import Common from './common'

class Comment extends Component{
    render(){
        console.log(this.props.commentsData)
        return(
            <Common data={this.props.commentsData} />
        )
    }
}

export default Comment

