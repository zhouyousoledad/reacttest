import React, {
	Component,createRef
} from 'react';
import { Table, Space,Button,Row,Col,Form,message,Select,Input,Modal } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import './institutions.css';
const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;
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
					title: 'Name',
					dataIndex: 'name',
					key: 'name',
				},
				{
					title: 'Age',
					dataIndex: 'age',
					key: 'age',
					width: '12%',
				},
				{
					title: 'Address',
					dataIndex: 'address',
					width: '30%',
					key: 'address',
				},
			],
			data:[],
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
		return(
			<div className="media-body">
			<div className="operation-block">
				<Button type="primary" className="seracherbutton" onClick={this.add} icon={<PlusOutlined />}>新增</Button>
        		<Button type="primary" danger className="seracherbutton marginle" onClick={this.del} icon={<DeleteOutlined />}>删除</Button>
			</div>
			 <Table columns={this.state.columns} pagination={false} scroll={{y: 300 }} rowSelection={{ ...rowSelection }} dataSource={this.state.data} />
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
		);
	}
	add = () =>{
		this.setState({
			visible:true,
			vtitle:'新增'
		})
	}
	del = () =>{
		
	}
	otherBtnClick = () =>{
		
	}
	cancel = () =>{
		this.formRef.current.resetFields()
		this.setState({
			visible:false,
		})
	}
	componentDidMount() {

	}
}
export default institutions;