//home.js
import React, {
	Component,createRef
} from 'react';
import { Table, Input, Button, Modal, Form,message,Select,Row, Col,} from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { dictdetail } from '../../axios/api';
import { typecode } from '../../axios/type';
import { labeltree } from '../../axios/label';
import { filehead } from '../../axios/configuration';
import { medialist,mediaadd,mediaeduit,mediadelete } from '../../axios/media';

import './index.css';
const { Option,OptGroup } = Select;
const { confirm } = Modal;
const { TextArea } = Input;
const mediatype = [];
const classifiy = [];
const labelarr = []
class Homethree extends Component {
	formRef = React.createRef();
	fileInput = React.createRef();
	constructor ( props ) {
    super(props)
    this.state = {
    	systemType:'',
    	mediaType:'',
    	avat:{},
    	total:0,
    	page:1,
		size:10,
		classifiy:[],
		ground:[],
		medianame:'',
		fonts:'555',
		id:'',
		mediaselect:0,  //0代表文字 1代表图片视频音频
		vtitle:'',
		imgurl:'',
		visiblesee:false,
		visible:false,
    	selectedRowKeys:[],
		selectedRows:[],
		labeloption:[],
    	columns:[
  {
    title: '媒体名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '媒体类型',
    dataIndex: 'mediaName',
    key: 'mediaName',
  },
  {
    title: '标签',
    dataIndex: 'labelName',
    key: 'labelName',
  },{
  	title:"分类",
  	dataIndex:'typeName',
  	key:'typeName',
  },{
  	title:'备注',
  	dataIndex:'remarks',
  	key:'remarks'
  },{
	title: '操作',
	key: 'operation',
	fixed: 'right',
	width: 310,
	render: (text, record) => (
		<div>
		<Button type="primary" className="seebutton" onClick={() => this.see(record)} icon={<EyeOutlined />}>查看</Button>
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
	let fileupload
	if(this.state.imgurl && this.state.mediaselect == 0){
        fileupload = (<img src={this.state.imgurl} />)
    }else if(this.state.imgurl && this.state.mediaselect == 1){
        fileupload = (<p className="word">{this.state.imgurl}</p>)
    }else if(this.state.imgurl && this.state.mediaselect == 2){
        fileupload = (<p className="word">{this.state.imgurl}</p>)
    }else{
        fileupload = (<PlusOutlined />)
    }
    let detail
    if(this.state.mediaselect == 0){
    	detail = (<img src={this.state.imgurl} className="defaultimg" />)
    }else if(this.state.mediaselect == 2){
    	detail = (<div className="audios"><img src="/M6.jpg" className={this.state.visiblesee?'trash':''} /><audio id="myaduio" className="audio" autoplay="autoplay"><source src={this.state.imgurl}></source></audio></div>)
    }else if(this.state.mediaselect == 1){
    	detail = (<video id="myVideo" src={this.state.imgurl} autoplay="autoplay" loop="loop" />)
    }else if(this.state.mediaselect == 3){
    	detail = (<div>{this.state.fonts}</div>)
    }
    const districts = this.state.classifiy
    const ground = this.state.ground
    return (
    	<div className="media-body">
    		<div className="seacher-blcok">
    			<Select value={this.state.systemType || undefined} className="seracherinpuy" style={{ width: 150 }} allowClear placeholder="选择类型" onChange={this.Changeclass}>
      				{districts.map(name => <Option key={name._id}>{name.name[0]}</Option>)}
    			</Select>
    			<Select value={this.state.mediaType || undefined} style={{ width: 150 }} className="seracherinpuy" allowClear placeholder="选择媒体类型" onChange={this.Changemedia}>
      				{ground.map(name => <Option key={name.value}>{name.label}</Option>)}
      				
    			</Select>
    			
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
        	<input type="file" ref={this.fileInput} onChange={this.onGetFile} style={{display:'none'}} />	
        	<Modal title={this.state.vtitle} visible={this.state.visible} width="730px" onOk={this.otherBtnClick} onCancel={this.cancel} okText="确定" cancelText="取消">
       			<div className="model-top">
       			<Form {...layout} ref={this.formRef}>
       			<Row className="dictcontent" gutter={8}>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="媒体名称" name='name' rules={[{ required: true, message: '请选择名称' }]}>
              				<Input placeholder='请输入' />
            			</Form.Item>
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="媒体类型" name='mediaType' rules={[{ required: true, message: '请选择类型' }]}>
            				<Select allowClear showArrow="true" style={{ width: '100%' }} placeholder="请选择" onChange={this.handleProvinceChange}>
      							{mediatype}
    						</Select>
            			</Form.Item>
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="排序" name='sort'>
              				<Input type="number" placeholder='请输入' />
            			</Form.Item>
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="标签" name='tagIds' rules={[{ required: true, message: '请选择标签' }]}>
            				<Select mode="multiple" allowClear showArrow="true" style={{ width: '100%' }} options={this.state.labeloption} placeholder="请选择">
            					
    						</Select>
            			</Form.Item>
      				</Col>
      				<Col className="gutter-row" span={12}>
      					<Form.Item label="分类" name='typeId' rules={[{ required: true, message: '请选择分类' }]}>
            				<Select allowClear showArrow="true" style={{ width: '100%' }} placeholder="请选择">
      							{classifiy}
    						</Select>
            			</Form.Item>
      				</Col>
      				<Col className="gutter-row" span={12}>
      					{
      						this.state.mediaselect != 3 ? 
      					<Form.Item label="上传文件" name='file'>
            			<div className="uploads" onClick={this.startup}>
            				{fileupload}
            			</div>
            			</Form.Item>:
            			<Form.Item label="文字" name='fonts' rules={[{ required: true, message: '请输入文字' }]}>
            				<TextArea placeholder='请输入' rows={4} />
            			</Form.Item>
            			}
      				</Col>
      				<Col className={this.state.mediaselect != 3?"top gutter-row":"gutter-row toptwo"} span={12}>
      					<Form.Item label="备注" name='remarks'>
            				<TextArea placeholder='请输入' rows={4} />
            			</Form.Item>
      				</Col>
            	</Row>
      			</Form>
      			</div>
    		</Modal>
    		<Modal title={this.state.medianame} visible={this.state.visiblesee} width="550px" footer={[
            <Button key="back" onClick={this.cancelsee}>
              返回
            </Button>,
          ]}>
    				<div className="detail-body">
    					{detail}
    				</div>
    		</Modal>
    	</div>
    )
  }
  Changemedia = (row) =>{
  	this.setState({
  		mediaType:row
  	})
  }
  Changeclass = (row) =>{
  	this.setState({
  		systemType:row
  	})
  }
  see = (data) =>{
  	console.log(data)
  		this.setState({
  			visiblesee:true,
  			medianame:data.name,
  			mediaselect:data.mediaType
  		})
  		if(data.mediaType == 3){
  			this.setState({
  				fonts:data.fonts
  			})
  		}else{
  			this.setState({
  				imgurl:filehead+data.url
  			})
  		}
  }
  eduitdict = (row) =>{
  	this.setState({
		visible:true,
		vtitle:'修改',
		id:row._id,
		mediaselect:row.mediaType,
		imgurl:filehead + row.url
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
			mediadelete(a).then(res=>{
				message.success('删除成功');
				_this.getlist()
			})
    		},
    		onCancel() {
      		
    		},
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
		mediadelete(a).then(res=>{
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
  startup = () => {
  	if(this.state.mediaselect == '' || this.state.mediaselect == null){
  		message.error('请选择媒体格式');
  	}else{
		this.fileInput.current.click()  		
  	}

  }
  onGetFile = (e) => {
	const _this = this
	const file = e.target.files[0];
	const filename = file.name
	if (this.checkUploadType(filename)) {
		this.setState({
			avat: file
		})
		if (this.state.mediaselect == 0) {
			const fr = new FileReader();
			fr.readAsDataURL(file);
			fr.onload = () => {
				this.setState({
					imgurl: fr.result
				})
			}
		}else if(this.state.mediaselect == 1){
			this.setState({
				imgurl: filename
			})
		}else if(this.state.mediaselect == 2){
			this.setState({
				imgurl: filename
			})
		}
		e.target.value = ''
	}	
	}
  otherBtnClick = () => {
  	this.formRef.current.validateFields().then((values) => {
  		console.log(values)
  		var flag = true
  		var formData = new FormData()
			formData.append('name', values.name)
			formData.append('remarks', values.remarks?values.remarks:'')
			formData.append('sort', values.sort)
			formData.append('mediaType', values.mediaType)
			formData.append('typeId', values.typeId)
			formData.append('tagIds', values.tagIds.join(','))
			if(values.mediaType == 3){
				formData.append('fonts', values.fonts)
			}else{
				if(this.state.avat.name == undefined){
					flag = false
				}else{
					formData.append('file', this.state.avat)
				}
			}
			if(flag){
				if(this.state.id == '' || this.state.id == null){ //添加
					mediaadd(formData).then(res=>{
						message.success('添加成功');
	 					this.cancel()
	 					this.getlist()
					})
				}else{ //修改
					formData.append('id', this.state.id)
					mediaeduit(formData).then(res=>{
						message.success('编辑成功');
	 					this.cancel()
	 					this.getlist()
					})
				}
			}else{
				message.error('请上传文件');
			}
			
  	})	
  }
  cancelsee = () => {
  	this.setState({
		visiblesee: false,
		imgurl:'',
		mediaselect:10
	})
  }
  cancel = () => {
  	this.formRef.current.resetFields()
  	this.setState({
		visible: false,
		avat:{},
		imgurl:''
	})
  }
  handleProvinceChange = (value) => {
  		this.setState({
  			mediaselect:value,
  			imgurl:'',
  			avat: {}
  		})
  }
  getlist=()=>{
  	var a={
		"page":this.state.page,
		"size":this.state.size,
		"mediaType":this.state.mediaType,
		"systemType":this.state.systemType
	}
  	medialist(a).then(res=>{
  		this.setState({
			data: res.data.data,
			total:res.data.total,
			selectedRowKeys:[],
			selectedRows:[]		
		});
  	})
  }
  getdata = () => {
  		var data={
  			"name":'media_type'
  		}
  		dictdetail(data).then(res => {
  			res.data.data.forEach(v=>{
  				mediatype.push(<Option key={v.value}>{v.label}</Option>);
  			})
  			this.setState({
  				ground:res.data.data
  			})
		})
  		var obj={
  			'typeCode':'volume_type'
  		}
  		typecode(obj).then(res=>{
  			res.data.data.forEach(v=>{
  				classifiy.push(<Option key={v._id}>{v.name[0]}</Option>);
  			})
  			this.setState({
  				classifiy:res.data.data
  			})
  		})
  		labeltree().then(res=>{
  			var newoption = []
  			res.data.data.forEach((item, index) => {
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
  			this.setState({
				labeloption: newoption
			})
  			
  		})
 
  }
  checkUploadType = (fileUrl) => {
      var index = fileUrl.lastIndexOf('.')  // （考虑严谨用lastIndexOf(".")得到）得到"."在第几位
      var fileType = fileUrl.substring(index)  // 截断"."之前的，得到后缀
      if (this.state.mediaselect == 0) { // 图片
      	if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileType)) {
        	message.error('请上传图片');
        	return false
      	} else {
      		return true
      	}
      } else if (this.state.mediaselect == 1) { // 视频
      	if (!/\.(mp4|MP4)$/.test(fileType)) {
        	message.error('请上传MP4格式的视频');
        	return false
      	} else {
      		return true
      	}
      } else if (this.state.mediaselect == 2) { // 音频
      	if (!/\.(mp3|MP3)$/.test(fileType)) {
        	message.error('请上传MP3格式的音频');
        	return false
      	} else {
      		return true
      	}
      }
    }
  componentDidMount(){
  	this.getlist()
	this.getdata()
  }
}
export default Homethree