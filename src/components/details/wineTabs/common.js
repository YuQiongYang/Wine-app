import React, { Component } from 'react';

import './common.scss'

class Common extends Component {
    render() {
        let {data} = this.props
        return (
            <ul className="commentsData">
                {
                    data.map(item => {
                        return (
                            <li key={item.ID}>
                                <img src={item.Fac_Pic ? ` http://img0.gjw.com/face/${item.Fac_Pic}` : "http://m.gjw.com/images/avtar_com.png"}></img>
                                <div>
                                    <p><span>{item.Usr_NiceName}</span><span>{item.Usr_LeveName}</span></p>
                                    <p>{item.Content}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default Common

