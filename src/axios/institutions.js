import axios from './index'
let institutionslist=(data)=>axios({
	method:'get',
	url:'/react/institutions/list',
	params:data,
})
let institutionschoose=(data)=>axios({
	method:'get',
	url:'/react/institutions/choose',
	params:data
})
let institutionsadd=(data)=>axios({
	method:'post',
	url:'/react/institutions/add',
	data:data,
})
let institutionseduit=(data)=>axios({
	method:'post',
	url:'/react/institutions/eduit',
	data:data,
})
let institutionsdelete=(data)=>axios({
	method:'post',
	url:'/react/institutions/delete',
	data:data,
})
export{
	institutionslist,
	institutionsadd,
	institutionseduit,
	institutionsdelete,
	institutionschoose
}