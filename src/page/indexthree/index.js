//home.js
import React, { Component } from 'react';

class Homethree extends Component {
	constructor ( props ) {
    super(props)
    this.state = {}
  	}
  render() {
    return (
    	<div>第二页</div>
    )
  }
  componentDidMount(){


  	console.log(this.props.location)
  	console.log(this.props.location.search )
  }
}
export default Homethree