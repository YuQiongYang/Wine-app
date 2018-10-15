import React, { Component } from 'react';
import { Carousel, SearchBar } from 'antd-mobile';

class Banner extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 170,
    }
    render() {
        // console.log(this.props.banner)
        return (
            <div className="banner">
                <Carousel
                    autoplay={true}
                    infinite={true}
                >
                    {this.props.banner.map(val => (
                        <img
                            key={val.ID}
                            src={val.Pic}
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
                <span className="search">请输入商品信息</span>
            </div>

        );
    }
}

export default Banner