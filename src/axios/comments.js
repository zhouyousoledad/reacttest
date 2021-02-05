import axios from './index'
let commentslist=(data)=>axios({
	method:'get',
	url:'/react/comments/list',
	params:data,
})

let commentsdelete=(data)=>axios({
	method:'post',
	url:'/react/comments/delete',
	data:data,
})
export{
	commentslist,
	commentsdelete
}