import React, { Component } from 'react';
import './index.scss'

import { Icon } from 'antd-mobile';

class Classify extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.$http.get('BtCApi/List/GetSeriesList').then(res => {
            // console.log(res)
            if (res.status) {
                this.setState({
                    data: res.data.item_data
                })
            }
        })
    }
    shouldComponentUpdate(props, state) {
        return state.data.length > 0
    }

    render() {
        console.log(this.state.data)
        return (
            <div className="classify">
                <header>
                    <span>
                        请输入商品名称
                    </span>
                </header>

                <ul className="classifyLists">
                    {
                        this.state.data.map(wine => {
                            if (wine) {
                                return <li key={wine.Url}>
                                        <p>
                                        {wine.TypeName}
                                        <a href="javascript:"><span>查看更多</span><Icon type="right"></Icon></a>
                                        </p>
                                        <div>
                                            {
                                            wine.TypeData.map(item=>{
                                                if(item){
                                                    return <span key={item.Url}>{item.Name}</span>
                                                }
                                            })
                                        }
                                        </div>
                                       </li>

                            }

                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Classify