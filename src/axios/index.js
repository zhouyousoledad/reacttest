import Axios from 'axios';

import { createHashHistory } from 'history'; // 如果是hash路由
const axios = Axios.create();


const history = createHashHistory();
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use((config) => {
//	console.log(config)
	
    if (config.method === 'post') {
       
    }

    return config;
});

//http response 拦截器
axios.interceptors.response.use(
	response => {
//		console.log(response)
		if (response.data.code === 10) {
	
			history.push('/404');
			// router.push({
			// 	path: "/login",
			// 	querry: {redirect: router.currentRoute.fullPath}//从哪个页面跳转
			// })
		}
		return response;
	},
	error => {
		return Promise.reject(error)
	}
);
export default axios;