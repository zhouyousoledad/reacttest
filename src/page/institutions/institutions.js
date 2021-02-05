import React, {
	Component,createRef
} from 'react';
import moment from 'moment';
import { Table, Space,Button,Row,Col,Form,message,Select,Input,Modal,TreeSelect,Radio,InputNumber,DatePicker } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import './institutions.css';
import { institutionslist,institutionschoose,institutionsadd } from '../../axios/institutions';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;
const { TreeNode } = TreeSelect;
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(selectedRows);
  }
};
class institutions extends Component {
	formRef = React.createRef();
	constructor(props) {
		super(props)
		this.state = {
			columns:[{
					title: '机构名称',
					dataIndex: 'name',
					key: 'name',
				},
				{
					title: '排序',
					dataIndex: 'orderno',
					key: 'orderno',
				},
				{
					title: '用户人数限制',
					dataIndex: 'userLimit',
					key: 'userLimit',
				},
				{
					title: '到期时间',
					dataIndex: 'deadline',
					key: 'deadline',
				},
				{
					title: '测试次数',
					dataIndex: 'assessmentNumber',
					key: 'assessmentNumber',
				},
				{
					title: '操作',
					key: 'operation',
					fixed: 'right',
					width: 310,
					render: (text, record) => (
						<div>
        					<Button type="primary" className="seracherbutton" onClick={() => this.eduit(record)} icon={<EditOutlined />}>编辑</Button>
        					<Button type="primary" danger className="seracherbutton marginle" onClick={() => this.delinner(record)} icon={<DeleteOutlined />}>删除</Button>
      					</div>
					)
				}
			],
			isTop:1,
			time:'',
			data:[],
			treeData:[],
			name:'',
			height:document.body.clientHeight - 366,
			vtitle:'',
			visible:false
		}
	}
	render() {
		const layout = {
		labelCol: {
			span: 8,
		},
		wrapperCol: {
			span: 30,
		},
		};
		
		let istops
    	if(this.state.isTop == 0){
    		istops = (
    			<Col className="gutter-row" span={12}>
      				<Form.Item label="选择上级" name='pid' rules={[{ required: true, message: '请选择上级' }]}>
            			<TreeSelect showSearch style={{ width: '100%' }} treeData={this.state.treeData} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="请选择上级" allowClear treeDefaultExpandAll>
       
      					</TreeSelect>
            		</Form.Item>
      			</Col>
    		)
    	}else if(this.state.isTop == 1){
    		istops = (
    			<Row className="dictcontent" gutter={8}>
    			<Col className="gutter-row" span={12}>
      							<Form.Item label="机构编码" name='organizationCode' rules={[{ required: true, message: '请输入编码' }]}>
      								<InputNumber style={{ width: '100%' }} placeholder='请输入' />
      							</Form.Item>	
      			</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="机构地址" name='address' rules={[{ required: true, message: '请输入地址' }]}>
      						<Input style={{ width: '100%' }} placeholder='请输入' />
      					</Form.Item>	
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="联系人" name='contact' rules={[{ required: true, message: '请输入联系人' }]}>
      						<Input style={{ width: '100%' }} placeholder='请输入' />
      					</Form.Item>	
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="联系电话" name='contactPhone' rules={[{ required: true, message: '请输入联系电话' }, { validator: (rule, value, callback) => this.validtel(rule, value, callback) }]}>
      						<InputNumber style={{ width: '100%' }} placeholder='请输入' />
      					</Form.Item>	
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="人数限制" name='userLimit' rules={[{ required: true, message: '请输入人数限制' }]}>
      						<InputNumber style={{ width: '100%' }} placeholder='请输入' />
      					</Form.Item>	
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="到期时间" name='deadline' rules={[{ required: true, message: '请选择时间' }]}>
      						<DatePicker style={{ width: '100%' }} locale={locale} showTime placeholder='请选择日期' />
      					</Form.Item>	
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="到期前提醒" name='noticeDay' rules={[{ required: true, message: '请输入提醒天数' }]}>
      						<InputNumber style={{ width: '100%' }} placeholder='请输入' />
      					</Form.Item>	
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="测试次数" name='assessmentNumber' rules={[{ required: true, message: '请输入测试次数' }]}>
      						<InputNumber style={{ width: '100%' }} placeholder='请输入' />
      					</Form.Item>	
      				</Col>
      				</Row>
    		)
    	}
		return(
			<div className="media-body">
			<div className="seacher-blcok">    		
    			<Input value={this.state.name} onChange={this.getname} className="seracherinpuy" placeholder="请输入名称" />
    			<Button type="primary" className="seracherbutton" onClick={this.seracher} icon={<SearchOutlined />}>搜索</Button>
    		</div>
			<div className="operation-block">
				<Button type="primary" className="seracherbutton" onClick={this.add} icon={<PlusOutlined />}>新增</Button>
        		<Button type="primary" danger className="seracherbutton marginle" onClick={this.del} icon={<DeleteOutlined />}>删除</Button>
			</div>
			 <Table columns={this.state.columns} pagination={false} scroll={{y: this.state.height }} rowSelection={{ ...rowSelection }} dataSource={this.state.data} />
			 <Modal title={this.state.vtitle} visible={this.state.visible} width="730px" onOk={this.otherBtnClick} onCancel={this.cancel} okText="确定" cancelText="取消">
       			<div className="model-top">
       			<Form {...layout} initialValues={{ isTop: 1 }} ref={this.formRef}>
       			<Row className="dictcontent" gutter={8}>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="机构名称" name='name' rules={[{ required: true, message: '请输入名称' }]}>
              				<Input style={{ width: '100%' }} placeholder='请输入' />
            			</Form.Item>
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="顶级机构" name='isTop'>
            				<Radio.Group onChange={this.handleProvinceChange}>
      							<Radio value={1}>是</Radio>
      							<Radio value={0}>否</Radio>
    						</Radio.Group>
            			</Form.Item>
      				</Col>
      				{istops}
      				<Col className="gutter-row" span={12}>
      				<Form.Item label="排序" name='orderno' rules={[{ required: false, message: '请输入联系电话' }, { validator: (rule, value, callback) => this.validsort(rule, value, callback) }]}>
      					<InputNumber style={{ width: '100%' }} placeholder='请输入' />
      				</Form.Item>	
      			</Col>
            	</Row>
      			</Form>
      			</div>
    		</Modal>
			</div>
		);
	}
	add = () =>{
		this.setState({
			visible:true,
			vtitle:'新增',
			isTop:1
		})
		
	}
	del = () =>{
		
	}
	handleProvinceChange = (e) =>{
		this.setState({
  			isTop:e.target.value,
  		})
	}
	otherBtnClick = () =>{
		this.formRef.current.validateFields().then((values) => {
  			
  			var obj = JSON.parse(JSON.stringify(values))
  			if(obj.isTop == 1){
  				obj.pid = 0
  			}
			obj.deadline = moment(obj.deadline).format("YYYY-MM-DD HH:mm:ss")
  			console.log(obj)
//			institutionsadd()
  		})	
	}
	cancel = () =>{
		this.formRef.current.resetFields()
		this.setState({
			visible:false,
		})
	}
	validsort = (rule, value, callback) =>{
		if(value == '' || value == null){
			callback()
		}else {
			var string = value + ''
			if(string.length > 9){
				callback('排序数不能大于9位')
			}else{
				callback()
			}
			
		} 
	}
	validtel = (rule, value, callback) =>{
		if(value == '' || value == null){
			callback("请输入联系方式")
		}else{
			let isMobilePhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
          	let isFixMob = /^0?1[3|4|5|7|8|9][0-9]\d{8}$/
          	if (isFixMob.test(value) || isMobilePhone.test(value)) {
            	callback()
          	} else {
            	callback('请输入正确的联系方式')
          	}
		}
	}
	eduit = (record) =>{
		
	}
	delinner = (record) =>{
		
	}
	getname = (e) =>{
		this.setState({
			name: e.target.value,
		});
	}
	getdata(){
		institutionschoose().then(res=>{
			this.setState({
				treeData:res.data.data
			})
		})
	}
	getlist = () =>{
		var a={
			"name":this.state.name
		}
  	institutionslist(a).then(res=>{
  		this.setState({
			data: res.data.data,
			total:res.data.total,
			selectedRowKeys:[],
			selectedRows:[]		
		});
  	})
	}
	componentDidMount() {
		this.getlist()
		this.getdata()
	}
}
export default institutions;