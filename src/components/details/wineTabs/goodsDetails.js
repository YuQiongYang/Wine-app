import React, { Component } from 'react';

import { Tabs, WhiteSpace } from 'antd-mobile';

class GoodsDetails extends Component {
    constructor() {
        super()
        this.state = {
            tabs: [{
                id: 1,
                title: '商品介绍'
            }, {
                id: 2,
                title: '规格参数'
            }, {
                id: 3,
                title: '包装售后'
            }],
            idx: 1
        }
    }
    render() {
        let { tabs, idx } = this.state
        let { banner, listAttr } = this.props
        console.log(listAttr)
        return (
            <div className="goodsDetails">
                <WhiteSpace />
                <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                        <ul className="goodsImg">
                            {
                                banner.map(item => {
                                    return (
                                        <li key={item.Pic}>
                                            <img src={`http://img0.gjw.com/product/${item.Pic}`} />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                        <table border="1">
                            <tbody>
                                {
                                    listAttr.map(item => {
                                        return <tr key={item.AttrTitle}>
                                            <td>
                                                {item.AttrTitle}
                                            </td>
                                            <td>
                                                {item.AttrVal}
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                        Content of third tab
                    </div>
                </Tabs>
                <WhiteSpace />

            </div>
        )
    }
}

export default GoodsDetails

