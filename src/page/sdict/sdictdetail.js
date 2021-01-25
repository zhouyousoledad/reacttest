import React, { Component,createRef } from 'react';
import ReactDOM from 'react-dom';
import { dictadddetail,dictdetail,dicteduitdetail,dictdeletedetail } from '../../axios/api';
import './sdictdetail.css';
import { Table, Row, Col, Input, Button, Modal, Form,message} from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined,ExclamationCircleOutlined,EditOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class Homefour extends Component {
	formRef = React.createRef();
	constructor(props){
		super(props)
		this.ref = createRef();
		this.columns = [{
		title: '字典标签',
		key: 'label',
		width: 150,
		dataIndex: 'label',
	},
	{
		title: '字典值',
		width: 150,
		key: 'value',
		dataIndex: 'value',
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
			selectedRowKeys:[],
			selectedRows:[],
			tabledata:[],
			vtitle:'添加',
			value: 'Hello Runoob!',
			name:'',
			page:1,
			size:10,
			total:0,
			id:''
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
    	<div>
    	<Table
        columns={this.columns}
        dataSource={this.state.tabledata}
        scroll={{y: 300 }}
        pagination={{ 
        	defaultPageSize:this.state.size,
        	total:this.state.total,
        	showTotal: () => '共'+this.state.total+'条',
        	onChange:this.onChange
        }}
        rowSelection={rowSelection}
      />
      <Modal title={this.state.vtitle} visible={this.props.visible} onOk={this.otherBtnClick} onCancel={this.cancel} okText="确定" cancelText="取消">
<Form {...layout} ref={this.formRef}>
            <Form.Item label="字典标签" name='label' rules={[{required: true, validator: this.validateName}]}>
              <Input placeholder='请输入' />
            </Form.Item>
			<Form.Item label="字典值" name='value' rules={[{required: true, validator: this.validateDesign}]}>
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item label="排序" name='sort'>
              <Input type="number" placeholder='请输入' />
            </Form.Item>
      </Form>
      </Modal>

    	</div>
    )
}
validateName = (rule, value) => {
        return new Promise(async (resolve, reject) => {
            if (!value) {
                await reject('请输入标签名')
            } else if (value.length > 50) {
                await reject('标签名长度不能大于50位')
            } else {
                await resolve()
            }
        })
    }
validateDesign = (rule, value) => {
        return new Promise(async (resolve, reject) => {
            if (!value) {
                await reject('请输入字典值')
            } else if (value.length > 50) {
                await reject('描述长度不能大于50位')
            } else {
                await resolve()
            }
        })
    }
onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({
			selectedRowKeys,
			selectedRows
		});		
};
otherBtnClick = () => {
		this.formRef.current.validateFields().then((values) => {
			
			if(this.state.id == '' || this.state.id == null){
				dictadddetail(values).then(res=>{
				if(res.data.code == 200){
					message.success('添加成功');
					this.setState({ 
	 					page:1,
	 					id:'',
	 				},() => {
	 					this.cancel()
	 					this.gettable()
  				});
				}else{
					message.error(res.data.msg);
				}
			})
			}else{
				var obj = JSON.parse(JSON.stringify(values))
				obj.id = this.state.id
				dicteduitdetail(obj).then(res=>{
				if(res.data.code == 200){
					message.success('修改成功');
					this.setState({ 
	 					id:'',
	 				},() => {
	 					this.cancel()
	 					this.gettable()
  				});
				}else{
					message.error(res.data.msg);
				}
			})
			}
			
		}).catch((info) => {

		});
	}
onChange = (page) => {
  	this.setState({
  		page:page
  	})
  	this.getlist()
  }
getlist =(name)=>{
	 this.setState({ 
	 	name:name,
	 	page:1
	 },() => {
	 	this.gettable()
  });
}
gettable = () =>{
	var a = {
		"page":this.state.page,
		"size":this.state.size,
		"name":this.state.name
	}
	dictdetail(a).then(res=>{
		this.setState({ 
	 	tabledata:res.data.data,
	 	total:res.data.total
	 });
	})
}
eduitdict = (row) =>{
	var _this = this
	this.props.pfn(true)
	this.setState({ 
	 	id:row._id
	});
	setTimeout(()=>{
		this.formRef.current.setFieldsValue({
			'label':row.label,
			'value':row.value,
			'sort':row.sort
		})
	},0)

	
//	this.formRef.current.setFieldsValue({
//		
//	})
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
			dictdeletedetail(a).then(res=>{
				message.success('删除成功');
				_this.gettable()
			})
    		},
    		onCancel() {
      		
    		},
  		});

}
cancel = () =>{
	this.formRef.current.resetFields()
	this.props.pfn(false)
}

}
export default Homefour