import React, {
	Component,createRef
} from 'react';
import { Input, Button,message,Row, Col} from 'antd';
import { PlusOutlined,MinusCircleOutlined } from '@ant-design/icons';
import { optiontagdetail,addoptiontag } from '../../axios/testbank';
import './taskbank.css';


class Addbank extends Component {
	constructor ( props ) {
    super(props)
    this.state = {
		tagdata:[],
		astype:0,
		tid:''
    }
  	}
  render() {
    return (
    	<div className="addbank">
    		
    		<Row gutter={16}>
    		{
          		this.state.tagdata.map((item, index) => {
            	return (
              		<Col span={8} key={index}>
                		<div className="leftblock">{ this.state.astype == 0 ? item.option : <img src={item.option} /> }</div>
                		<div className="rightblock">
                		<ul>
                	{
                  	item.tag.map((itm, idx) => {
                    	return (
                    		<li key = { idx }>
                    		<Input type="number" onChange={e => this.inputChang(e, idx,index)} addonBefore={itm.name} defaultValue={itm.value} />
							</li>
                    	)
                  	})
                	}
                	</ul>
                	</div>
              		</Col>
            	)
          	})
        	}
    		</Row>	
    	</div>
    )
  }
  getlist = (obj) =>{
  	let datas = obj
  	this.setState({
  		"astype":obj.astype,
  		"tid":obj.tid
  	})
  	let a = {
  		'id':obj.tid
  	}
  	optiontagdetail(a).then(res=>{
  		if(res.data.code == 200){
  			if(res.data.data.optiontagdata.length != 0){
  				let optiondata = res.data.data.optiondata
  				let optiontagdata = res.data.data.optiontagdata
  				let arr = []
  				optiondata.forEach(v=>{
  					var id = v._id  //选项id
  					var obj = {
  						'option':v.option,
  						'_id':v._id,
  						'tag':[]
  					}
  					optiontagdata.forEach(a=>{
  						if(id == a.optionid){
  							let b = {
  								'name':a.optiontagname,
  								'value':a.optiontagvalue,
  								'_id':a.optiontagid,
  								'id':a._id
  							}
  							obj.tag.push(b)
  						}
  					})
  					if(obj.tag.length == 0){
  						datas.tagdata.forEach(a=>{
  							let tagobj = {
  								'name':a.name,
  								'value':'',
  								'_id':a._id
  							}
  							obj.tag.push(tagobj)
  						})
  					
  					}
  					arr.push(obj)
  				})
  				
				this.setState({
					"tagdata":arr
				})
  			}else{
  				console.log(datas)
  				let optionarr = res.data.data.optiondata
  				let tagarr = []
  				datas.tagdata.forEach(a=>{
  					let obj = {
  						'name':a.name,
  						'value':'',
  						'_id':a._id
  					}
  					tagarr.push(obj)
  				})
  				optionarr.forEach(v=>{
  					v.tag = tagarr
  				})
  				this.setState({
  					"tagdata":optionarr
  				})
  			}
  		}
  	})
  }
  inputChang= (e,idx,index) =>{
	const obj = {
		...this.state.tagdata[index].tag[idx]
	}
	obj.value = e.target.value
	const yuandata = [...this.state.tagdata]
	yuandata[index].tag[idx] = obj
	this.setState({
		tagdata:yuandata
	})
  }
  validation = () =>{
  	return  new Promise((resolve, reject)=>{
  		let flag = false
  		this.state.tagdata.forEach(v=>{
  			v.tag.forEach(a=>{
  				if(a.value == '' || a.value == null){
  					flag = true
  				}
  			})
  		})
  		if(!flag){
  			console.log(this.state.tagdata)
  			let a = {
  				'tid':this.state.tid,
  				'optiontagdata':JSON.stringify(this.state.tagdata)
  			}
			addoptiontag(a).then(res=>{
				if(res.data.code == 200){
					message.success('添加成功');
					resolve(true)
				}
			})
  		}else{
  			message.error('请填写分数');
  		}
    })
  }
  componentDidMount(){
	
  }
}
export default Addbank