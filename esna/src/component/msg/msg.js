import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

@connect(
	state=>state
)
class Msg extends React.Component{

	getLast(arr){
		return arr[arr.length-1]
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
			<div>
					{
						chatList.map(v=>{
							const lastItem = this.getLast(v)
							const targetId = lastItem.from==userid?lastItem.to:lastItem.from
							const unreadNum = v.filter(v=>
								!v.read&&v.to==userid
							).length

							return (
								<List key={lastItem._id}>
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
									</Item>
								</List>
							)
						})
					}
			</div>
		)
	}
}

export default Msg
