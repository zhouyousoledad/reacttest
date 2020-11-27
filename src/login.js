//home.js
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'
import ActionCreator from './info/actionCreator'
import { Form, Input, Button, message,Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {login,code} from './axios/api';
import './login.css';

class Home extends Component{
	constructor ( props ) {
    super(props)
    this.state = {
    	codeimg:'',
    	checked:false
    }
  	}
	render() {
    	return (
    	<div className="login-bg flex">
    		<div className="login-forms">
    			<Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
      </Form.Item>
     <div className="code-content"> 
      <Form.Item name="code" rules={[{ required: true, message: '请输入验证码!' }]}>
        <Input className="code-input" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="验证码" />
        
      </Form.Item>
      <div className="code-img" onClick={this.tabbClick}><div className="codesvg" dangerouslySetInnerHTML = {{ __html: this.state.codeimg}}></div></div>
       
      </div>
        <Form.Item name="remember" noStyle>
          <Checkbox checked={this.state.checked}>记住我</Checkbox>
        </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button login-btn">
          登录
        </Button>
      </Form.Item>
    </Form>
    		</div>
    		<div className="login-font">
    			<div className="login-introduct flex">
    				<div>
    					<p>Welcome</p>
    					<p>XXXX后台系统</p>
    				</div>
    			</div>
    		</div>
    	</div>
    	)
  	}
	tabbClick = ( e ) => {
		   var data={}
		   code(data).then(res=>{
		   	this.setState({
    			'codeimg':res.data.result
			})
		   })
	}
	onFinish = (values) => {
	var data = {
			"username":values.username,
			"password":values.password,
			"code":values.code,
		}
		login(data).then(res=>{
			console.log(res)
			if(res.data.code == 0){
				message.error('验证码错误');
			}else if(res.data.code == 1){
				message.error('未找到账户');
			}else if(res.data.code == 2){
				message.error('密码错误');
			}else{
				message.success('登录成功');
				var objss = 2
				sessionStorage.setItem("userInfo",objss);
				sessionStorage.setItem("logininfo",JSON.stringify(res.data.data));
				ActionCreator.changeroute(objss)
				this.props.history.push('/index')
			}
				
		})	
   //console.log('Success:', values);
}

	
	componentDidMount(){
		this.tabbClick()
		
	}
}	
export default withRouter(Home)