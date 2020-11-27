import State from './state'
export default (prev = State, actions) =>{
	let newData = JSON.parse(JSON.stringify(prev))
	let { type,params } = actions
	switch(type){
		case 'CHAGNE_NAME':
			newData.name = params
			break;
		case 'CHAGNE_AGE':
			newData.age = params
			break;
		case 'CHAGNE_ROUTE':
			newData.route = params
		default:
			break;
	}
	return newData
}
