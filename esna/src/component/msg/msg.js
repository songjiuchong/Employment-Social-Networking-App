import React from 'react'
import {connect} from 'react-redux'
import {List, Badge, SwipeAction} from 'antd-mobile'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {removeMsg, readMsg} from '../../redux/chat.redux'

@connect(
	state=>state,
	{removeMsg, readMsg}
)
class Msg extends React.Component{
	getLast(arr){
		return arr[arr.length-1]
	}
	//给被删除聊天会话的最后一条消息添加一个标志, 之后渲染msg页面时如果某个会话的最后一条消息的标志为已删除就不显示这个会话;
	//并且在用户删除某项聊天会话时将其中所有对方发来的消息置为已读
	handleDeleteMsg(from, lastMsgId){
		this.props.removeMsg(lastMsgId)
		this.props.readMsg(from)
	}
	//将Date对象转换为如: 2018-04-25 12:00:00 这样格式的字符串
	formatDateTime(date) {  
                let y = date.getFullYear()
                let m = date.getMonth() + 1
                m = m < 10 ? ('0' + m) : m
                let d = date.getDate()
                d = d < 10 ? ('0' + d) : d
                let h = date.getHours() 
                h=h < 10 ? ('0' + h) : h
                let minute = date.getMinutes()
                minute = minute < 10 ? ('0' + minute) : minute
                let second=date.getSeconds() 
                second=second < 10 ? ('0' + second) : second
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second
    } 

	render(){
		const Item = List.Item
		const Brief = Item.Brief
		const userid = this.props.user._id

		//按照聊天会话(chatid)分组
		const msgGroup={}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
		
		//根据每个聊天会话数组中最后一条聊天记录的create_time属性进行从大到小排列
		const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			return b_last - a_last
		})
		return  (
			<ReactCSSTransitionGroup
				transitionName="esna"
				transitionAppear={true}
      			transitionAppearTimeout={500}
          		transitionEnterTimeout={500}
          		transitionLeaveTimeout={300}
			>
					{
						chatList.map(v=>{
							const lastItem = this.getLast(v)
							const targetId = lastItem.from==userid?lastItem.to:lastItem.from
							const unreadNum = v.filter(v=>
								!v.read&&v.to==userid
							).length

							return lastItem.removed?null:
								(
								<List key={lastItem.chatid}>
									<SwipeAction
										style={{ backgroundColor: 'gray' }}
										autoClose
										right={[
									        {
									          text: '取消',
									          style: { backgroundColor: '#ddd', color: 'white' },
									        },
									        {
									          text: '删除',
									          onPress: ()=>{this.handleDeleteMsg(targetId,lastItem._id)},
									          style: { backgroundColor: '#F4333C', color: 'white' },
									        },
									    ]}
									>
										<Item
											extra={<Badge text={unreadNum}></Badge>}
											thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
											arrow='horizontal'
											onClick={()=>{
												this.props.history.push(`/chat/${targetId}`)
											}}
										>	
											{lastItem.content}
											<Brief>{this.props.chat.users[targetId].name}</Brief>
											<Brief><span role='img' aria-label='emoji'>🕘</span>{this.formatDateTime(new Date(lastItem.create_time))}</Brief>
										</Item>
									</SwipeAction>
								</List>
							)
						})
					}
			</ReactCSSTransitionGroup>
		)
	}
}

export default Msg
