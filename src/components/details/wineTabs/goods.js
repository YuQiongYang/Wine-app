import React, { Component } from 'react';
import CommonPerson from './common'

import { Icon, Carousel, WingBlank, List, Stepper, Range } from 'antd-mobile';

const Item = List.Item;


class Goods extends Component {
    constructor() {
        super()
        this.state = {
            imgHeight: 176,
            goodsNum: 1,
            isStatus: true
        }
    }
    shouldComponentUpdate(props) {
        return props.data
    }
    render() {
        let { data ,commentsData } = this.props
        let { goodsNum, isStatus } = this.state
        return (
            <div className="tab-goods">
                <div className="calousel">
                    <WingBlank>
                        <Carousel
                            autoplay={true}
                            infinite
                        >
                            {this.props.banner.map(val => (
                                <img
                                    key={val.Pic}
                                    src={`http://img0.gjw.com/product/${val.Pic}`}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            ))}
                        </Carousel>
                    </WingBlank>
                </div>
                <div className="goods-introduce">
                    <div className="productName">
                        <p>{data.ProductName}</p>
                        <div className="icon">
                            <Icon type="check-circle-o"></Icon>
                            <span>关注</span>
                        </div>
                    </div>
                    <div className="price">
                        <span>￥{data.APPPrice}</span>
                        <span>降低通知</span>
                    </div>
                    <div className="goodsNum">
                        <span>数量</span>
                        <div className="cal">
                            <span onTouchStart={() => {
                                if (goodsNum < 2) {
                                    return false
                                }
                                this.setState({
                                    goodsNum: goodsNum - 1
                                })
                            }}>-</span>
                            <span>{this.state.goodsNum}</span>
                            <span onTouchStart={() => {
                                if (goodsNum > 19) {
                                    return false
                                }
                                this.setState({
                                    goodsNum: goodsNum + 1
                                })
                            }}>+</span>
                        </div>
                    </div>
                    <div className="tips">
                        <p>
                            提示：<span>{data.BagExplain}</span>
                        </p>
                    </div>
                    <div className="comment">
                        <p>
                            <span>评价({data.SumComment})</span>
                        </p>
                    </div>        
                    
                    <CommonPerson data={commentsData.slice(0,5)} />
                </div>
                   
            </div>
        )
    }
}

export default Goods
