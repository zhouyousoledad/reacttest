import React, {
	Component,createRef
} from 'react';
import ReactDOM from 'react-dom';
import { typelist, typeadd, typeeduit, typedelete } from '../../axios/type';
import './type.css';
import { Table, Row, Col, Input, Button, Modal, Form, message } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import Details from './typedetail.js'
const { confirm } = Modal;
class Homefour extends Component {
	formRef = React.createRef();
	constructor(props) {
		super(props)
		this.child = createRef();
		this.columns = [{
		title: '分类名称',
		key: 'name',
		width: 150,
		dataIndex: 'name',
	},
	{
		title: '分类编码',
		width: 150,
		key: 'typeCode',
		dataIndex: 'typeCode',
	},
	{
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 250,
    render: (text, record) => (
    	<div>
        <Button type="primary" className="seracherbutton" onClick={() => this.eduitdict(record)} icon={<EditOutlined />}>编辑</Button>
        <Button type="primary" danger className="seracherbutton marginle" onClick={() => this.delinnerdict(record)} icon={<DeleteOutlined />}>删除</Button>
      </div>
    ),
  },
];
		this.state = {
			name:'',
			findname:'',
			vtitle:'新增',
			visible:false,
			selectedRowKeys:[],
			selectedRows:[],
			tabledata:[],
			id:'',
			pid:'',
			page:1,
			size:10,
			total:0,
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
        return new Promise(async (resolve, reject) => {
            if (!value) {
                await reject('必填项不能为空')
            } else if (value.length > 50) {
                await reject('必填项的长度不能大于50位')
            } else {
                await resolve()
            }
        })
    }
		return(
			<div className="dictlcass">
    <Row className="dictcontent" gutter={16}>
      <Col className="gutter-row dictleft" span={12}>
        <div className="dictinner">
        <div className="marginbo">
        <Input value={this.state.name} onChange={this.updateStateProp} className="seracherinpuy" placeholder="请输入名称" />
        <Button type="primary" className="seracherbutton" onClick={this.seracher} icon={<SearchOutlined />}>搜索</Button>
        </div>
        <div className="marginbo">
        <Button type="primary" className="seracherbutton" onClick={this.adddict} icon={<PlusOutlined />}>新增</Button>
        <Button type="primary" danger className="seracherbutton marginle" onClick={this.deloutdict} icon={<DeleteOutlined />}>删除</Button>
        </div>
        <Table
        columns={this.columns}
        dataSource={this.state.tabledata}
        scroll={{y: 300 }}
        onRow={record => {
    			return {
      			onClick: event => {
      				this.setState({
						pid: record._id,
					});
							setTimeout(()=>{
								this.child.current.getlist(record._id)
							},0)
      			}, // 点击行
    			};
  			}}
        pagination={{ 
        	defaultPageSize:this.state.size,
        	total:this.state.total,
        	showTotal: () => '共'+this.state.total+'条',
        	onChange:this.onChange
        }}
        rowSelection={rowSelection}
      />
        </div>
      </Col>
      <Col className="gutter-row dictright" span={12}>
        	<Details ref={this.child}></Details>
      </Col>
    </Row>
    <Modal title={this.state.vtitle} visible={this.state.visible} onOk={this.otherBtnClick} onCancel={this.cancel} okText="确定" cancelText="取消">
       <div className="model-top">
       <Form {...layout} ref={this.formRef}>
            <Form.Item label="分类名称" name='name' rules={[{required: true, validator: validateName}]}>
              <Input placeholder='请输入' />
            </Form.Item>
			<Form.Item label="分类编码" name='typeCode' rules={[{required: true, validator: validateName}]}>
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item label="排序" name='sort'>
              <Input type="number" placeholder='请输入' />
            </Form.Item>
      </Form>
      </div>
    </Modal>
    </div>
		)
	}
	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({
			selectedRowKeys,
			selectedRows
		});		
	};
	onChange = (page) => {
  	this.setState({
  		page:page
  	})
  	this.getlist()
  }
	otherBtnClick = () =>{
		this.formRef.current.validateFields().then((values) => {
			var obj = JSON.parse(JSON.stringify(values))
			obj.pid = 0
			if(this.state.id == '' || this.state.id == null){
				
			typeadd(obj).then(res=>{
				if(res.data.code == 200){
					message.success('添加成功');
					
					this.setState({ 
	 					page:1
	 				},() => {
	 					this.cancel()
	 					this.getlist()
  					});
				}
			})
			}else{
				obj.id = this.state.id
			typeeduit(obj).then(res=>{
				if(res.data.code == 200){
					message.success('编辑成功');
	 				this.cancel()
	 				this.getlist()
				}
			})
			}
			

		}).catch((info) => {

		});
	}
	cancel = () =>{
		this.formRef.current.resetFields()
		this.setState({ 
	 		visible:false,
	 		id:''
	 	});
	}
	updateStateProp = (e) =>{
		this.setState({
			name: e.target.value,
		});
	}
	seracher = (e) =>{
		this.setState({
			page: 1,
		});
		this.getlist()
	}
	adddict = () =>{
		this.setState({
			id: '',
			visible:true
		});
		
	}
	eduitdict = (row) =>{
		this.setState({
			visible:true,
			vtitle:'修改',
			id:row._id
		});
		setTimeout(()=>{
			this.formRef.current.setFieldsValue(row)
		},0)
		
	}
	deloutdict = () =>{
		var _this = this
			confirm({
    		title: '提示',
    		icon: <ExclamationCircleOutlined />,
    		content: '您确定要删除所选中的数据吗？',
    		okText: '确定',
    		cancelText: '取消',
    		onOk() {
      		var arr = []
      		
			_this.state.selectedRows.forEach(v=>{
				arr.push(v._id)
			})
			var a={
				"id":arr.join(',')
			}
			typedelete(a).then(res=>{
				message.success('删除成功');
				_this.getlist()
				_this.setState({
					pid:''
				})
			})
    		},
    		onCancel() {
      		
    		},
  		});
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
      		var arr = []
			var a={
				"id":row._id
			}
			typedelete(a).then(res=>{
				message.success('删除成功');
				_this.getlist()
				_this.setState({
					pid:''
				})
			})
    		},
    		onCancel() {
      		
    		},
  		});
	}
	getlist = () =>{
		var a={
			"page":this.state.page,
			"size":this.state.size,
			"name":this.state.name
		}
		typelist(a).then(res=>{
			this.setState({
				tabledata: res.data.data,
				total:res.data.total,
				selectedRowKeys:[],
				selectedRows:[]		
			});
		})
	}
	componentDidMount() {
		this.getlist()
	}
}
export default Homefour