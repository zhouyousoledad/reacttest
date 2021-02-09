import React, {
	Component,createRef
} from 'react';
import { Input, Button,Select,message,Steps} from 'antd';
import { CloseCircleOutlined,LeftCircleOutlined,RightCircleOutlined,CheckCircleOutlined } from '@ant-design/icons';
import './taskbank.css';
import Firststep from './firststep.js'
import Secondstep from './secondstep.js'
import Laststep from './laststep.js'
const { Step } = Steps;

class Addbank extends Component {
	constructor ( props ) {
    super(props)
    this.first = createRef();
    this.second = createRef();
    this.last = createRef();
    this.state = {
		vtitle:'',
		visible:false,
		current:1
    }
  	}
  render() {
    return (
    	<div className="addbank">
    		<div className="bankstep">
    		<Steps current={this.state.current}>
    			<Step title="添加题目类型" />
    			<Step title="添加选项" />
    			<Step title="添加标签分值" />
  			</Steps>
  			</div>
  			<div className="bankcontent">
  				{this.stepcontent()}
  			</div>
  			<div className="bankstep-buttons">
  				<Button onClick={this.cancel} icon={<CloseCircleOutlined />}>取消</Button>
  				{
  					this.state.current !=0 ? <Button type="primary" onClick={this.previous} icon={<LeftCircleOutlined />}>上一步</Button> : ''
  				}
  				{
  					this.state.current == 2 ? <Button type="primary" className="green" onClick={this.save} icon={<CheckCircleOutlined />}>保存</Button> : <Button type="primary" onClick={this.nextstep}>下一步<RightCircleOutlined /></Button>
  				}
  			</div>
    	</div>
    )
  }
  cancel = () => {
  	this.props.cancel(false)
  }
  previous = () => {
  	let prive = --this.state.current
  	this.setState({ 
	 	current:prive
	},() => {
	 	
  	})
  }
  nextstep = ()=> {
  	if(this.state.current == 0){  //检验第一个是否通过
  		let flag = this.first.current.validation()
  		if(flag){
  			this.setState({ 
	 			current:++this.state.current
			})
  		}else{
  			message.error('请完成必填的数据');
  		}
  	}else if(this.state.current == 1){  //检验第二个是否通过
  		
  	}
	
  }
  stepcontent(){
    if (this.state.current == 0) {
      return (
        <Firststep ref={this.first}></Firststep>
      );
    } else if(this.state.current == 1) {
      return (
        <Secondstep ref={this.second}></Secondstep>
      );
    } else if(this.state.current == 2){
      return (
        <Laststep ref={this.last}></Laststep>
      );
    }
  }
  componentDidMount(){
	
  }
}
export default Addbank