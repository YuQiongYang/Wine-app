import React, { Component } from 'react';

import { Grid,ListView  } from 'antd-mobile'

class Lists extends Component {
    render() {
        console.log(this.props.data)
        let { data } = this.props
        return (
            <div className="goodList" style={{background: '#f1f1f1'}}>
                <Grid data={data} columnNum={2}
                 square={false} className="not-square-grid"
                    renderItem={
                        item => (
                            <div>
                                <img src={`http://img0.gjw.com/product/${item.Pic}`} 
                                style={{ width: '1.5rem',background: '#dfdfdf'}} alt="" />
                                <p>{item.ProductName}</p>
                                <span>￥ {item.ActivityMoney}</span>
                            </div>
                        )
                    }
                />
            </div>

        )
    }
}

export default Lists