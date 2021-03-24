import axios from './index'
let banklist=(data)=>axios({
	method:'get',
	url:'/react/testbank/list',
	params:data,
})
let bankadd=(data)=>axios({
	method:'post',
	url:'/react/testbank/add',
	data:data,
})
let bankeduit=(data)=>axios({
	method:'post',
	url:'/react/testbank/eduit',
	data:data,
})
let bankdelete=(data)=>axios({
	method:'post',
	url:'/react/testbank/delete',
	data:data,
})
let optiondetail=(data)=>axios({
	method:'get',
	url:'/react/testbank/detailoption',
	params:data,
})
let optionadd=(data)=>axios({
	method:'post',
	url:'/react/testbank/addoptions',
	data:data
})
let optiontagdetail=(data)=>axios({
	method:'get',
	url:'/react/testbank/detailtag',
	params:data,
})
let addoptiontag=(data)=>axios({
	method:'post',
	url:'/react/testbank/addoptiontag',
	data:data,
})
export{
	banklist,
	bankadd,
	bankeduit,
	bankdelete,
	optiondetail,
	optionadd,
	optiontagdetail,
	addoptiontag
}