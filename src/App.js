import React, {
  Component
} from 'react';
import {
  Route,
  Switch,
  NavLink,
  withRouter
} from 'react-router-dom';

import { TabBar } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css';
import './assets/scss/common.scss'

import Home from './components/home'
import Classify from './components/classify'
import Welfare from './components/welfare'
import Cart from './components/cart'
import Mine from './components/mine'
import Lists from './components/lists'

import octicons from 'octicons'

class App extends Component {
  constructor() {
    super()
    this.state = {
      tabs: [{
        id: 1,
        text: '首页',
        icon: 'home',
        name: 'home',
        path: '/'
      }, {
        id: 2,
        text: '分类',
        icon: 'package',
        name: 'classify',
        path: '/classify'
      }, {
        id: 3,
        text: '专项福利',
        icon: 'gift',
        name: 'welfare',
        path: '/welfare'
      }, {
        id: 4,
        text: '购物车',
        icon: 'inbox',
        name: 'cart',
        path: '/cart'
      }, {
        id: 5,
        text: '我的',
        icon: 'person',
        name: 'person',
        path: '/mine'
      }]
    }
  }
  handleChangeCurrent(tab) {
    // console.log(this.props.history.action);
    let { history } = this.props;
    if (history.location.pathname === tab.path) return false
    history.push(tab.path);
  }

  render() {
    let { pathname } = this.props.history.location
    return (<div className="App" >
      <TabBar tintColor="#cd0011">
        {
          this.state.tabs.map(tab => {
            return <TabBar.Item
              title={tab.text}
              key={tab.id}
              icon={<div dangerouslySetInnerHTML={{ __html: octicons[tab.icon].toSVG() }} />}
              selectedIcon={<div className="selected" dangerouslySetInnerHTML={{ __html: octicons[tab.icon].toSVG() }} />}
              selected={tab.path == pathname}
              onPress={this.handleChangeCurrent.bind(this, tab)}
            >
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/classify" component={Classify}></Route>
                <Route path="/mine" component={Mine}></Route>
                <Route path="/cart" component={Cart}></Route>
                <Route path="/welfare" component={Welfare}></Route>
                <Route path="/lists" component={Lists}></Route>
              </Switch>
            </TabBar.Item>
          })
        }
      </TabBar>
    </div>
    );
  }
}

export default withRouter(App);