import React, { Component } from 'react';
import AppNav from '../common/AppNav'
import './index.scss'

import { Toast } from 'antd-mobile'

class Mine extends Component {
    constructor() {
        super()
        this.state = {
            reqData: {
                UserID: null,
                Signid: null,
                DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
                PhoneVersion: null,
                ClientVersion: '1.0.0.1',
                ClientType: 0,
            },
            userId:'',
            userMsg:''
        }
    }

    async componentDidMount() {
        let user =JSON.parse(window.localStorage.getItem('user'))
        // console.log(userId)
        if (user) {
            this.setState({
               reqData:{
                ...this.state.reqData,
                UserID:user.userId,
                Signid: user.Signid
               },
               userId: user.userId
            }, async () => {
                let res = await this.$http.post('BtCApi/User/GetUserInfo', this.state.reqData)
                // console.log(res)
                if(res.status){
                    this.setState({
                        userMsg: res.data
                    })
                }
            })
        } else {
            let res = await this.$http.post('BtCApi/User/GetUserInfo', this.state.reqData)
            if (!res.status) {
                Toast.offline(res.msg, 2);
            }
        }

    }
    render() {
        return (
            <div className="mine">
                <div className="user">
                    <div className="user-login">
                        <div className="no-login" style={{display: this.state.userId ? "none" : "block"}}>
                            <img src="http://m.gjw.com/images/icon_head_no_login.png" />
                            <span onTouchStart={() => {
                                this.props.history.push('/login')
                            }}>登录/注册></span>
                        </div>
                        <div className="have-user" style={{display: this.state.userId ? "block" : "none"}}>
                            <p>{this.state.userMsg.Name}</p>
                            <p>{this.state.userMsg.LevelName}</p>
                        </div>
                    </div>
                </div>
                <AppNav />
            </div>
        )
    }
}

export default Mine