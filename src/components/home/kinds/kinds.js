import React, { Component } from 'react';

import { Grid, Carousel } from 'antd-mobile'

import {withRouter} from 'react-router-dom'

class Kinds extends Component {
    constructor() {
        super()
        this.state = {
            calousel: [],
            imgHeight: 170,
            isMask:true
        }
    }
    componentDidMount() {
        this.$http.get('BtCApi/Home/SeckillList?userid=0').then(res => {
            let data = res.data[0].AppSeckill.AppSeckillProList
            this.setState({
                calousel: data
            })
        })
    }
    render() {
        let { kinds } = this.props
        // console.log(kinds)
        return (
            <div className="kinds">
                <Grid data={kinds} hasLine={false}
                    columnNum={5}
                    renderItem={
                        item => (
                            <img 
                            src={item.Pic} 
                            style={{ width: '0.7rem' ,background:'#dfdfdf'}} 
                            onTouchStart={()=>{
                                this.props.history.push(`lists/${item.Url}`)
                            }}
                            />
                        )
                    }
                />

                <div className="calouselGoods">

                    <Carousel
                        cellSpacing={-20}
                        slideWidth={0.9}
                    >
                        {
                            this.state.calousel.map(val => (
                                <div className="goods"  key={val.Id}>
                                    <img
                                       
                                        src={`http://img0.gjw.com/product/${val.imgUrl}`}
                                        alt=""
                                        style={{ width: '1rem', background:'#dfdfdf', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                    <div className="side">
                                        <strong>{val.ProductName}</strong>
                                        <p><span>￥ {val.Price}</span>
                                        <span>马上抢</span></p>
                                    </div>
                                </div>

                            ))}
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default withRouter(Kinds)