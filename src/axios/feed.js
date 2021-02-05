import axios from './index'
let feedlist=(data)=>axios({
	method:'get',
	url:'/react/feed/list',
	params:data,
})

let feeddelete=(data)=>axios({
	method:'post',
	url:'/react/feed/delete',
	data:data,
})
export{
	feedlist,
	feeddelete
}