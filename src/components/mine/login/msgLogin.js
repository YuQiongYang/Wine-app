import React, { Component } from 'react';
import { Icon, Button, WhiteSpace, InputItem, Toast } from 'antd-mobile'

import './msgLogin.scss'

class msgLogin extends Component {
    constructor() {
        super()

        this.state = {
            hasError: false,
            value: '',
            Verification_Code:'',
            isShow: true,
            reqData: {
                Mob: '',
                type: 1,
                DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
                PhoneVersion: null,
                ClientVersion: '1.0.0.1',
                ClientType: 0,
            }
        }
    }

    onErrorClick() {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }

    onChange(value) {
        // console.log(value)
        // let status = !(/^1[3|4|5|7|8][0-9]{9}$/).test(value);
        // console.log(this.state)
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value:value.replace(/\s/g, '')
        });
    }

    handelMsg() {
        // console.log(this.state.value)
        if (this.state.value) {
            this.setState({
                isShow: false,
                reqData:{
                    ...this.state.reqData,
                    Mob: this.state.value
                }
            },async ()=>{
                let res = await this.$http.post('BtCApi/Login/LoginSms',this.state.reqData)
                // console.log(res)
                if(res.status && res.code==29997){
                    Toast.fail(res.msg,1)
                }else if(res.status && res.code == 30000){
                    Toast.success(res.msg,1)
                }
            })
        } else {
            Toast.fail('请输入手机号', 1);
            this.setState({
                isShow: true
            })
        }
    }
    onChangeMsg(value){
        this.setState({
            Verification_Code: value
        })
    }
    handelLogin(){
        // console.log(this.state.Verification_Code)
        if(this.state.Verification_Code){
            this.setState({
                reqData:{
                    ...this.state.reqData,
                    Mob: this.state.value,
                    Verification_Code:this.state.Verification_Code
                }
            },async ()=>{
               let res = await this.$http.post('BtCApi/Login/APP_LoginByMob',this.state.reqData)
               console.log(res)
               if(res.status){
                    console.log('success')
                    window.localStorage.setItem('user',JSON.stringify({userId:res.data.ID,Signid: res.data.Signid}))
                    this.props.history.push('/mine')
               }else{
                   Toast.fail(res.msg,1)
               }
            })
        }else{
            Toast.fail('验证码不能为空',1)
        }
    }

    render() {
        return (
            <div className="msgLogin">
                <header>
                    <Icon type="left" onTouchStart={() => {
                        this.props.history.goBack()
                    }}></Icon>
                    账号登录
                </header>
                <div className="login-group">
                    <InputItem
                        type="phone"
                        placeholder="请输入手机号码"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick.bind(this)}
                        onChange={this.onChange.bind(this)}
                        value={this.state.value}
                    ></InputItem>
                    <div className="msg">
                    <InputItem
                        type="number"
                        placeholder="请输入短信验证码"
                        onChange={this.onChangeMsg.bind(this)}
                        value={this.state.Verification_Code}
                    ></InputItem>
                        <span onTouchStart={this.handelMsg.bind(this)}>获取验证码</span>
                    </div>
                </div>
                <div className="login">
                    <Button type="primary" 
                    disabled={this.state.isShow}
                    onTouchStart={this.handelLogin.bind(this)}>验证登录</Button><WhiteSpace />
                </div>

            </div>
        )
    }
}

export default msgLogin

