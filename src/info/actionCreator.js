import Store from './store'
export default{
	changeName(params){
		let action = {
			type:'CHAGNE_NAME',
			params:params
		}
		Store.dispatch(action)
	},
	Age(params){
		let action = {
			type:'CHAGNE_AGE',
			params:params
		}
		Store.dispatch(action)
	},
	changeroute(params){
		let action = {
			type:'CHAGNE_ROUTE',
			params:params
		}
		Store.dispatch(action)
	}
}
