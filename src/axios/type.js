import axios from './index'
let typelist=(data)=>axios({
	method:'get',
	url:'/react/type/list',
	params:data,
})
let typedetail=(data)=>axios({
	method:'get',
	url:'/react/type/detail',
	params:data
})

let typeadd=(data)=>axios({
	method:'post',
	url:'/react/type/add',
	data:data,
})
let typeadddetail=(data)=>axios({
	method:'post',
	url:'/react/type/adddetail',
	headers: {
      'Content-Type': 'multipart/form-data'
    },
	data:data,
})
let typeeduit=(data)=>axios({
	method:'post',
	url:'/react/type/eduit',
	data:data,
})
let typeeduitdetail=(data)=>axios({
	method:'post',
	url:'/react/type/eduitdetail',
	headers: {
      'Content-Type': 'multipart/form-data'
    },
	data:data,
})
let typedelete=(data)=>axios({
	method:'post',
	url:'/react/type/delete',
	data:data,
})
let typedeletedetail=(data)=>axios({
	method:'post',
	url:'/react/type/deletedetail',
	data:data,
})
export{
	typelist,
	typeadd,
	typeadddetail,
	typeeduit,
	typedetail,
	typedelete,
	typeeduitdetail,
	typedeletedetail
}