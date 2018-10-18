import React, { Component } from 'react';
import { List, Checkbox } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import AppNav from '../../common/AppNav'

import CartHeader from './cartHeader'

const CheckboxItem = Checkbox.CheckboxItem;

class CartLists extends Component {
    constructor() {
        super()
        this.state = {
            isChecked: '',
            reqData: {
                UserID: null,
                Signid: null,
                DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
                PhoneVersion: null,
                ClientVersion: '1.0.0.1',
                ClientType: 0,
            },
            checkProData: {
                ProID: 0,
                State: 0
            },
            addCart: {
                ProductID: 0,
                Quantity: 0,
                Increase: 0,
                BuyType: 0,
                Type: 0,
            },
            cartData:{
                total:0,
                qty:0,
                data:[]
            }
        }

        this.checkPro.bind(this)
        this.cart.bind(this)
        this.addCart.bind(this)
    }

    componentDidMount() {
        this.cart(this.state.reqData)
    }

    onChange(val, el) {
        // console.log(val, el);
        if (el.target.checked) {
            this.setState({
                checkProData: {
                    ...this.state.reqData,
                    ProID: val.ID,
                    state: 1
                }
            }, () => {
                this.checkPro(this.state.checkProData)
            })
        } else {
            this.setState({
                checkProData: {
                    ...this.state.reqData,
                    ProID: val.ID,
                    state: 0
                }
            }, () => {
                this.checkPro(this.state.checkProData)
            })
        }


    }
    async checkPro(checkProData) {
        let res = await this.$http.post('BtCApi/ShopCar/CheckPro', checkProData)
        if (res.status) {
            this.cart(this.state.reqData)
        }
    }

    async cart(reqData) {
        let cartRes = await this.$http.post('BtCApi/ShopCar/Cart', reqData)
        console.log(cartRes)
        if (cartRes.status) {
            this.setState({
                isChecked: cartRes.data.check,
                cartData:{
                    total: cartRes.data.Total,
                    Quantity: cartRes.data.Quantity,
                    data: cartRes.data.CartInfo
                }
            })
        }
    }

    async addCart(addcart) {
        console.log(addcart)
        let addCartRes = await this.$http.post('BtCApi/ShopCar/AddCart', addcart)
        if(addCartRes.status){
            this.cart(this.state.reqData)
        }
    }

    render() {
        return (
            <div style={{ display: this.props.isShow ? "block" : 'none' }} className="CartLists">
                <CartHeader />
                <div>

                    {this.state.cartData.data.map(item => (
                        <CheckboxItem key={item.ID} defaultChecked={item.isCheckToCart} onChange={this.onChange.bind(this, item)}>
                            <List.Item.Brief>
                                <img src={item.Pic}></img>
                                <div className="goodsMsg">
                                    <p>{item.Name}</p>
                                    <div className="price">
                                        <span>￥{item.Price}</span>
                                        <div className="cal">
                                            <span onTouchStart={() => {
                                                if(item.Quantity<=1) return false

                                                this.setState({
                                                    addCart: {
                                                        ...this.state.reqData,
                                                        ...this.state.addCart,
                                                        Quantity: item.Quantity - 1,
                                                        ProductID: item.ID
                                                    }
                                                }, () => {
                                                    // console.log(this.state.addCart)
                                                    this.addCart(this.state.addCart)
                                                })
                                            }}>-</span>
                                            <span>{item.Quantity}</span>
                                            <span onTouchStart={() => {
                                                this.setState({
                                                    addCart: {
                                                        ...this.state.reqData,
                                                        ...this.state.addCart,
                                                        Quantity: item.Quantity + 1,
                                                        ProductID: item.ID
                                                    }
                                                }, () => {
                                                    // console.log(this.state.addCart)
                                                    this.addCart(this.state.addCart)
                                                })
                                            }}>+</span>
                                        </div>
                                    </div>
                                </div>
                            </List.Item.Brief>
                        </CheckboxItem>
                    ))}

                </div>
                <div className="allSelects">
                    <CheckboxItem checked={this.state.isChecked ? true : false} >
                        <span>合计：<i>￥{(this.state.cartData.total).toFixed(2)}</i></span>
                        <span>结算({this.state.cartData.Quantity})</span>
                    </CheckboxItem>
                </div>
                <AppNav />
            </div>
        )
    }
}

export default withRouter(CartLists)