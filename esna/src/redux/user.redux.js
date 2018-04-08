
import axios from 'axios'
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState={
	redirectTo:'',
	msg:'',
	user:'',
	type:''
}

//reducer
export function user(state=initState,action){
	switch (action.type){
		case AUTH_SUCCESS: 
			return {...state, msg:'', redirectTo:getRedirectPath(action.payload), ...action.payload }
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG: 
			return {...state, msg:action.msg}
		case LOGOUT:
			return {...initState, redirectTo:'/login'}
		default:
			return state
	}
}
function authSuccess(obj){
	const {pwd, ...data} = obj
	return {type:AUTH_SUCCESS, payload:data}
}
function errorMsg(msg){
	return {msg, type:ERROR_MSG}
}

//action creator
export function loadData(userinfo){
	return {type:LOAD_DATA, payload:userinfo}
}

export function logoutSubmit(){
	return {type:LOGOUT}
}

export function login({user, pwd}){
	if(!user||!pwd){
		return errorMsg('登录信息不完整')
	}
	return dispatch=>{
		axios.post('/user/login',{user,pwd})
			.then(res=>{
					if(res.status==200&&res.data.code===0){
						dispatch(authSuccess(res.data.data))
					}else{
						dispatch(errorMsg(res.data.msg))
					}
			})
	}
}

export function register({user,pwd,repeatpwd,type}){
	if(!user||!pwd||!type){
		return errorMsg('用户信息不完整')
	}
	if(pwd!==repeatpwd){
		return errorMsg('两次输入的密码不同')
	}
	return dispatch=>{
		axios.post('/user/register',{user,pwd,type})
			.then(res=>{
					if(res.status==200&&res.data.code===0){
						dispatch(authSuccess(res.data.data))
					}else{
						dispatch(errorMsg(res.data.msg))
					}
			})
	}
}

export function update(data){
	
	//这里暂时省略了对用户填写信息内容格式等的验证步骤;

	return dispatch=>{
		axios.post('/user/update',data)
			.then(res=>{
					if(res.status==200&&res.data.code===0){
						dispatch(authSuccess(res.data.data))
					}else{
						dispatch(errorMsg(res.data.msg))
					}
			})
	}
}
