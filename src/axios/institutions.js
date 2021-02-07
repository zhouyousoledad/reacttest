import axios from './index'
let institutionslist=(data)=>axios({
	method:'get',
	url:'/react/institutions/list',
	params:data,
})
let institutionuserlist=(data)=>axios({
	method:'get',
	url:'/react/institutionuser/list',
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
let institutionuseradd=(data)=>axios({
	method:'post',
	url:'/react/institutionuser/add',
	data:data,
})
let institutionseduit=(data)=>axios({
	method:'post',
	url:'/react/institutions/eduit',
	data:data,
})
let institutionusereduit=(data)=>axios({
	method:'post',
	url:'/react/institutionuser/eduit',
	data:data,
})
let institutionsdelete=(data)=>axios({
	method:'post',
	url:'/react/institutions/delete',
	data:data,
})
let institutionuserdelete=(data)=>axios({
	method:'post',
	url:'/react/institutionuser/delete',
	data:data,
})
let institutionuseropen=(data)=>axios({
	method:'post',
	url:'/react/institutionuser/open',
	data:data,
})
export{
	institutionslist,
	institutionsadd,
	institutionseduit,
	institutionsdelete,
	institutionschoose,
	institutionuseradd,
	institutionusereduit,
	institutionuserlist,
	institutionuserdelete,
	institutionuseropen
}