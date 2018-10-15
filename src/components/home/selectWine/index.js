import React, { Component } from 'react';

import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import Lists from '../../common/lists'

function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

class Selectwine extends Component {
    constructor() {
        super()
        this.state = {
            tabs: [
                {
                    seriesid: 0,
                    title: '精选'
                }, {
                    seriesid: 1,
                    title: '白酒'
                }, {
                    seriesid: 2,
                    title: '葡萄酒'
                }, {
                    seriesid: '4,1435',
                    title: '清酒洋酒'
                }, {
                    seriesid: '5,6',
                    title: '黄酒啤酒'
                }, {
                    seriesid: 7,
                    title: '年份老酒'
                }
            ],
            defaultData: {
                seriesid: 0,
                pageindex: 1,
                pagesize: 20
            },
            data: []
        }
    }

    getData(data) {
        this.$http.get('BtCApi/Home/GethomeProductByhot', data).then(res => {
            console.log(res)
            if (res.status) {
                this.setState({
                    data: res.data
                })
            }
        })
    }
    componentDidMount() {
        this.getData(this.state.defaultData)
    }
    handelPage(page) {
        let data = this.state.defaultData
        this.setState({
            defaultData: {
                ...data,
                seriesid: page.seriesid
            }
        }, () => {
            this.getData(this.state.defaultData)
        })
    }

    render() {
        return (
            <div className="selectwine">
                <WhiteSpace />
                <StickyContainer>
                    <Tabs
                        tabs={this.state.tabs}
                        onChange={this.handelPage.bind(this)}
                        initialPage={0}
                        swipeable={true}
                        animated={true}
                        useOnPan={false}
                        renderTabBar={renderTabBar}>
                        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}> */}
                        <Lists data={this.state.data} />
                        {/* </div> */}
                    </Tabs>
                </StickyContainer>
                <WhiteSpace />
            </div>
        )
    }
}

export default Selectwine