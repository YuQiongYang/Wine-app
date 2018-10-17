import React, { Component } from 'react';
import { List, Checkbox } from 'antd-mobile';
import AppNav from '../../common/AppNav'

import CartHeader from './cartHeader'

const CheckboxItem = Checkbox.CheckboxItem;

class CartLists extends Component {
    constructor() {
        super()
        this.state = {
            isCheaked: true,
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

    async componentDidMount() {
        let res = await this.$http.post('BtCApi/ShopCar/Cart', {
            UserID: null,
            Signid: null,
            DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
            PhoneVersion: null,
            ClientVersion: '1.0.0.1',
            ClientType: 0,
        })
        console.log(res)
    }
    onChange(val, el) {
        console.log(val, el);
        this.setState({
            reqData: {
                ...this.state.reqData,
                ProID: val.ID,
                State: 0
            }
        }, async () => {
            let res = await this.$http.post('BtCApi/ShopCar/CheckPro', this.state.reqData)
            // console.log(res)
            if (res.status) {
                let cartRes = await this.$http.post('BtCApi/ShopCar/Cart', {
                    UserID: null,
                    Signid: null,
                    DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
                    PhoneVersion: null,
                    ClientVersion: '1.0.0.1',
                    ClientType: 0,
                })
                console.log(cartRes)
            }
        })

    }

    render() {
        // console.log(this.props.total)
        return (
            <div style={{ display: this.props.isShow ? "block" : 'none' }} className="CartLists">
                <CartHeader />
                <div>

                    {this.props.data.map(item => (
                        <CheckboxItem key={item.ID} defaultChecked={true} onChange={this.onChange.bind(this, item)}>
                            <List.Item.Brief>
                                <img src={item.Pic}></img>
                                <div className="goodsMsg">
                                    <p>{item.Name}</p>
                                    <div className="price">
                                        <span>￥{item.Price}</span>
                                        <div className="cal">
                                            <span onTouchStart={() => {
                                                // if (goodsNum < 2) {
                                                //     return false
                                                // }
                                                // this.setState({
                                                //     goodsNum: goodsNum - 1
                                                // }, () => {
                                                //     this.props.handelQuantity(this.state.goodsNum)
                                                // })
                                            }}>-</span>
                                            <span>{item.Quantity}</span>
                                            <span onTouchStart={() => {
                                                // if (goodsNum > 19) {
                                                //     return false
                                                // }
                                                // this.setState({
                                                //     goodsNum: goodsNum + 1
                                                // }, () => {
                                                //     this.props.handelQuantity(this.state.goodsNum)
                                                // })
                                            }}>+</span>
                                        </div>
                                    </div>
                                </div>
                            </List.Item.Brief>
                        </CheckboxItem>
                    ))}

                </div>
                <div className="allSelects">
                    <CheckboxItem checked={this.state.isCheaked} >
                        <span>合计：<i>￥{(this.props.total).toFixed(2)}</i></span>
                        <span>结算</span>
                    </CheckboxItem>
                </div>
                <AppNav />
            </div>
        )
    }
}

export default CartLists