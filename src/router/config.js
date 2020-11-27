//引入react jsx写法的必须
import React, { Component } from 'react';
//引入需要用到的页面组件 
import Login from '../login';

import Index from '../page/index';
import Two from '../page/sdict';
import Label from '../page/typemanager/label';
import Classify from '../page/typemanager/type';
import Nofond from '../page/nofond';
import { Router,Switch,Route,Redirect } from 'react-router-dom';
import { createHashHistory } from 'history'; // 如果是hash路由
//引入一些模块

let redirectRoute=<Redirect to="/404" />;
const authed = false // 如果登陆之后可以利用redux修改该值(关于redux不在我们这篇文章的讨论范围之内）
const authPath = '/' // 默认未登录的时候返回的页面，可以自行设置
const history = createHashHistory();
const userrouter = {
    path: "/index",
    component: Index,
    name:'Index',
    requiresAuth: false,
    children: [
      {
        path: "/index/dict",
        component: Two,
        requiresAuth: false,
      },
      {
        path: "/index/label",
        component: Label,
        requiresAuth: false,
      },
      {
        path: "/index/dictionary",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/blist",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/companyreport",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/testlist",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/newtest",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/psychologicaluser",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/psychologicalinstitutions",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/medialist",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/pinglist",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/feedlist",
        component: Classify,
        requiresAuth: false,
      },
      {
        path: "/index/addwarning",
        component: Classify,
        requiresAuth: false,
      },
      {
      	path:"/index/message",
      	component: Classify,
        requiresAuth: false,
      }
    ]
}

class router extends Component {
	constructor ( props ) {
    super(props)
    this.state = {
    	Val:1000,
    	routes:[
  {
    path: "/",
    component: Login,
    name:'Login',
    exact: true,
    requiresAuth: false,
    children:[]
  },
  {
    path: "/404",
    component: Nofond,
    name:'Login',
    exact: true,
    requiresAuth: false,
    children:[]
  },
  
]
    }
  	}
    render() {
        return (
        	
           <Router history={history}>
        		{renderRoutes(this.state.routes, authed, authPath)}
    		</Router>
        );
    }
    componentDidMount(){
    	console.log(2)
  	}
    componentWillMount(){   //刷新后从stronge里取路由表并填充到
	
//  	var arr=[
//  		{
//  path: "/",
//  component: Login,
//  name:'Login',
//  exact: true,
//  requiresAuth: false,
//  children:[]
//},
//{
//  path: "/404",
//  component: Nofond,
//  name:'Login',
//  exact: true,
//  requiresAuth: false,
//  children:[]
//},
//{
//  path: "/index",
//  component: Index,
//  name:'Index',
//  requiresAuth: false,
//  children: [
//    {
//      path: "/index/two",
//      component: Two,
//      requiresAuth: false,
//    },
//    {
//      path: "/index/three",
//      component: Three,
//      requiresAuth: false,
//    },
//    {
//      path: "/index/four",
//      component: Four,
//      requiresAuth: false,
//    },
//  ]
//}
//  	]
var user = sessionStorage.getItem("userInfo");
console.log(user)
    	if(user === '2'){
    		this.state.routes.push(userrouter)
    		
    		this.forceUpdate();
    	}
   

  	}
    shouldComponentUpdate(nextProps,nextState){
	var user = sessionStorage.getItem("userInfo")
	console.log(user)
	if(user === '2'){
		this.state.routes.push(userrouter)
		this.forceUpdate();
	}
    	return true
    }
    
}


const renderRoutes = (routes, authed, authPath = '/', extraProps = {}, switchProps = {}) => routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {	
          if (!route.requiresAuth || authed || route.path === authPath) {
            return <route.component {...props} {...extraProps} route={route} />
          }
          	return <Redirect to={{ pathname: '/', state: { from: props.location } }} />	
           
        }}
      />
    ))}    
{redirectRoute}
  </Switch>
) : null


export default router;