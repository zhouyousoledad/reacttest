import React, {
	Component,
	createRef
} from 'react';
import ReactDOM from 'react-dom';
import { typedetail,typeadddetail,typeeduitdetail,typedeletedetail } from '../../axios/type';
import './type.css';
import { Table, Row, Col, Input, Button, Modal, Form, message, Select } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
const {
	confirm
} = Modal;
const {
	Option
} = Select;
const {
	TextArea
} = Input;
const children = [];
for(let i = 10; i < 36; i++) {
	children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
class ForwardRef extends Component {
	formRef = React.createRef();
	fileInput = React.createRef();
	constructor(props) {
		super(props);
		this.columns = [{
				title: '分类名称',
				key: 'name',
				width: 150,
				dataIndex: 'name',
			},
			{
				title: '排序',
				width: 150,
				key: 'sort',
				dataIndex: 'sort',
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
			pid: '',
			page: 1,
			size: 10,
			total: 0,
			id:'',
			vtitle: '新增',
			visible: false,
			tabledata: [],
			selectedRowKeys: [],
			selectedRows: [],
			imgurl: '',
			avat: {}
		};
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
		const {
			selectedRowKeys
		} = this.state;

		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			hideDefaultSelections: true,
		};
		return(
			<div className="dictinner-out">
        <div className="deatil-content">
        		<div className="deatil-head">
        				<span>分类详情</span>
        				{ 
        					this.state.pid ?<span className="right"><Button type="primary" size='small' onClick={this.add} className="seracherbutton" icon={<PlusOutlined />}>新增</Button></span>:''
								}
        		</div>
        		<div className="deatil-bottom">
        				{ 
        					this.state.pid ?
        					<div>
        					<Table columns={this.columns} dataSource={this.state.tabledata} scroll={{y: 300 }}
        pagination={{ 
        	defaultPageSize:5,
        	total:this.state.total,
        	showTotal: () => '共'+this.state.total+'条',
        	itemRender:this.onShowSizeChange
        }}
        rowSelection={rowSelection}
      />
        					</div>:
							<div className="detaul-tip"><span>点击分类查看详情</span></div>
						}
        		</div>
        </div>
        <input type="file" ref={this.fileInput} onChange={this.onGetFile} style={{display:'none'}} />
        <Modal title={this.state.vtitle} visible={this.state.visible} onOk={this.otherBtnClick} onCancel={this.cancel} okText="确定" cancelText="取消">
       <div className="model-top">
       <Form {...layout} ref={this.formRef}>
            <Form.Item label="分类名称" name='name' rules={[{required: true, validator: this.validateName}]}>
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item label="适用机构" name='institutions' rules={[{ required: true, message: '请选择机构' }]}>
            	<Select mode="multiple" allowClear showArrow="true" style={{ width: '100%' }} placeholder="请选择">
      				{children}
    			</Select>
            </Form.Item>
            
			<Form.Item label="排序" name='sort'>
              <Input placeholder='请输入' />
            </Form.Item>
            
            <Form.Item label="备注" name='remarks'>
            <TextArea placeholder='请输入' rows={4} />
            </Form.Item>
            <Form.Item label="上传图片" name='file'>
            	<div className="uploads" onClick={this.startup}>
            	{ 
        			this.state.imgurl == '' ? <PlusOutlined />:<img src={this.state.imgurl} />
				}
            	</div>
            </Form.Item>
      </Form>
      </div>
    </Modal>
        </div>
		);
	}
	startup = () => {
		this.fileInput.current.click()
	}
	onGetFile = (e) => {
		const _this = this
		const file = e.target.files[0];
		this.setState({
			avat: file
		})
		const fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onload = () => {
			this.setState({
				imgurl: fr.result
			});
		};
	}
	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({
			selectedRowKeys,
			selectedRows
		});
	};
	onShowSizeChange = (current, type, originalElement) => {
		if(type === 'prev') {
			return <a>上页</a>;
		}
		if(type === 'next') {
			return <a>下页</a>;
		}
		return originalElement;
	}
	validateName = (rule, value) => {
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
	getlist = (id) => {
		this.setState({
			pid: id,
		}, () => {
			this.gettable()
		});
	}
	gettable = () => {
		var a = {
			"page": this.state.page,
			"size": this.state.size,
			"pid": this.state.pid
		}
		typedetail(a).then(res => {
			console.log(res)
			this.setState({
				'tabledata': res.data.data,
				'total': res.data.total,
				'selectedRowKeys': [],
				'selectedRows': []
			});
		})
	}
	add = () => {
		this.setState({
			visible: true,
			id:''
		})
	}
	eduitdict = (record) =>{
		this.setState({
			visible:true,
			vtitle:'修改',
			id:record._id,
		});
		if(record.url){
			this.setState({
				imgurl:record.url
			})
		}
		setTimeout(()=>{
			this.formRef.current.setFieldsValue(record)
		},0)
	}
	delinnerdict= (row) =>{
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
			typedeletedetail(a).then(res=>{
				message.success('删除成功');
				_this.gettable()
			})
    		},
    		onCancel() {
      		
    		},
  		});
	}
	cancel = () => {
		this.formRef.current.resetFields()
		this.setState({
			visible: false,
			avat:{},
			imgurl:''
		})
	}
	otherBtnClick = () => {
	
		this.formRef.current.validateFields().then((values) => {
			console.log(values)
			var formData = new FormData()
			formData.append('name', values.name)
			formData.append('remarks', values.remarks)
			formData.append('sort', values.sort)
			formData.append('pid', this.state.pid)
			formData.append('institutions', values.institutions.join(','))
			if(this.state.avat.name == undefined){
			}else{
				formData.append('file', this.state.avat)
			}
			if(this.state.id == '' || this.state.id == null){
				typeadddetail(formData).then(res => {
				console.log(res)
				if(res.data.code == 200){
					message.success('添加成功');
					this.gettable()
					this.cancel()
				}
			})
			}else{
				formData.append("id",this.state.id)
				typeeduitdetail(formData).then(res => {
				console.log(res)
				if(res.data.code == 200){
					message.success('修改成功');
					this.gettable()
					this.cancel()
				}
			})
			}
			
		}).catch((info) => {

		});
	}
}
export default ForwardRef;