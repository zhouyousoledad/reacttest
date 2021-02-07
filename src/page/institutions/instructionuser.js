import React, {
	Component,
	createRef
} from 'react';
import ReactDOM from 'react-dom';
import { institutionslist, institutionschoose, institutionuseradd,institutionusereduit, institutionuserlist,institutionuserdelete, institutionuseropen } from '../../axios/institutions';
import './institutions.css';
import { Table, Row, Col, Input, Button, Modal, Form, message, Tree,TreeSelect,Radio,InputNumber,Switch } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { TextArea } = Input;
const { TreeNode } = TreeSelect;

class Homefour extends Component {
	formRef = React.createRef();
	constructor(props) {
		super(props)
		this.child = createRef();
		this.state = {
			name: '',
			nickname: '',
			tel: '',
			vtitle: '新增',
			visible: false,
			height: document.body.clientHeight - 366,
			selectedRowKeys: [],
			selectedRows: [],
			tabledata: [],
			data: [],
			deptData:[],
			id: '',
			pid: '',
			page: 1,
			size: 10,
			total: 0,
			columns: [{
					title: '昵称',
					dataIndex: 'nickname',
					key: 'nickname',
				},
				{
					title: '所属机构',
					dataIndex: 'deptname',
					key: 'deptname'
				}, {
					title: '电话',
					dataIndex: 'tel',
					key: 'tel'
				}, {
					title: '邮箱',
					dataIndex: 'email',
					key: 'email'
				}, {
					title: '性别',
					dataIndex: 'sex',
					key: 'sex',
					render: (text, record) => (
						<div>
							{
								record.sex == 1 ?
								<span>男</span>
								:
								<span>女</span>
							}
      					</div>
					)
				}, {
					title: '是否是管理员',
					dataIndex: 'admin',
					key: 'admin',
					render: (text, record) => (
						<div>
							{
								record.admin == 1 ?
								<span>是</span>
								:
								<span>否</span>
							}
      					</div>
					)
				}, {
					title: '状态',
					dataIndex: 'enabled',
					key: 'enabled',
					render: (text, record) => (
						<div>
							{
								record.enabled == 1 ?
								<Switch defaultChecked onChange={() => this.onChangeSwitch(record)} />
								:
								<Switch onChange={() => this.onChangeSwitch(record)} />
							}
      					</div>
					)
				}, {
					title: '备注',
					dataIndex: 'remarks',
					key: 'remarks'
				}, {
					title: '操作',
					key: 'operation',
					fixed: 'right',
					width: 230,
					render: (text, record) => (
						<div>
        <Button type="primary" className="seracherbutton" onClick={() => this.eduit(record)} icon={<EditOutlined />}>编辑</Button>
        <Button type="primary" danger className="seracherbutton marginle" onClick={() => this.delinner(record)} icon={<DeleteOutlined />}>删除</Button>
      </div>
					)
				}
			],
		}
	}
	render() {
		const {
			selectedRowKeys
		} = this.state;

		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			hideDefaultSelections: true,
		};
		const layout = {
			labelCol: {
				span: 8,
			},
			wrapperCol: {
				span: 30,
			},
		};

