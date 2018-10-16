import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import List from '../common/lists'
import Mask from '../common/mask'

import './index.scss'

class Lists extends Component {
    constructor() {
        super()

        this.state = {
            tabs: [{
                id: 1,
                name: '综合',
                icon: 'down',
                isOpen: false,
                child: [{
                    id: '1 - 1',
                    name: '评价最高',
                    sort: 1
                }, {
                    id: '1 - 2',
                    name: '最新产品',
                    sort: 2
                }]
            }, {
                id: 2,
                name: '销量',
                sort: 0
            }, {
                id: 3,
                name: '价格',
                icon: 'down',
                isOpen: false,
                child: [{
                    id: '3 - 1',
                    name: '价格由低到高',
                    sort: 5
                }, {
                    id: '3 - 2',
                    name: '价格由高到低',
                    sort: 4
                }]
            }],
            icon: 'down',
            isOpen: false,
            currentIndex: 1,
            listIdx: '',
            reqData: {
                ParentID: 1,
                brand: 0,
                strWhere: '0,0,0,0,0',
                sort: 0,
                PageIndex: 1,
                PageSize: 20,
                userID: 0
            },
            data: [],
            isMask: true
        }
    }

    showItem(item, i) {
        let { tabs, isOpen, reqData } = this.state
        if (item.child) {
            item.isOpen = !item.isOpen
            if (item.isOpen) {
                item.icon = "up"
            } else {
                item.icon = 'down'
            }
            let changeShow = "tabs[" + i + "].isOpen"
            let changeIcon = "tabs[" + i + "].icon"
            this.setState({
                [changeShow]: !item.isOpen,
                [changeIcon]: item.icon,
                currentIndex: i,
                reqData: {
                    ...reqData,
                    sort: item.sort
                }
            })
        }



    }
    handerKey(list) {
        let { reqData } = this.state
        if (this.state.reqData.sort === list.sort) return false
        this.setState({
            listIdx: list.id,
            reqData: {
                ...reqData,
                sort: list.sort
            }
        }, () => {
            this.getData(this.state.reqData)
        })
    }
    getData(reqData) {
        this.$http.get('BtCApi/List/GetProListWhere', reqData).then(res => {
            this.setState({
                isMask: true
            })
            if (res.status) {
                this.setState({
                    data: res.data.Prolist,
                    isMask: false
                })
            }

        })
    }
    componentDidMount() {
        let { reqData, data } = this.state
        let { params } = this.props.match
        let brand = this.props.location.search.split('?brand=')[1]
        if (params.ParentID === reqData.ParentID) return false
        if (brand) {
            this.setState({
                reqData: {
                    ...reqData,
                    ParentID: params.ParentID,
                    brand
                }
            }, () => {
                this.getData(this.state.reqData)
            })
        } else {
            this.setState({
                reqData: {
                    ...reqData,
                    ParentID: params.ParentID
                }
            }, () => {
                this.getData(this.state.reqData)
            })
        }


    }
    shouldComponentUpdate(props, state) {
        return state.data.length > 0
    }
    render() {
        return (
            <div className="App-lists">
                <div className="selectLists">
                    <header>
                        <div className="search">
                            <Icon type="left" onTouchStart={() => {
                                this.props.history.goBack()
                            }}></Icon>
                            <input type="text" placeholder="请输入商品名称"></input>
                            <span>搜索</span>
                        </div>
                    </header>

                    <ul className="listsTabs">
                        {
                            this.state.tabs.map((item, i) => {
                                if (item.child) {
                                    return (
                                        <li key={item.id}>
                                            <span
                                                style={{ color: this.state.currentIndex === i ? "red" : '' }}
                                                onTouchStart={this.showItem.bind(this, item, i)}>
                                                {item.name}
                                                <Icon type={item.icon}></Icon>
                                            </span>
                                            <div style={{ display: this.state.currentIndex === i && item.isOpen ? "block" : "none" }}>
                                                {
                                                    item.child.map(list => {
                                                        return (<p
                                                            style={{ color: this.state.listIdx === list.id ? "red" : '' }}
                                                            onTouchStart={this.handerKey.bind(this, list)}
                                                            key={list.id}>{list.name}</p>)
                                                    })
                                                }
                                            </div>
                                        </li>
                                    )
                                }
                                return (
                                    <li key={item.id}>
                                        <span
                                            style={{ color: this.state.currentIndex === i ? "red" : '' }}
                                            onTouchStart={() => {
                                                if (this.state.reqData.sort === item.sort) return false
                                                this.setState({
                                                    currentIndex: i, reqData: {
                                                        ...this.state.reqData,
                                                        sort: item.sort
                                                    }
                                                }, () => {
                                                    this.getData(this.state.reqData)
                                                })

                                            }}
                                        >{item.name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="allLists">
                    <List data={this.state.data} />
                </div>
                <Mask isMask={this.state.isMask} />
            </div>
        )
    }
}


export default Lists