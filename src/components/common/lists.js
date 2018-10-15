import React, { Component } from 'react';

import { Grid, ListView } from 'antd-mobile'

class Lists extends Component {
    shouldComponentUpdate(props){
        console.log(222,props)
        return props.data
    }
    render() {
        console.log(999,this.props.data)
        return (
            <div className="goodList" style={{ background: '#f1f1f1' }}>
                <Grid data={this.props.data} columnNum={2}
                    square={false} className="not-square-grid"
                    renderItem={
                        item => (
                            <div className="listDetails">
                                <div className="imgName">
                                <img src={`http://img0.gjw.com/product/${item.Pic}`}
                                    style={{ width: '1.5rem', background: '#dfdfdf' }} alt="" />
                                <p>{item.ProductName}</p>
                                <span style={{ display: item.ProductId ? "block" : "none" }}>￥ {item.ActivityMoney}</span>
                                </div>
                                <div className="price" style={{ display: item.SumComment ? "block" : "none" }}>
                                    {/* <span>
                                    {item.ActivityName? item.ActivityName[0].Ativityname : ''}
                                    </span> */}
                                    <p>￥ {item.APPPrice}</p>
                                    <div className="comment">
                                        <span>{item.GoodCommment}条好评</span>
                                        <span>{((item.GoodCommment/item.SumComment)*100).toFixed(1)}%</span>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    }
                />
            </div>

        )
    }
}

export default Lists