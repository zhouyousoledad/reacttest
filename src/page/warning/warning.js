//home.js
import React, {
	Component,createRef
} from 'react';
import { Table, Input, Button, Modal, Form,message,Select,Row, Col,} from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { warninglist,warningadd,warningeduit,warningdelete } from '../../axios/warning';

import './warning.css';
const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;

class Homethree extends Component {
	formRef = React.createRef();
	constructor ( props ) {
    super(props)
    this.state = {
    	total:0,
    	page:1,
		size:10,
		name:'',
		id:'',
		vtitle:'',
		visible:false,
    	selectedRowKeys:[],
		selectedRows:[],
    	columns:[
  {
    title: '预警名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
  	title:'预警内容',
  	dataIndex:'content',
  	key:'content'
  },{
	title: '操作',
	key: 'operation',
	fixed: 'right',
	width: 310,
	render: (text, record) => (
		<div>
        <Button type="primary" className="seracherbutton" onClick={() => this.eduitdict(record)} icon={<EditOutlined />}>编辑</Button>
        <Button type="primary" danger className="seracherbutton marginle" onClick={() => this.delinnerdict(record)} icon={<DeleteOutlined />}>删除</Button>
      </div>
	)
	}
],
    	data : []
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

    return (
    	<div className="media-body">
    		<div className="seacher-blcok">    		
    			<Input value={this.state.name} onChange={this.updateStateProp} className="seracherinpuy" placeholder="请输入名称" />
    			<Button type="primary" className="seracherbutton" onClick={this.seracher} icon={<SearchOutlined />}>搜索</Button>
    		</div>
    		<div className="seacher-buttons">
    			<Button type="primary" className="seracherbutton" onClick={this.adddict} icon={<PlusOutlined />}>新增</Button>
        		<Button type="primary" danger className="seracherbutton marginle" onClick={this.del} icon={<DeleteOutlined />}>删除</Button>
    		</div>
    		<Table dataSource={this.state.data} columns={this.state.columns} scroll={{y: 300 }} rowSelection={rowSelection}
    			pagination={{
        			defaultPageSize:5,
        			total:this.state.total,
        			showTotal: () => '共'+this.state.total+'条',
        			onChange:this.onChange
        		}} />
        	<Modal title={this.state.vtitle} visible={this.state.visible} width="730px" onOk={this.otherBtnClick} onCancel={this.cancel} okText="确定" cancelText="取消">
       			<div className="model-top">
       			<Form {...layout} ref={this.formRef}>
       			<Row className="dictcontent" gutter={8}>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="预警名称" name='name' rules={[{ required: true, message: '请选择名称' }]}>
              				<Input placeholder='请输入' />
            			</Form.Item>
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="预警内容" name='content' rules={[{ required: true, message: '请选择名称' }]}>
            				<TextArea placeholder='请输入' rows={4} />
            			</Form.Item>
      				</Col>
            	</Row>
      			</Form>
      			</div>
    		</Modal>
    	</div>
    )
  }

  eduitdict = (row) =>{
  	this.setState({
		visible:true,
		vtitle:'修改',
		id:row._id,
	});
	
	setTimeout(()=>{
		this.formRef.current.setFieldsValue(row)
	},0)
  }
  delinnerdict = (row) =>{
  	var _this = this
		confirm({
    		title: '提示',
    		icon: <ExclamationCircleOutlined />,
    		content: '您确定要删除这条数据吗？',
    		okText: '确定',
    		cancelText: '取消',
    		onOk() {
			var a={
				"id":row._id
			}
			warningdelete(a).then(res=>{
				message.success('删除成功');
				_this.getlist()
			})
    		},
    		onCancel() {
      		
    		},
  	});
  }
  updateStateProp = (e) =>{
		this.setState({
			name: e.target.value,
		});
	}
  seracher = () => {  //搜索
  	this.setState({
  		page:1
  	})
  	this.getlist()
  }
  adddict = () => { //新增
  	this.setState({
  		visible:true,
  		vtitle:'新增',
  		id:''
  	})
  }
  del = () => {
  	var _this = this
  	var arr = []
  	if(_this.state.selectedRows.length == 0){
  		message.error('请选择数据');
  	}else{
  		_this.state.selectedRows.forEach(v=>{
			arr.push(v._id)
		})
		var a={
			"id":arr.join(',')
		}
		warningdelete(a).then(res=>{
			message.success('删除成功');
			_this.getlist()
		})
  	}
  }
  onChange = (page) => {
  	this.setState({
  		page:page
  	})
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
	this.setState({
		selectedRowKeys,
		selectedRows
	});		
  }
  otherBtnClick = () => {
  	this.formRef.current.validateFields().then((values) => {
  		console.log(values)
				if(this.state.id == '' || this.state.id == null){ //添加
					warningadd(values).then(res=>{
						message.success('添加成功');
	 					this.cancel()
	 					this.getlist()
					})
				}else{ //修改
					var obj = JSON.parse(JSON.stringify(values))
					obj.id = this.state.id
					warningeduit(obj).then(res=>{
						message.success('编辑成功');
	 					this.cancel()
	 					this.getlist()
					})
				}
			
			
  	})	
  }

  cancel = () => {
  	this.formRef.current.resetFields()
  	this.setState({
		visible: false,
	})
  }

  getlist=()=>{
  	var a={
		"page":this.state.page,
		"size":this.state.size,
		"name":this.state.name
	}
  	warninglist(a).then(res=>{
  		this.setState({
			data: res.data.data,
			total:res.data.total,
			selectedRowKeys:[],
			selectedRows:[]		
		});
  	})
  }


  componentDidMount(){
  	this.getlist()
  }
}
export default Homethree