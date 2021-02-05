//home.js
import React, {
	Component,createRef
} from 'react';
import { Table, Input, Modal, Button, message, DatePicker} from 'antd';
import { SearchOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { commentslist,commentsdelete } from '../../axios/comments';
import './index.css';
const { confirm } = Modal;
class Homethree extends Component {
	formRef = React.createRef();
	constructor ( props ) {
    super(props)
    this.state = {
    	total:0,
    	page:1,
		size:10,
		height:document.body.clientHeight - 366,
		name:'',
		time:'',
		id:'',
		vtitle:'',
		visible:false,
    	selectedRowKeys:[],
		selectedRows:[],
    	columns:[
  {
    title: '评论人',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '评论时间',
    dataIndex: 'commentsTime',
    key: 'commentsTime',
  },
  {
  	title:'评论内容',
  	dataIndex:'content',
  	key:'content'
  },{
	title: '操作',
	key: 'operation',
	fixed: 'right',
	width: 310,
	render: (text, record) => (
		<div>
        <Button type="primary" danger className="seracherbutton" onClick={() => this.delinnerdict(record)} icon={<DeleteOutlined />}>删除</Button>
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
    			<Input value={this.state.name} onChange={this.updateStateProp} className="seracherinpuy" placeholder="请输入评论人" />
    			<DatePicker className="seracherinpuy" placeholder="请选择评论日期" onChange={this.onChangetime} />
    			<Button type="primary" className="seracherbutton" onClick={this.seracher} icon={<SearchOutlined />}>搜索</Button>
    		</div>
    		<div className="seacher-buttons">
        		<Button type="primary" danger className="seracherbutton" onClick={this.del} icon={<DeleteOutlined />}>删除</Button>
    		</div>
    		<Table dataSource={this.state.data} columns={this.state.columns} scroll={{y: this.state.height }} rowSelection={rowSelection}
    			pagination={{
        			defaultPageSize:5,
        			total:this.state.total,
        			showTotal: () => '共'+this.state.total+'条',
        			onChange:this.onChange
        		}} />
    	</div>
    )
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
			commentsdelete(a).then(res=>{
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
  del = () => {
  	var _this = this
  	var arr = []
  	if(_this.state.selectedRows.length == 0){
  		message.error('请选择数据');
  	}else{
  		confirm({
    		title: '提示',
    		icon: <ExclamationCircleOutlined />,
    		content: '您确定要删除这些数据吗？',
    		okText: '确定',
    		cancelText: '取消',
    		onOk() {
				_this.state.selectedRows.forEach(v=>{
			arr.push(v._id)
		})
		var a={
			"id":arr.join(',')
		}
		commentsdelete(a).then(res=>{
			message.success('删除成功');
			_this.getlist()
		})
    		},
    		onCancel() {
      		
    		},
  	});
  		
  	}
  }
  onChange = (page) => {
  	this.setState({
  		page:page
  	})
  }
  onChangetime = (date, dateString) => {
  	this.setState({
  		time:dateString
  	})
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
	this.setState({
		selectedRowKeys,
		selectedRows
	});		
  }

  getlist=()=>{
  	var a={
		"page":this.state.page,
		"size":this.state.size,
		"userName":this.state.name,
		"commentsTime":this.state.time
	}
  	commentslist(a).then(res=>{
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