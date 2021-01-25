import axios from './index'
let medialist=(data)=>axios({
	method:'get',
	url:'/react/media/list',
	params:data,
})
let mediaadd=(data)=>axios({
	method:'post',
	url:'/react/media/add',
	headers: {
      'Content-Type': 'multipart/form-data'
    },
	data:data,
})
let mediaeduit=(data)=>axios({
	method:'post',
	url:'/react/media/eduit',
	headers: {
      'Content-Type': 'multipart/form-data'
    },
	data:data,
})
let mediadelete=(data)=>axios({
	method:'post',
	url:'/react/media/delete',
	data:data,
})
export{
	medialist,
	mediaadd,
	mediaeduit,
	mediadelete,
}