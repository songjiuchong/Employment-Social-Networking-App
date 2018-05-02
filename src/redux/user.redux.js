
import axios from 'axios'
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const UPDATE_DATA = 'UPDATE_DATA'
const LOGOUT = 'LOGOUT'
const CLEAN_MSG = 'CLEAN_MSG'

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
		case UPDATE_DATA:
			return {...state, redirectTo:'/me', ...action.payload}
		case ERROR_MSG: 
			return {...state, msg:action.msg}
		case LOGOUT:
			return {...initState, redirectTo:'/login'}
		case CLEAN_MSG:
			return {...state, msg:''}
		default:
			return state
	}
}

//action creator
export function authSuccess(obj){
	const {pwd, __v, ...data} = obj
	return {type:AUTH_SUCCESS, payload:data}
}
export function errorMsg(msg){
	return {msg, type:ERROR_MSG}
}

export function logoutSubmit(){
	return {type:LOGOUT}
}

export function cleanMsg(){
	return {type:CLEAN_MSG}
}

export function updateUserInfo(updatedInfo){
	return {type:UPDATE_DATA, payload:updatedInfo}
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
	
	return dispatch=>{
		if(!data.avatar)
			dispatch(errorMsg('请先选择头像再提交'))
		else
			axios.post('/user/update',data)
				.then(res=>{
						if(res.status==200&&res.data.code===0){
							dispatch(updateUserInfo(res.data.data))
						}else{
							dispatch(errorMsg(res.data.msg))
						}
				})
	}
}
