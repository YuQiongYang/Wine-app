#### setState不能直接改变state的值，原因是他是异步的，要想在state改变后发起什么方法，则在setState后的回调函数操作就ok
```jsx
 this.setState({
            defaultData: {
                ...data,
                seriesid: page.seriesid
            }
        }, () => {
            console.log(this.state.defaultData)
        })
```

#### react-router跳转路由
this.props.history.push('lists')
需要注意的是：
    假设我有个路由：losthost:3000/#/kinds/1
这里的话，如果单纯路由跳转，匹配的路径是losthost:3000/#/kinds/lists...
显然，这不是我想要的
解决办法也很简单：this.props.history.push('/lists')
这样就会匹配到路径的根部

#### react-router的bug
嗯。。。不知道是不是antd-mobile的bug
导致我路由会执行两次，也就是说路由对应的组件会渲染两次，当然，生命周期也会执行两次
网上说：
* 项目中使用的react-router ^3.x.x。react-router路由跳转时，this.props.location.action的值会有两种状态。这两种状态都会触发render。故页面渲染两次。
* 当点击Link时，this.props.location.action=PUSH
* 当浏览器前进后退时，this.props.location.action=POP。

* 所以当点击了Link时，状态先是PUSH，之后浏览器发生前进后退，状态变为POP。

当我在做异步操作获取数据的时候，第一个状态马上就跳转了，而数据是异步的，所以就为什么自组件的数据是之前的，在控制台，有两次的数据打印，第二次的打印，可能也就延迟几百毫秒，数据那是就已经完全更新完毕，所以呢，解决的办法，路由单独写，移动端尾部tab单独写，再引进组件，我怀疑是ui组件的问题，有待研究
