import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

import './index.scss'

class Lists extends Component {
    constructor() {
        super()

        this.state = {
            tabs: [{
                id: 1,
                name: '综合',
                icon: 'down',
                child: [{
                    id: 1 - 1,
                    name: '评价最多'
                }, {
                    id: 1 - 2,
                    name: '最新产品'
                }]
            }, {
                id: 2,
                name: '销量',
                child: [{
                    id: 2 - 1,
                    name: '销量'
                }]
            }, {
                id: 3,
                name: '价格',
                icon: 'down',
                child: [{
                    id: 3 - 1,
                    name: '价格由低到高'
                }, {
                    id: 3 - 2,
                    name: '价格由低到高'
                }]
            }],
            icon: 'down',
            isOpen: false
        }
    }

    showItem(item, i) {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div className="App-lists">
                <div className="selectLists">
                    <header>
                        <div className="search">
                            <Icon type="left"></Icon>
                            <input type="text" placeholder="请输入商品名称"></input>
                            <span>搜索</span>
                        </div>
                    </header>

                    <ul className="listsTabs">
                        {
                            this.state.tabs.map((item, i) => {
                                if (item.child) {
                                    return <Menu key={i} menuData={item} />
                                }
                                return <Menu key={i} menuData={item} />
                            })
                        }
                    </ul>
                </div>

            </div>
        )
    }
}

class Menu extends Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }
    showItem() {
        this.setState({
            isOpen: !this.state.isOpen
        },()=>{
            console.log(this.state.isOpen)
        })
    }
    render() {
        // console.log(this.props.menuData)
        return (
            <li>
                <span onClick={this.showItem.bind(this)}>{this.props.menuData.name}</span>
                <div style={{ display: this.state.isOpen ? "block" : "none" }}>
                    {
                        this.props.menuData.child.map(item => {
                            return (<p key={item.id}>{item.name}</p>)
                        })
                    }
                </div>
            </li>
        )

    }
}

export default Lists