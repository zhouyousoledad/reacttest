import React, {
	Component,createRef
} from 'react';
import { Row, Col, Form, Select } from 'antd';
import { dictdetail } from '../../axios/api';
import { labeltree } from '../../axios/label';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import './taskbank.css';
import axios from 'axios';
const anstypes = [];
const { Option, OptGroup } = Select;
class Addbank extends Component {
	formRef = React.createRef();
	constructor ( props ) {
    super(props)
    this.state = {
    	editorState: BraftEditor.createEditorState(null),
		labeloption:[],
		qtypedata:[],
		anstypedata:[]
    }
  	}
  render() {
  	const layout = {
		labelCol: {
			span: 4,
		},
		wrapperCol: {
			span: 10,
		},
	};
    return (
    	<div className="addbank">
    		<Row>
      			<Col span={12}>
      				<Form {...layout} ref={this.formRef}>	
      					<Form.Item label="题目类型" name='qtype' rules={[{ required: true, message: '请选择题目类型' }]}>
              				<Select allowClear showArrow="true" style={{ width: '100%' }} placeholder="请选择">
      							{this.state.qtypedata.map(v => <Option key={v.value}>{v.label}</Option>)}
    						</Select>
            			</Form.Item>
      				
      					<Form.Item label="标签" name='tagIds' rules={[{ required: true, message: '请选择标签' }]}>
            				<Select mode="multiple" allowClear showArrow="true" style={{ width: '100%' }} options={this.state.labeloption} placeholder="请选择">
            					
    						</Select>
            			</Form.Item>
            			<Form.Item label="选项类型" name='anstype' rules={[{ required: true, message: '请选择选项类型' }]}>
            				<Select allowClear showArrow="true" style={{ width: '100%' }} placeholder="请选择">
      							{this.state.anstypedata.map(v => <Option key={v.value}>{v.label}</Option>)}
    						</Select>
            			</Form.Item>
      			</Form>
      			</Col>
      			<Col span={12}>
      				<div className="eduitborder">
      				<BraftEditor value={this.state.editorState} onChange={this.handleEditorChange} />
      				</div>
      			</Col>
    		</Row>
    	</div>
    )
  }
  handleEditorChange = (editorState) => {
        this.setState({ editorState })
  }
  getdata = () => {
  	let _this = this 
  	let axiosRequest=[dictdetail({"name":'q_type'}),dictdetail({"name":'ans_type'}),labeltree()]
  	axios.all(axiosRequest).then(axios.spread(function (F1,F2,tag){
  		var newoption = []
  		tag.data.data.forEach((item, index) => {
			var obj = {
				'label':item.name,
				'options':[]
			}
			item.children.forEach(v=>{
				var childobj = {
					'value':v._id,
					'id':v._id,
					'label':v.name
				}
				obj.options.push(childobj)
			})
				newoption.push(obj)
  		})
  		_this.setState({
			labeloption: newoption,
			qtypedata: F1.data.data,
			anstypedata:F2.data.data
		})
  	}))	
  }
  validation = () => {
  	this.formRef.current.validateFields().then((values) => {
  		console.log(this.state.editorState.toHTML())
  		var flag = false
  		var Strings = this.state.editorState.toHTML()
  		var newStrings = Strings.replace(/<(?!img).*?>/g, "")  
  		if(newStrings == '' || newStrings == null){
  			flag = false
  		}else{
  			flag = true
  		}
  		return true
  	})	
  }
  
  componentDidMount(){
	this.getdata()
  }
}
export default Addbank