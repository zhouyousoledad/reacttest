//home.js
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Layout, Menu,Breadcrumb,Dropdown } from 'antd';
import { LaptopOutlined,UserOutlined,NotificationOutlined,CaretDownOutlined } from '@ant-design/icons';
import './index.css';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const menuList = [
{
    title: '系统管理',
    key: '/index/system',
    icon: LaptopOutlined,
    children: [{
      title: '字典管理',
      key: '/index/dict',
      icon: LaptopOutlined,
    }]
  },
  {
    title: '类型管理',
    key: '/index/type',
    icon: LaptopOutlined,
    children:[{
      title: '标签管理',
      key: '/index/label',
      icon: LaptopOutlined
    },{
      title: '分类字典',
      key: '/index/dictionary',
      icon: LaptopOutlined
    }]
  }, {
    title: '题库管理',
    key: '/index/bank',
    icon: LaptopOutlined,
    children: [{
      title: '题库列表',
      key: '/index/blist',
      icon: LaptopOutlined,
    }]
  }, {
    title: '测评管理',
    key: '/index/test',
    icon: LaptopOutlined,
    children:[{
      title: '企业报告',
      key: '/index/companyreport',
      icon: LaptopOutlined
    },{
      title: '测评列表',
      key: '/index/testlist',
      icon: LaptopOutlined
    },{
      title: '新建测评',
      key: '/index/newtest',
      icon: LaptopOutlined
    }]
  }, {
    title: '测评用户管理',
    key: '/index/testuser',
    icon: LaptopOutlined,
    children: [{
      title: '测试用户',
      key: '/index/psychologicaluser',
      icon: LaptopOutlined
    }, {
      title: '机构管理',
      key: '/index/psychologicalinstitutions',
      icon: LaptopOutlined
    }]
  }, {
    title: '治愈媒体',
    key: '/index/media',
    icon: LaptopOutlined,
    children: [{
      title: '媒体列表',
      key: '/index/medialist',
      icon: LaptopOutlined
    }]
  },
  {
    title: '用户评论',
    key: '/index/userping',
    icon: LaptopOutlined,
    children: [{
      title: '评论列表',
      key: '/index/pinglist',
      icon: LaptopOutlined
    }]
  },
  {
    title: '意见反馈',
    key: '/index/feedback',
    icon: LaptopOutlined,
    children: [{
      title: '反馈列表',
      key: '/index/feedlist',
      icon: LaptopOutlined
    }]
  },
  {
    title: '预警管理',
    key: '/index/warning',
    icon: LaptopOutlined,
    children: [{
      title: '设置预警',
      key: '/index/addwarning',
      icon: LaptopOutlined
    }]
  }
]
class Home extends Component {
	constructor ( props ) {
    super(props)
    this.state = {
    	text:'',
    	route: props.route,
    	height:100,
    	selectedKey: '1', //选中
        openKey: 'sub1', //展开
    	breadata:["首页"]
    }
  	}
	
  render() {
  	const menu = (
  <Menu onClick={this.onClick}>
  <Menu.Item>
      <span>消息中心</span>
    </Menu.Item>
    <Menu.Item>
      <span>退出登录</span>
    </Menu.Item>
  </Menu>
)
    return (
    	 <Layout style={{ height:'100%' }}>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu
      theme="dark"
	mode="inline"
	onClick={this.handleClickGoTo}
	selectedKeys={[this.state.selectedKey]}
	onOpenChange={this.onOpenChange}
	openKeys={[this.state.openKey]}
      >
          {
          	// 获取并渲染动态的菜单内容
            this.createMenuListMap(menuList)
          }
          
      </Menu>
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background" id="head" style={{ padding: 0 }}>
      	<div className='content-headers clearfix'>
      		<div className="content-headers-left">
      		<div className="content-headers-left-margin">
      		<Breadcrumb>
      			{
                    this.state.breadata.map((item, index) => {
                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    })
                }
  			</Breadcrumb>
  			</div>
      		</div>
      		<div className="content-headers-right">
      		<Dropdown overlay={menu} placement="bottomRight" arrow>
      		<div className="avatar">
      		
      		<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      		<img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      		<CaretDownOutlined />	
    		</a>
      		
      		
      		</div>
      		</Dropdown>
      		</div>
      	</div>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{height:this.state.height}}>
          {renderRoutes(this.state.route.children)}
          
        </div>
      </Content>

    </Layout>
  </Layout>
    )
  }
  onClick = (item) =>{
  	if(item.key == 'item_0'){
  		//跳转到消息中心
  		this.props.history.push({
        pathname: '/index/message'
      });
  	}else if(item.key == 'item_1'){
  		//退出登录
  		sessionStorage.clear()
  		this.props.history.push({
          pathname: '/'
        });
  	}
  }
  createMenuListMap = (list) => {
    return list.map((item) => {
      if(item.children) {
      	// 如果当前循环到的菜单项有 children，那就返回 SubMenu，否则返回的直接是 Menu.Item
        const path = this.props.location.pathname;
        const res = item.children.find(child => path.indexOf(child.key) >= 0);
        if(res) this.openKey = item.key;  
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <item.icon />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              // 根据当前菜单的 children 去生成其子菜单，由于菜单项 menuList 是个有终结的数据，且嵌套层数并不复杂，所以这里不用担心递归会造成栈溢出的问题
              this.createMenuListMap(item.children)
            }
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key}>
              <item.icon />
              <span>{item.title}</span>
          </Menu.Item>
        );
      }
    });
  }
  handleClickGoTo = (e) => {//点击事件
  		console.log(e)
  		var key = e.keyPath[1]
  		var childrenkey = e.keyPath[0]
  		var arr = ['首页']
  		menuList.forEach(v=>{
  			if(v.key == key){
  				arr.push(v.title)
  				v.children.forEach(a=>{
  					if(a.key == childrenkey){
  						arr.push(a.title)
  					}
  				})
  			}
  		})
        this.setState({ 
        	selectedKey: e.key,
        	breadata: arr
        });
        this.props.history.push({
          pathname: e.key,
        });
  }
  onOpenChange = (k) => { // 展开收缩更新状态
        if (k.length > 1) {
            this.setState({ openKey: k[k.length - 1] });
        } else {
            this.setState({ openKey: "" });
        }
  }
  tabbClick = ( e ) => {
	 	e.preventDefault()
	 	switch (e.target.id) {
	 		case 'first' :
        this.props.history.push({
          pathname: '/index/two'
        });
        break;
      case 'second' :
        this.props.history.push({
          pathname: '/index/three',
          search:"5sa4d54ad&ashdahds",
        });
        break;
      case 'three' :
        this.props.history.push({
          pathname: '/index/four'
        });
        break;
      default:
			break;  
	 	}
//	 	this.props.history.push('/index')
	}
 componentDidMount(){
 	var box=document.getElementById("head").offsetHeight;
 	var theight = document.body.clientHeight
 	this.setState({
 		height:theight - box - 48,
//  	selectedKey:'2',
//  	openKey:'sub1'
 	})        
 }
  componentWillMount(){
  	var url = this.props.location.pathname  //获取成功
  	var arr = this.props.route.children
  	if(url === '/index'){
  		this.props.history.push({
        	pathname: '/index/dict'
    	});
  	}
  }
  componentDidUpdate(){
  	var url = this.props.location.pathname
  	if(url === '/index'){
  		this.props.history.push({
        	pathname: '/index/dict'
    	});
  	}else{
  	
  	}
  }
}
export default withRouter(Home)