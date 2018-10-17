import React, { Component } from 'react';
import AppNav from '../../common/AppNav'
import Lists from '../../common/lists'
import CartHeader from './cartHeader'
import {withRouter} from 'react-router-dom'

class EmptyCart extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            reqData: {
                UserID: null,
                Signid: null,
                DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
                PhoneVersion: null,
                ClientVersion: '1.0.0.1',
                ClientType: 0,
            }
        }
    }

    componentDidMount() {
        this.$http.post('BtCApi/ShopCar/GetEveryoneBuy', this.state.reqData).then(res => {
            if (res.status) {
                this.setState({
                    data: res.data
                })
            }
        })
    }

    shouldComponentUpdate(props,state){
        return state.data
    }

    render() {
        console.log('empty',this.props.isShow)

        return (
            <div className="emptyCarts" style={{display: this.props.isShow ? "none" : "block"}}>
               <CartHeader />
                <div className="cart">
                    <div className="tip">
                        <img src="http://m.gjw.com/images/cart_empty.png" />
                        <h5>您的购物车还没有商品</h5>
                        <p>快去逛逛~</p>
                        <span onTouchStart={() => {
                            this.props.history.push('/')
                        }}>去首页</span>
                    </div>
                    <div className="like">
                        <img src="http://m.gjw.com/images/cart-bg.png" alt="" />
                    </div>
                    <div className="goods">
                        <Lists data={this.state.data}/>
                    </div>
                </div>
                <AppNav />
            </div>
        )
    }
}

export default withRouter(EmptyCart)