		const validateName = (rule, value) => {
			return new Promise(async(resolve, reject) => {
				if(!value) {
					await reject('必填项不能为空')
				} else if(value.length > 50) {
					await reject('必填项的长度不能大于50位')
				} else {
					await resolve()
				}
			})
		}
		return(
			<div className="dictlcass">
    <div className="usercontent">
      <div className="usercontent-left clearfix">
        <div className="dictinner">
        <div className="marginbo">
        <Input value={this.state.name} onChange={this.updateStateProp} className="serachertreeinpuy" placeholder="请输入名称" />
        <Button type="primary" className="seracherbutton" onClick={this.serachertree} icon={<SearchOutlined />}>搜索</Button>
        </div>
         <Tree treeData={this.state.data} defaultExpandAll onSelect={this.clicktree} />
        </div>
      </div>
      <div className="usercontent-right clearfix">
        <div className="dictinner">
        	<div className="user-seaher">
        		<Input value={this.state.nickname} onChange={this.username} className="username" placeholder="请输入名称" />
        		<Input value={this.state.tel} onChange={this.telphone} className="username" placeholder="请输入电话" />
        		<Button type="primary" className="seracherbutton" onClick={this.seracher} icon={<SearchOutlined />}>搜索</Button>
        	</div>
        	<div className="user-optionbutton">
        		<Button type="primary" className="addbut" onClick={this.add} icon={<PlusOutlined />}>添加</Button>
        		<Button type="danger" onClick={this.del} icon={<DeleteOutlined />}>删除</Button>
        	</div>
        	<Table dataSource={this.state.tabledata} columns={this.state.columns} scroll={{y: this.state.height }} rowSelection={rowSelection}
    			pagination={{
        			defaultPageSize:this.state.size,
        			total:this.state.total,
        			showTotal: () => '共'+this.state.total+'条',
        			onChange:this.onChange
        		}} />
        	<Modal title={this.state.vtitle} visible={this.state.visible} width="730px" onOk={this.otherBtnClick} onCancel={this.cancel} okText="确定" cancelText="取消">
       			<div className="model-top">
       			<Form {...layout} ref={this.formRef}>
       			<Row className="dictcontent" gutter={8}>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="昵称" name='nickname' rules={[{ required: true, message: '请输入昵称' }]}>
              				<Input style={{ width: '100%' }} placeholder='请输入' />
            			</Form.Item>
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="所属机构" name='dept' rules={[{ required: true, message: '请选择' }]}>
              				<TreeSelect showSearch style={{ width: '100%' }} treeData={this.state.deptData} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="请选择上级" allowClear treeDefaultExpandAll>
       
      						</TreeSelect>
            			</Form.Item>
      				</Col>
      				
      				<Col className="gutter-row" span={12}>
      				<Form.Item label="电话" name='tel' rules={[{ required: true, message: '请输入联系电话' }, { validator: (rule, value, callback) => this.validtel(rule, value, callback) }]}>
      					<InputNumber style={{ width: '100%' }} placeholder='请输入' />
      				</Form.Item>	
      			</Col>
      			<Col className="gutter-row" span={12}>
      				<Form.Item label="邮箱" name='email' rules={[{ required: true, message: '请输入邮箱地址' }, { validator: (rule, value, callback) => this.validemail(rule, value, callback) }]}>
      					<Input style={{ width: '100%' }} placeholder='请输入' />
      				</Form.Item>	
      			</Col>
      			<Col className="gutter-row" span={12}>
      				<Form.Item label="性别" name='sex' rules={[{ required: true, message: '请选择' }]}>
            			<Radio.Group>
      						<Radio value={1}>男</Radio>
      						<Radio value={0}>女</Radio>
    					</Radio.Group>
            		</Form.Item>
      			</Col>
      			<Col className="gutter-row" span={12}>
      				<Form.Item label="是否为管理员" name='admin' rules={[{ required: true, message: '请选择' }]}>
            			<Radio.Group>
      						<Radio value={1}>是</Radio>
      						<Radio value={0}>否</Radio>
    					</Radio.Group>
            		</Form.Item>
      			</Col>	
      			<Col className="gutter-row" span={12}>
      				<Form.Item label="账户" name='account' rules={[{ required: true, message: '请输入账户' }]}>
              			<Input style={{ width: '100%' }} placeholder='请输入' />
            		</Form.Item>
      			</Col>
      			<Col className="gutter-row" span={12}>
      				<Form.Item label="备注" name='remark' rules={[{ required: false, message: '请输入备注' }, { validator: (rule, value, callback) => this.validremarks(rule, value, callback) }]}>
            			<TextArea placeholder='请输入' rows={4} />
            		</Form.Item>
      			</Col>
            	</Row>
      			</Form>
      			</div>
    		</Modal>	
        </div>
      </div>
    </div>
    
    </div>
		)
	}
	validtel = (rule, value, callback) => {
		if(value == '' || value == null){
			 return Promise.reject("请输入联系方式")
		}else{
			let isMobilePhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
          	let isFixMob = /^0?1[3|4|5|7|8|9][0-9]\d{8}$/
          	if (isFixMob.test(value) || isMobilePhone.test(value)) {
            	return Promise.resolve()
          	} else {
            	return Promise.reject('请输入正确的联系方式')
          	}
		}
	}
	validemail = (rule, value, callback) => {
		if(value == '' || value == null){
			 return Promise.reject('请输入邮箱')
		}else{
			var reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
          	if (!reg.test(value)) {
            	return Promise.reject('请输入正确的邮箱')
          	} else {
            	return Promise.resolve()
          	}
		}
	}
	validremarks = (rule, value, callback) => {
		if(value == '' || value == null){
			return Promise.resolve()
		}else if(value.length > 255){
			return Promise.reject('备注不超过255个字符')
		}
	}
	updateStateProp = (e) => {
		this.setState({
			name: e.target.value,
		});
	}
	serachertree = (e) => {
		this.gettree()
	}
	clicktree = (data) => {
		this.setState({
			page:1,
			pid:data[0]
		})
		setTimeout(()=>{
			this.getlist()
		},0)
		
	}
	onChangeSwitch = (data) =>{
		console.log(data)
		var _this = this
		confirm({
    		title: '提示',
    		icon: <ExclamationCircleOutlined />,
    		content: '您确定要执行这项操作吗？',
    		okText: '确定',
    		cancelText: '取消',
    		onOk() {
    			var a={
    				"id":data._id,
    				"enabled":!data.enabled
    			}
    			institutionuseropen(a).then(res=>{
    				message.success('操作成功');
    				_this.getlist()
    			})
    		},
    		onCancel() {
    			_this.setState({
					tabledata:[]
				})
      			_this.getlist()
    		},
  		});
	}
	username = (e) => {
		this.setState({
			nickname: e.target.value,
		});
	}
	telphone = (e) => {
		this.setState({
			tel: e.target.value,
		});
	}
	gettree = () => {
		var a = {
			"name": this.state.name
		}
		institutionslist(a).then(res => {

			console.log(res.data.data)
			this.setState({
				data: this.settree(res.data.data)
			});
		})
	}
	otherBtnClick = () => { //确定
		this.formRef.current.validateFields().then((values) => {
			if(this.state.id == '' || this.state.id == null){
				institutionuseradd(values).then(res=>{
					if(res.data.code == 200){
						message.success('添加成功');
						this.getlist()
						this.cancel()
					}
				})
			}else{
				var obj = JSON.parse(JSON.stringify(values))
				obj.id = this.state.id
				institutionusereduit(obj).then(res=>{
					if(res.data.code == 200){
						message.success('修改成功');
						this.getlist()
						this.cancel()
					}
				})
			}
			console.log(values)
		})	
	}
	cancel = () => { //取消
		this.setState({
			visible:false
		})
	}
	add = () => {
		this.setState({
			visible:true,
			vtitle:'新增',
		})
	}
	eduit = (record) => {
		this.setState({
			visible:true,
			vtitle:'编辑',
			id:record._id,
		})
		setTimeout(()=>{
			this.formRef.current.setFieldsValue(record)
		},0)
	}
	delinner = (record) =>{
		var _this = this
		confirm({
    		title: '提示',
    		icon: <ExclamationCircleOutlined />,
    		content: '您确定要删除这条数据吗？',
    		okText: '确定',
    		cancelText: '取消',
    		onOk() {
			var a={
				"id":record._id
			}
			institutionuserdelete(a).then(res=>{
				message.success('删除成功');
				_this.getlist()
			})
    		},
    		onCancel() {
      		
    		},
  		});
	}
	del = () => {
		var _this = this
  		var arr = []
  		if(_this.state.selectedRows.length == 0){
  			message.error('请选择数据');
  		}else{
  			confirm({
    			title: '提示',
    			icon: <ExclamationCircleOutlined />,
    			content: '您确定要删除选中的数据吗？',
    			okText: '确定',
    			cancelText: '取消',
    			onOk() {
					_this.state.selectedRows.forEach(v=>{
						arr.push(v._id)
					})
					var a={
						"id":arr.join(',')
					}
					institutionuserdelete(a).then(res=>{
						if(res.data.code == 200){
							message.success('删除成功');
							_this.getlist()
						}else{
							message.error(res.data.msg);
						}
						
					})
    			},
    			onCancel() {
      		
    			},
  			});
  		}
	}
	settree = (tree) => {
		let arr = [];
		let _this = this
		if(tree.length != 0) {
			tree.forEach(function(item, index, array) {
				let obj = {};
				obj.title = item.name
				obj.key = item._id;
				if(item.children) {
					obj.children = _this.settree(item.children);
				}
				arr.push(obj);
			});
		}
		return arr
	}
	onChange = (page) => {
		this.setState({
			page: page
		})
	}
	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({
			selectedRowKeys,
			selectedRows
		});
	}
	getdata = () => {
		institutionschoose().then(res=>{
			this.setState({
				deptData:res.data.data
			})
		})
	}
	seracher = () =>{
		this.setState({
			page:1
		})
		this.getlist()
	}
	getlist = () =>{
		var a={
			"page":this.state.page,
			"size":this.state.size,
			"nickname":this.state.nickname,
			"tel":this.state.tel,
			"dept":this.state.pid
		}
		institutionuserlist(a).then(res=>{
			this.setState({
				tabledata:res.data.data,
				total:res.data.total
			})
			console.log(res)
		})
	}
	componentDidMount() {
		this.gettree()
		this.getdata()
		this.getlist()
	}
}
export default Homefour