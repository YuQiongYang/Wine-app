import React, { Component } from 'react';
import EmptyCart from './cartStatus/emptyCart'
import CartLists from './cartStatus/cartLists'

import './index.scss'

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            isShow: false,
            getCartParams: {
                UserID: null,
                Signid: null,
                DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
                PhoneVersion: null,
                ClientVersion: '1.0.0.1',
                ClientType: 0,
            },
            data:[],
            total:0,
            qty:0
        }
    }

    componentWillMount() {
        let {isShow,getCartParams} = this.state
        this.$http.post('BtCApi/ShopCar/Cart',getCartParams).then(res=>{
            console.log(res)
            if(res.status){
                if(res.data.CartInfo.length>0){
                    this.setState({
                        isShow:true,
                        data: res.data.CartInfo,
                        total: res.data.Total,
                        qty:res.data.Quantity
                    })
                }
            }
        })
    }

    shouldComponentUpdate(props,state){
        return state.data
    }

    render() {
        return (
            <div className="carts">
                <EmptyCart isShow={this.state.isShow}/>
                <CartLists isShow={this.state.isShow} 
                data={this.state.data} 
                total={this.state.total} 
                qty={this.state.qty}/>
            </div>
        )
    }
}

export default Cart