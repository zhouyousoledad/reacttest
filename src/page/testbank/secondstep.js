import React, {
	Component,createRef
} from 'react';
import { Input, Button,Select,message,Row, Col} from 'antd';
import { PlusOutlined,MinusCircleOutlined } from '@ant-design/icons';
import './taskbank.css';


class Addbank extends Component {
	constructor ( props ) {
    super(props)
    this.state = {
		selectarr:[]
    }
  	}
  render() {
    return (
    	<div className="addbank">
    		<div className="second-add">
    			<Button type="primary" onClick={this.addselect} icon={<PlusOutlined />}>新增</Button>
    		</div>
    		<Row gutter={16}>
    			{
    				this.state.selectarr.map((v,index) => 
    				<Col span={6} className="secondcol" key={index}>
    				<Input value={v.label} className="secondselect" onChange={e => this.inputChang(e, index)} placeholder="请输入选项" />
    				{
    					this.state.selectarr.length > 1 ? <MinusCircleOutlined /> : ''
    				}
    				</Col>
    			)}
    		</Row>
    	</div>
    )
  }
  addselect = () =>{
  	var arr = this.state.selectarr
  	arr.push({
        label: ''
    });
    this.setState({
    	selectarr:arr
    })
  }
  inputChang = (e,index) =>{
	const obj = {
		...this.state.selectarr[index]
	}
	obj.label = e.target.value
	const yuandata = [...this.state.selectarr]
	yuandata[index] = obj
	
  	
  }
  componentDidMount(){
	
  }
}
export default Addbank