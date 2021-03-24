import React, {
	Component,createRef
} from 'react';
import { Row, Col, Form, Select,message } from 'antd';
import { dictdetail } from '../../axios/api';
import { labeltree } from '../../axios/label';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import './taskbank.css';
import axios from 'axios';
import { bankadd,bankeduit } from '../../axios/testbank';
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
		anstypedata:[],
		tid:'',
		flag:0
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
              				<Select allowClear showArrow="true" style={{ width: '100%' }} placeholder="请选择" onChange={this.handleProvinceChange}>
      							{this.state.qtypedata.map(v => <Option key={v.value}>{v.label}</Option>)}
    						</Select>
            			</Form.Item>
      				
      					<Form.Item label="标签" name='tagIds' rules={[{ required: true, message: '请选择标签' }]}>
            				<Select mode="multiple" allowClear showArrow="true" style={{ width: '100%' }} options={this.state.labeloption} placeholder="请选择">
            					
    						</Select>
            			</Form.Item>
            			{
            				this.state.flag != 2 ?
            				<Form.Item label="选项类型" name='anstype' rules={[{ required: true, message: '请选择选项类型' }]}>
            					<Select allowClear showArrow="true" style={{ width: '100%' }} placeholder="请选择">
      								{this.state.anstypedata.map(v => <Option key={v.value}>{v.label}</Option>)}
    							</Select>
            				</Form.Item>:
            				''
            			}
            			
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
  handleProvinceChange = (data) =>{
  		this.setState({
  			flag:data
  		})
  }
  validation = () => {
  	 return  new Promise((resolve, reject)=>{
        this.formRef.current.validateFields().then((values) => {
        	let Strings = this.state.editorState.toHTML()
			let newStrings = Strings.replace(/<(?!img).*?>/g, "")
			if(newStrings){
				console.log(this.state)
				values.content = this.state.editorState.toHTML()
				values.tid = this.state.tid
				console.log(values)
				bankadd(values).then(res=>{
				message.success('添加成功');
				let valiod={
        			"flag":false,
        			"tid":res.data.data,
        			"value":values.anstype
        		}
				if(newStrings != ''){
					valiod.flag = true
				}
            		resolve(valiod);
			})
			}else{
				message.error('请填写题目');
			}
			
			
        });
    })  	
  }
  set = (row) =>{
  	
  	var obj = {
  		"qtype":row.qtype,
  		"anstype":row.anstype,
  		"tagIds":row.tagIds,
  	}
  	const editorState2 = BraftEditor.createEditorState(row.content)
  	this.setState({
  		'editorState':editorState2,
  		'tid':row._id
  	},()=>{
  		setTimeout(()=>{
			this.formRef.current.setFieldsValue(obj)
		},0)
  	})
  }
  componentDidMount(){
	this.getdata()
  }
}
export default Addbank