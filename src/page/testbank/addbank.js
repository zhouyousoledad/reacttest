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
		current:0
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
  				<div className={this.state.current == 0?'word-style':'word-style hide'}>
  					<Firststep ref={this.first}></Firststep>
  				</div>
  				<div className={this.state.current == 1?'word-style':'word-style hide'}>
  					<Secondstep ref={this.second}></Secondstep>
  				</div>
  				<div className={this.state.current == 2?'word-style':'word-style hide'}>
  					<Laststep ref={this.last}></Laststep>
  				</div>
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
  setfirst = (row) =>{
  	this.first.current.set(row)
  }
  previous = () => {
  	let prive = --this.state.current
  	this.setState({ 
	 	current:prive
	},() => {
	 	
  	})
  }
  save = () =>{
  	this.last.current.validation().then(res=>{
  		this.props.cancel(true)
  	})	
  }
  nextstep = ()=> {
  	if(this.state.current == 0){  //检验第一个是否通过
  		this.first.current.validation().then(res=>{
  			console.log(res)
  			if(res.tid != ''){
  			if(res.flag){
  				this.setState({ 
	 				current:++this.state.current,
				},() => {
     				this.second.current.getlist(res.value,res.tid)   
  				})
  			}else{
  				message.error('请完成必填的数据');
  			}
  			}else{
  				this.props.cancel(true)
  			}
  		})
  	}else if(this.state.current == 1){  //检验第二个是否通过
  		this.second.current.validation().then(res=>{
  			this.setState({ 
	 			current:++this.state.current,
			},() => {
     			this.last.current.getlist(res)  
  			})
  			
  		})	
  	}
	
  }
  componentDidMount(){
	
  }
}
export default Addbank