import axios from './index'
let login=(data)=>axios({
	method:'post',
	url:'/react/login/login',
	data:data
})
let code=(data)=>axios({
	method:'post',
	url:'/react/login/code',
	data:data
})
let dictlist=(data)=>axios({
	method:'get',
	url:'/react/dict/list',
	params:data,
})
let dictdetail=(data)=>axios({
	method:'get',
	url:'/react/dict/detail',
	params:data
})

let dictadd=(data)=>axios({
	method:'post',
	url:'/react/dict/add',
	data:data,
})

let dictadddetail=(data)=>axios({
	method:'post',
	url:'/react/dict/adddeatil',
	data:data,
})

let dicteduit=(data)=>axios({
	method:'post',
	url:'/react/dict/eduit',
	data:data,
})
let dicteduitdetail=(data)=>axios({
	method:'post',
	url:'/react/dict/eduitdetail',
	data:data,
})
let dictdelete=(data)=>axios({
	method:'post',
	url:'/react/dict/delete',
	data:data,
})
let dictdeletedetail=(data)=>axios({
	method:'post',
	url:'/react/dict/deletedetail',
	data:data,
})

export{
	login,
	code,
	dictlist,
	dictadd,
	dicteduit,
	dictdelete,
	dictdetail,
	dictadddetail,
	dicteduitdetail,
	dictdeletedetail
}