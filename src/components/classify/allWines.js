import React, { Component } from 'react';
import { Icon } from 'antd-mobile'
import './allWines.scss'
class AllWines extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        let { ParentID } = this.props.match.params
        var letters = "abcdefghjklmnopqrstwxyz".split('');
        let curr
        let wines = []
        this.$http.get('BtCApi/List/GetSeriesListALL', { ParentID }).then(res => {
            if (res.status) {
                letters.forEach(item => {
                    curr = {
                        letter: item.toUpperCase(),
                        data: []
                    }
                    res.data.item_data.forEach(data => {
                        if (data.PinYin.indexOf(item) > -1 && item == data.PinYin.substr(0, 1)) {
                            // console.log(data)
                            curr.data.push({
                                wine: data.TypeName,
                                Url: data.Url
                            })
                        }
                    })
                    if (curr.data.length) {
                        wines.push(curr)
                        this.setState({
                            data: wines
                        })
                    }
                })
            }
        })
    }
    scrollToAnchor(item) {
        let anchorElement = document.getElementById(item.letter);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) { 
            anchorElement.scrollIntoView();
            // window.scrollTo(0,45)
        }
    }
    shouldComponentUpdate(props, state) {
        return state.data
    }
    render() {
        let { data } = this.state
        return (
            <div className="app-allWines">
                <header>
                    <Icon type="left" onTouchStart={() => {
                        this.props.history.goBack()
                    }}></Icon>
                    <span>全部品牌</span>
                </header>
                <ul>
                    {
                        data.map(item => {
                            return (
                                <li key={item.letter}>
                                    <a id={item.letter}>
                                        {item.letter}
                                    </a>
                                    <div className="wine">
                                        {
                                            item.data.map(wine => {
                                                return <span onTouchStart={()=>{
                                                    // console.log(this.props)
                                                    let id = this.props.match.params.ParentID
                                                    this.props.history.push(`/lists/${id}?brand=${wine.Url}`)
                                                }} key={wine.Url}>{wine.wine}</span>
                                            })
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="letter">
                    {
                        data.map(item => {
                            return (<a onTouchStart={this.scrollToAnchor.bind(this, item)} key={item.letter}>{item.letter}</a>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default AllWines

