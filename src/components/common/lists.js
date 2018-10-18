import React, { Component } from 'react';

import { Grid, ListView } from 'antd-mobile'

import {withRouter} from 'react-router-dom'

class Lists extends Component {

    render() {
        // console.log(999,this.props.data)
        return (
            <div className="goodList" style={{ background: '#f1f1f1' }}>
                <Grid data={this.props.data} columnNum={2}
                    square={false} className="not-square-grid"
                    renderItem={
                        item => (
                            <div className="listDetails" onTouchStart={
                                ()=>{
                                    // console.log(item)
                                    if(item.ID){
                                        this.props.history.push(`/details/${item.ID}`)
                                    }else if(item.ProductId){
                                        this.props.history.push(`/details/${item.ProductId}`)
                                    }
                                }
                            }>
                                <div className="imgName">
                                <img src={`http://img0.gjw.com/product/${item.Pic}`}
                                    style={{ background: '#dfdfdf' }} alt="" />
                                <p>{item.ProductName}</p>
                                <p>{item.Name}</p>
                                <span style={{ display: item.ProductId ? "block" : "none" }}>￥ {item.ActivityMoney}</span>
                                <span style={{ display: item.Money ? "block" : "none" }}>￥ {item.Money}</span>
                                </div>
                                <div className="price" style={{ display: item.SumComment ? "block" : "none" }}>
                                    {/* <span>
                                    {item.ActivityName? item.ActivityName[0].Ativityname : ''}
                                    </span> */}
                                    <p style={{display: item.APPPrice ? 'block' : 'none'}}>￥ {item.APPPrice}</p>
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

export default withRouter(Lists)