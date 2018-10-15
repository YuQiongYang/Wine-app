import React, { Component } from 'react';
import './index.scss'

import Banner from './carousel/banner'
import Kinds from './kinds/kinds'
import Selectwine from './selectWine'
import Demo from './text'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            banner: [],
            kinds: [],
        }
    }
    componentWillUnmount () {
        this.unmount = true//这个开关用于判断组件是否销毁
        // console.log('当路由出去')
    }
    componentDidMount() {
        let banner = []
        let kinds = []
        this.$http.get('BtCApi/Home/GetHomePageImg').then(res => {
            // console.log(res.data)
            res.data.forEach(item => {
                if (item.BackgroudColor) {
                    banner.push(item)
                }
                if (Number(item.adv_BlockID) === 3) {
                    kinds.push(item)
                }
            })
            if ( this.props.unmount ) return false;
            this.setState({
                banner,
                kinds
            })
        })
    }
    shouldComponentUpdate(props, state) {
        return state.banner.length > 0
    }
    render() {
        return (
            <div className="app-home">
                <Banner banner={this.state.banner} />
                <Kinds kinds={this.state.kinds} />
                <Selectwine />
                {/* <Demo /> */}
            </div>
        )
    }
}

export default Home