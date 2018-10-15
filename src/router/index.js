import React, { Component } from 'react'

import {
    HashRouter as Router,
    Route, Switch
} from 'react-router-dom'

import App from '../App'
import Home from '../components/home'
import Classify from '../components/classify'
import Welfare from '../components/welfare'
import Cart from '../components/cart'
import Mine from '../components/mine'

console.log(666)

export default class extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/classify" component={Classify}></Route>
                        <Route path="/mine" component={Mine}></Route>
                        <Route path="/cart" component={Cart}></Route>
                        <Route path="/welfare" component={Welfare}></Route>
                    </Switch>
                </App>
            </Router>
        )
    }
}