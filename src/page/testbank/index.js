import React, {
	Component,createRef
} from 'react';
import { Table, Input, Button, Modal,Select,message} from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { banklist,bankdelete } from '../../axios/testbank';
import Addbank from './addbank.js'
import './taskbank.css';
const { Option } = Select;
const { confirm } = Modal;

class Testbank extends Component {
	formRef = React.createRef();
	constructor ( props ) {
    super(props)
    this.child = createRef();
    this.state = {
    	total:0,
    	page:1,
		size:10,
		name:'',
		id:'',
		height:document.body.clientHeight - 366,
		vtitle:'',
		visible:false,
    	selectedRowKeys:[],
		selectedRows:[],
    	columns:[
  {
    title: '题目',
    dataIndex: 'content',
    key: 'content',
    render:(text,record) => (
    	<div  dangerouslySetInnerHTML = {{__html:record.content}}></div>
    )
  },
  {
  	title:'标签',
  	dataIndex:'tagName',
  	key:'tagName'
  },{
  	title:'题目类型',
  	dataIndex:'qtypeName',
  	key:'qtypeName'
  },{
  	title:'选项类型',
  	dataIndex:'anstypeName',
  	key:'anstypeName'
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
    return (
    	<div className="testbank-body">
    		<div className="seacher-blcok">    		
    			<Input value={this.state.name} onChange={this.updateStateProp} className="seracherinpuy" placeholder="请输入名称" />
    			<Button type="primary" className="seracherbutton" onClick={this.seracher} icon={<SearchOutlined />}>搜索</Button>
    		</div>
    		<div className="seacher-buttons">
    			<Button type="primary" className="seracherbutton" onClick={this.adddict} icon={<PlusOutlined />}>新增</Button>
        		<Button type="primary" danger className="seracherbutton marginle" onClick={this.del} icon={<DeleteOutlined />}>删除</Button>
    		</div>
    		<Table dataSource={this.state.data} columns={this.state.columns} scroll={{y: this.state.height }} rowSelection={rowSelection}
    			pagination={{
        			defaultPageSize:5,
        			total:this.state.total,
        			showTotal: () => '共'+this.state.total+'条',
        			onChange:this.onChange
        		}} />
        		{ 
        			this.state.visible ?
        			<div className="dia-log">
        				<Addbank ref={this.child} cancel={this.cancel}></Addbank>
        			</div>
        			:''
				}
        
    	</div>
    )
  }
  eduitdict = (row) =>{
	this.setState({
		visible:true
	},()=>{
		this.child.current.setfirst(row)
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
			var a={
				"id":row._id
			}
			bankdelete(a).then(res=>{
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
		id:''
	})
  }
  cancel = (data) =>{
  	this.setState({
		visible:false,
	},()=>{
		if(data){
			this.getlist()
		}
	})
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
		bankdelete(a).then(res=>{
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
	}
	banklist(a).then(res=>{
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
export default Testbank