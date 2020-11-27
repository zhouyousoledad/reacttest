import React, {Component} from 'react';
//全局文件

import Router from './router/config'
import Store from './info/store'

import 'antd/dist/antd.css';

class App extends Component {
	constructor ( props ) {
    super(props)
    this.state = {
    	Val:10,
    }
  	}
    render() {
        return (
            <div className="App" style={{height:'100%'}}>

            <Router />

            </div>
        );
    }
    handleClick() {
    	var val = this.state.Val + 1
        this.setState({
            Val: val
        });
        //this.forceUpdate();
    }

    componentDidMount(){
	  Store.subscribe(()=>{
	  	this.setState({})
	  	let arr = Store.getState().route
	  	console.log(arr)
	  	if(arr !== ""){
			this.handleClick()
	  	}
	  })
  	}

}
export default App;