import React, { Component } from 'react';

import { Icon, Tabs, WhiteSpace, Badge, Toast } from 'antd-mobile'

import { StickyContainer, Sticky } from 'react-sticky';

import { connect } from 'react-redux';

import Goods from './wineTabs/goods'
import GoodsDetails from './wineTabs/goodsDetails'
import Comment from './wineTabs/comment'
import octicons from 'octicons'

import './index.scss'

function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

class Details extends Component {
    constructor() {
        super()
        this.state = {
            reqData: {
                Id: '',
                UserID: null,
                Signid: null,
                DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
                PhoneVersion: null,
                ClientVersion: '1.0.0.1',
                ClientType: 0,
                ProvinceId: 9
            },
            data: [],
            banner: [],
            tabs: [{
                id: 1,
                title: '商品'
            }, {
                id: 2,
                title: '详情'
            }, {
                id: 3,
                title: '评价'
            }],
            reqComments: {
                proid: 1239,
                pageindex: 1,
                pagesize: 20,
                score: 0
            },
            commentsData: [],
            listAttr: [],
            addCartParams: {
                UserID: null,
                Signid: null,
                DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
                PhoneVersion: null,
                ClientVersion: '1.0.0.1',
                ClientType: 0,
                ProductID: 0,
                Quantity: 1,
                Increase: true,
                BuyType: 0,
                Type: 0,
            },
            Quantity: 1,
            allCount: 0,
            calCount: {
                UserID: null,
                Signid: null,
                DeviceId: 'fb6cd64e-3ab6-4baa-bf2d-c8f9ff6a8cc8',
                PhoneVersion: null,
                ClientVersion: '1.0.0.1',
                ClientType: 0
            }
        }
        this.handelCount.bind(this)
    }
    componentDidMount() {
        let Id = this.props.match.params.id
        if (Id) {
            this.setState({
                reqData: {
                    ...this.state.reqData,
                    Id
                },
                reqComments: {
                    ...this.state.reqComments,
                    proid: Id
                }
            }, () => {
                this.$http.post('http://m.gjw.com/BtCApi/Item/GetProduct', this.state.reqData).then(res => {
                    // console.log(res)
                    if (res.status) {
                        this.setState({
                            data: res.data,
                            banner: res.data.listpic,
                            listAttr: res.data.ListAttr
                        })
                    }
                })
                this.$http.get('BtCApi/Item/GetComment', this.state.reqComments).then(res => {
                    // console.log(res)
                    if (res.status) {
                        this.setState({
                            commentsData: res.data
                        })
                    }
                })
            })
            this.handelCount(this.state.calCount)
        }


    }

    handelCount(req) {
        this.$http.post('BtCApi/ShopCar/CartCount', req).then(res => {
            if (res.status) {
                this.setState({
                    allCount: res.data
                })
            }
        })
    }

    handelAddCart() {
        let { addCartParams, Quantity } = this.state
        this.setState({
            addCartParams: {
                ...addCartParams,
                ProductID: this.props.match.params.id,
                Quantity
            }
        }, () => {
            this.$http.post('BtCApi/ShopCar/AddCart', this.state.addCartParams).then(res => {
                // console.log(res)
                if (res.status) {
                    Toast.success(res.msg, 1, null, true);
                    this.handelCount(this.state.calCount)

                }
            })
        })
    }


    handelQuantity(qty) {
        // console.log(qty)
        this.setState({
            Quantity: qty
        })
    }

    shouldComponentUpdate(props, state) {
        return state.data
    }

    render() {
        let { data, tabs } = this.state
        return (
            <div className="wineDetails">
                <header>
                    <Icon type="left" onTouchStart={() => {
                        this.props.history.goBack()
                    }}></Icon>
                    <p>
                        {data.ProductName}
                    </p>
                </header>
                <div className="wine-tabs">
                    <WhiteSpace />
                    <StickyContainer>
                        <Tabs tabs={tabs}
                            initalPage={'t2'}
                            useOnPan={false}
                            renderTabBar={renderTabBar}
                        >
                            <Goods handelQuantity={this.handelQuantity.bind(this)} data={data} banner={this.state.banner} commentsData={this.state.commentsData} />
                            <GoodsDetails banner={this.state.banner} listAttr={this.state.listAttr} />
                            <Comment commentsData={this.state.commentsData} />
                        </Tabs>
                    </StickyContainer>
                    <WhiteSpace />
                </div>

                <div className="detailsFoot">
                    <a href="javascript:" style={{ width: '15%', height: '100%' }} onTouchStart={() => {
                        this.props.history.push('/')
                    }}>
                        <span dangerouslySetInnerHTML={{ __html: octicons.home.toSVG() }} />
                        <span>首页</span>
                    </a>
                    <a href="javascript:" style={{ width: '15%', height: '100%' }} onTouchStart={() => {
                        this.props.history.push('/cart')
                    }}>
                        <span>
                            <span dangerouslySetInnerHTML={{ __html: octicons.inbox.toSVG() }} />
                            <i>
                                <Badge text={this.state.allCount} />
                            </i>
                        </span>
                        <span>购物车</span>
                    </a>
                    <a href="javascript:"

                        style={{ width: '35%', height: '100%' }}
                        onTouchStart={this.handelAddCart.bind(this)}>加入购物车</a>
                    <a href="javascript:" style={{ width: '35%', height: '100%' }}>立即购买</a>
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        cartsData: state.carts.data
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

    }
}

Details = connect(mapStateToProps, mapDispatchToProps)(Details)

export default Details

