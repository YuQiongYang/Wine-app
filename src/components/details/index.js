import React, { Component } from 'react';

import { Icon, Tabs, WhiteSpace } from 'antd-mobile'

import { StickyContainer, Sticky } from 'react-sticky';

import Goods from './wineTabs/goods'
import GoodsDetails from './wineTabs/goodsDetails'
import Comment from './wineTabs/comment'

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
            commentsData:[]
        }
    }
    componentDidMount() {
        let Id = this.props.match.params.id
        if (Id) {
            this.setState({
                reqData: {
                    ...this.state.reqData,
                    Id
                },
                reqComments:{
                    ...this.state.reqComments,
                    proid: Id
                }
            }, () => {
                this.$http.post('http://m.gjw.com/BtCApi/Item/GetProduct', this.state.reqData).then(res => {
                    console.log(res)
                    if (res.status) {
                        this.setState({
                            data: res.data,
                            banner: res.data.listpic
                        })
                    }
                })
                this.$http.get('BtCApi/Item/GetComment',this.state.reqComments).then(res=>{
                    // console.log(res)
                    if(res.status){
                        this.setState({
                            commentsData: res.data
                        })
                    }
                })
            })
        }

    }

    shouldComponentUpdate(props, state) {
        return state.data
    }

    render() {
        let { data, tabs } = this.state
        return (
            <div className="wineDetails">
                <header>
                    <Icon type="left"></Icon>
                    <p>
                        {data.ProductName}
                    </p>
                </header>
                <div className="wine-tabs">
                    <WhiteSpace />
                    <StickyContainer>
                        <Tabs tabs={tabs}
                            initalPage={'t2'}
                            renderTabBar={renderTabBar}
                        >
                            <Goods data={data} banner={this.state.banner} commentsData={this.state.commentsData} />
                            <GoodsDetails />
                            <Comment commentsData={this.state.commentsData}/>
                        </Tabs>
                    </StickyContainer>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}

export default Details

