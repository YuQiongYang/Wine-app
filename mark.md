setState不能直接改变state的值，原因是他是异步的，要想在state改变后发起什么方法，则在setState后的回调函数操作就ok

 this.setState({
            defaultData: {
                ...data,
                seriesid: page.seriesid
            }
        }, () => {
            console.log(this.state.defaultData)
        })