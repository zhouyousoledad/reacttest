import axios from './index'
let warninglist=(data)=>axios({
	method:'get',
	url:'/react/warning/list',
	params:data,
})
let warningadd=(data)=>axios({
	method:'post',
	url:'/react/warning/add',
	data:data,
})
let warningeduit=(data)=>axios({
	method:'post',
	url:'/react/warning/eduit',
	data:data,
})
let warningdelete=(data)=>axios({
	method:'post',
	url:'/react/warning/delete',
	data:data,
})
export{
	warninglist,
	warningadd,
	warningeduit,
	warningdelete
}