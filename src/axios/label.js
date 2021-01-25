import axios from './index'

let labellist=(data)=>axios({
	method:'get',
	url:'/react/label/list',
	params:data,
})
let labeldetail=(data)=>axios({
	method:'get',
	url:'/react/label/detail',
	params:data
})

let labeladd=(data)=>axios({
	method:'post',
	url:'/react/label/add',
	data:data,
})
let labeladddetail=(data)=>axios({
	method:'post',
	url:'/react/label/adddetail',
	data:data,
})
let labeleduit=(data)=>axios({
	method:'post',
	url:'/react/label/eduit',
	data:data,
})
let labeleduitdetail=(data)=>axios({
	method:'post',
	url:'/react/label/eduitdetail',
	data:data,
})
let labeldelete=(data)=>axios({
	method:'post',
	url:'/react/label/delete',
	data:data,
})
let labeldeletedetail=(data)=>axios({
	method:'post',
	url:'/react/label/deletedetail',
	data:data,
})
let labeltree=(data)=>axios({
	method:'get',
	url:'/react/label/labelchild',
	params:data,
})

export{
	labellist,
	labeladd,
	labeladddetail,
	labeleduit,
	labeldetail,
	labeldelete,
	labeleduitdetail,
	labeldeletedetail,
	labeltree
}