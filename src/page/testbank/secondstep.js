import React, {
	Component,createRef
} from 'react';
import { Input, Button,Select,message,Row, Col} from 'antd';
import { PlusOutlined,MinusCircleOutlined } from '@ant-design/icons';
import { commonupload } from '../../axios/api';
import { optiondetail,optionadd } from '../../axios/testbank';
import './taskbank.css';


class Addbank extends Component {
	fileInput = React.createRef();
	constructor ( props ) {
    super(props)
    this.state = {
		selectarr:[],
		astype:1,
		imgindex:0,
		tid:'',
		delid:[]
    }
  	}
  render() {
    return (
    	<div className="addbank">
    		<div className="second-add">
    			<Button type="primary" onClick={this.addselect} icon={<PlusOutlined />}>新增</Button>
    		</div>
    		<Row gutter={16}>
    			{
    				this.state.selectarr.map((v,index) => 
    				<Col span={6} className="secondcol" key={index}>
    				{
    					this.state.astype == 0 ? 
    					<Input value={v.option} className="secondselect" onChange={e => this.inputChang(e, index)} placeholder="请输入选项" /> :
    					<div className="test-upload" onClick={e => this.startup(index)}>
    						{
    							v.option != '' ? <img src={v.option} /> :  <PlusOutlined />
    						}
							
            			</div>	
    				}
    				
    				{
    					this.state.selectarr.length > 1 ? <MinusCircleOutlined className={this.state.astype == 0?'margin-left':'margin-left inline-flex'} onClick={e => this.minus(index)} /> : ''
    				}
    				</Col>
    			)}
    		</Row>
    		<input type="file" ref={this.fileInput} onChange={this.onGetFile} style={{display:'none'}} />	
    	</div>
    )
  }
  addselect = () =>{
  	var arr = this.state.selectarr
  	arr.push({
        option: ''
    });
    this.setState({
    	selectarr:arr
    })
  }
  minus = (index) =>{
  	const yuandata = [...this.state.selectarr]
  	let arr = []
  	if(this.state.selectarr[index]._id != undefined){
  		arr.push(this.state.selectarr[index]._id)
  		this.setState({
  			delid:arr
  		})
  	}
  	yuandata.splice(index,1)
  	this.setState({
		selectarr:yuandata
	})
  }
  inputChang = (e,index) =>{
	const obj = {
		...this.state.selectarr[index]
	}
	obj.option = e.target.value
	const yuandata = [...this.state.selectarr]
	yuandata[index] = obj
	this.setState({
		selectarr:yuandata
	})	
  }
  startup = (index) =>{
  	this.setState({
		imgindex:index
	},() =>{
		this.fileInput.current.click() 
	})
  	
  }
  onGetFile = (e) =>{
  	const _this = this
	const file = e.target.files[0];
	const filename = file.name
	if (this.checkUploadType(filename)) {
		var formData = new FormData()
		formData.append('file', file)
		commonupload(formData).then(res=>{
			if(res.data.code == 200){
				const obj = {
					..._this.state.selectarr[_this.state.imgindex]
				}
				obj.option = res.data.url
				const yuandata = [..._this.state.selectarr]
				yuandata[_this.state.imgindex] = obj
				_this.setState({
					selectarr:yuandata
				},()=>{
			
				})
			}
		})
	}	
  }
  validation = () =>{
  	return  new Promise((resolve, reject)=>{
  		if(this.state.selectarr.length == 0){
  			message.error('请设置选项');
  		}else{
  			
  			var a = {
  				'tid':this.state.tid,
  				'optiondata':JSON.stringify(this.state.selectarr),
  				'astype':this.state.astype,
  				'delid':this.state.delid.join(',')
  			}
  			optionadd(a).then(res=>{
  				if(res.data.code == 200){
  					message.success('添加成功');
  					a.tagdata = res.data.data
  					resolve(a)
  				}
  			})
  		}
    })
  }
  getlist = (value,id) =>{
  	this.setState({
		astype:value,
		tid:id
	},()=>{
		let a = {
			"id":id
		}
		optiondetail(a).then(res=>{
			if(res.data.code == 200){
				if(res.data.data.length != 0){
//					let arr = JSON.parse(res.data.data[0].optiondata)
					this.setState({
						"selectarr":res.data.data
					})
				}
				
			}
		})
	})
  }
  checkUploadType = (fileUrl) => {
      var index = fileUrl.lastIndexOf('.')  // （考虑严谨用lastIndexOf(".")得到）得到"."在第几位
      var fileType = fileUrl.substring(index)  // 截断"."之前的，得到后缀
      if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileType)) {
        	message.error('请上传图片');
        	return false
      	} else {
      		return true
      	}
      
    }
  componentDidMount(){
	
  }
}
export default Addbank