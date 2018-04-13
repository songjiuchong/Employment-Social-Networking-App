import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

//聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'
//应用已经监听了来自服务器端的'recvmsg’事件
const LISTENER_SET = 'LISTENER_SET'

const initState = {
	chatmsg:[],
	unread:0,
	users:{},
	listenerset:false
}

//reducer
export function chat(state=initState,action){
	switch(action.type){
		case MSG_LIST:
			return {...state, users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read && v.to==action.payload.userid).length}
		case MSG_RECV:
			const n = action.payload.msg.to == action.payload.userid?1:0
			return {...state, chatmsg:[...state.chatmsg, action.payload.msg], users:action.payload.users, unread:state.unread+n}
		case LISTENER_SET:
			return {...state, listenerset:true}
		// case MSG_READ:

		default:
			return state
	}
}

//action creator
function msgList(msgs, users, userid){
	return {type:MSG_LIST, payload:{msgs,users,userid}}
}
function msgRecv(msg, users, userid){
	return {type:MSG_RECV, payload:{msg, users, userid}}
}
export function listenerSet(){
	return {type:LISTENER_SET}
}

export function recvMsg(){
	return (dispatch,getState)=>{
		socket.on('recvmsg', function(data){
			const userid = getState().user._id
			if(data.doc.from==userid || data.doc.to==userid)
				dispatch(msgRecv(data.doc, data.users, userid))
		})
	}
}

export function sendMsg({from, to, msg}){
	return dispatch=>{
		socket.emit('sendmsg', {from, to, msg})
	}
}

export function getMsgList(){
	return (dispatch,getState)=>{
		axios.get('/user/getmsglist')
			.then(res=>{
				if(res.status==200 && res.data.code==0){
					const userid = getState().user._id
					dispatch(msgList(res.data.msgs, res.data.users, userid))
				}
			})
	}
}