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
//保存用户在聊天窗口未发送的消息
const MSG_SAVE = 'MSG_SAVE'
//删除msg页面中的某条聊天会话记录
const MSG_REMOVE = 'MSG_REMOVE'

const initState = {
	chatmsg:[],
	unread:0,
	users:{},
	listenerset:false,
	chatdraft:{}
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
		case MSG_READ:
			const {from, num} = action.payload
			return {
				...state, 
				chatmsg:state.chatmsg.map(v=>({...v, read:from==v.from?true:v.read})), 
				unread: state.unread-num
			}
		case MSG_SAVE:
			const {to, chatDraft} = action.payload
			return {...state, chatdraft:{...state.chatdraft, [to]:chatDraft}}
		case MSG_REMOVE:
			//需要注意的是这里返回redux的更新state对象时并没有使用immutable对象的形式来处理chatmsg数组中的对象元素(导致所有对比新/旧redux的state的地方都会出现不准确的问题), 所以需要使用immutable.js来改进
			return {...state, chatmsg:[...state.chatmsg.map(v=>{
								if(v._id == action.payload.lastMsgId){
									v.removed = action.payload.removedBy
								}
								return v
							})
						]
					}	
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
function msgRead({from,num}){
	return {type:MSG_READ, payload:{from,num}}
}
function msgRemoved(lastMsgId, removedBy){
	return {type:MSG_REMOVE, payload:{lastMsgId, removedBy}}
}

export function listenerSet(){
	return {type:LISTENER_SET}
}

export function removeMsg(lastMsgId, removedBy){
	return async dispatch=>{
		const res = await axios.post('/user/removemsg',{lastMsgId, removedBy})
		if(res.status==200 && res.data.code==0){
			dispatch(msgRemoved(lastMsgId, res.data.removed))
		}
	}
}

export function readMsg(from){
	return async dispatch=>{
		const res = await axios.post('/user/readmsg',{from})
		if(res.status==200 && res.data.code==0){
			dispatch(msgRead({from,num:res.data.num}))
		}
	}
}

export function saveDraftMsg(to, chatDraft){
	return {type:MSG_SAVE, payload:{to, chatDraft}}
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