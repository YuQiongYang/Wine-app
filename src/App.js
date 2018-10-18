import React, {
  Component
} from 'react'

import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'

import 'antd-mobile/dist/antd-mobile.css'
import './assets/scss/common.scss'

import Home from './components/home'
import Classify from './components/classify'
import Welfare from './components/welfare'
import Cart from './components/cart'
import Mine from './components/mine'
import Lists from './components/lists'
import AllWines from './components/classify/allWines'
import Details from './components/details'
import Login from './components/mine/login/login'
import msgLogin from './components/mine/login/msgLogin'

class App extends Component {
  handleChangeCurrent(tab) {
    // console.log(this.props.history.action);
    let { history } = this.props;
    if (history.location.pathname === tab.path) return false
    history.push(tab.path);
  }

  render() {
    return (<div className="App" >
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/classify" component={Classify}></Route>
        <Route path="/mine" component={Mine}></Route>
        <Route path="/welfare" component={Welfare}></Route>
        <Route path="/details/:id" component={Details}></Route>
        <Route path="/lists/:ParentID" component={Lists}></Route>
        <Route path="/allWine/:ParentID" component={AllWines}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/msgLogin" component={msgLogin}></Route>
      </Switch>
    </div>
    );
  }
}

export default withRouter(App);