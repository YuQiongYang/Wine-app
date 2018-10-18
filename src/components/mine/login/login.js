import React, { Component } from 'react';

import { Icon, Button , WhiteSpace} from 'antd-mobile'

import './login.scss'

class Login extends Component {
    

    render() {
        return (
            <div className="login">
                <header>
                    <Icon type="left" onTouchStart={() => {
                        this.props.history.goBack()
                    }}></Icon>
                    账号登录
                </header>
                <div className="login-group">
                    <input placeholder="用户名/邮箱/手机"/>
                    <input placeholder="密码"/>
                </div>
                <div className="reg">
                    <span>忘记密码</span>
                    <span>注册</span>
                </div>
                <div className="msg-login">
                <Button type="primary" disabled>登录</Button><WhiteSpace />
                <Button type="warning" onTouchStart={()=>{
                    this.props.history.push('/msgLogin')
                }}>短信验证码登录</Button><WhiteSpace />
                </div>
            </div>
        )
    }
}

export default Login

