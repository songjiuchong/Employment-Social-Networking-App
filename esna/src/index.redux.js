
const ADD_GUN = '增加武器'
const REMOVE_GUN = '减少武器'

//reducer;
export function counter(state=0, action){
	switch(action.type){
		case ADD_GUN:
			return state+1
		case REMOVE_GUN:
			return state-1
		default:
			return 10
	}
}

//action creator;
export function addGUN(){
	return {type:ADD_GUN}
}
export function removeGUN(){
	return {type:REMOVE_GUN}
}
export function addGUNAsync(){
	return dispatch=>{
		setTimeout(()=>{
			dispatch(addGUN())
		},2000)
	}
}

