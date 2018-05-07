import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getMsgList, sendMsg, recvMsg, listenerSet, readMsg, saveDraftMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import QueueAnim from 'rc-queue-anim'

@connect(
	state=>state,
	{getMsgList, sendMsg, recvMsg, listenerSet, readMsg, saveDraftMsg}
)
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text:'',
			showEmoji:false
		}

		const msgDraft = this.props.chat.chatdraft[this.props.match.params.user]
		if(msgDraft)
			this.state.text = msgDraft
	}
	componentDidMount(){
		this.props.getMsgList()
		if(!this.props.chat.listenerset){
			this.props.recvMsg()
			this.props.listenerSet()
		}
		setTimeout(()=>{
			// document.documentElement.scrollTop = 10000 //for chrome
			// document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
			document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
		},1500)
	}
	componentWillUnmount(){
		const to = this.props.match.params.user
		this.props.readMsg(to)
		//聊天输入框未发送消息草稿保存
		const chatDraft = this.state.text
		this.props.saveDraftMsg(to, chatDraft)
	}
	componentDidUpdate(){
		setTimeout(()=>{
			// document.documentElement.scrollTop = 10000 //for chrome
			// document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
			document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
		},200)
	}
	whenFocusOnInput(){
		setTimeout(()=>{
			// document.documentElement.scrollTop = 10000 //for chrome
			// document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
			document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
		},0)
	}
	//修正antd-mobile的Grid组件Carousel的问题
	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	handleSubmit(){
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		this.props.sendMsg({from, to, msg})
		this.setState({text:''})
	}
	render(){

		const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤔 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢 😭'
			.split(' ').filter(v=>v).map(v=>({text:v}))

		const userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users

		if(!users[userid]){
			return null
		}

		const chatid = getChatId(userid, this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid == chatid)
		const redirect = this.props.user.redirectTo
		return (
			
			<div id='chat-page'>
				{redirect&&redirect.indexOf('info')!=-1?<Redirect to={redirect}/>:null}
				<NavBar 
					className='fixed-header'
					mode='dark'
					icon={<Icon type='left'/>}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
				>
					{users[userid].name}
				</NavBar>
				<QueueAnim className='chatContent' type='scale' delay={100}>
					{chatmsgs.map(v=>{
						const avatar = require(`../img/${users[v.from].avatar}.png`)
						return v.from == userid?(
							<List key={v._id}>
								<Item
									thumb={avatar}
									className='chat-who'
									wrap
									style={{wordWrap:'break-word'}}
								>{v.content}</Item>
							</List>
						):(
							<List key={v._id}>
								<Item 
									extra={<img src={avatar} alt=''/>}
									className='chat-me'
									wrap
									style={{wordWrap:'break-word'}}
								>{v.content}</Item>
							</List>
						)
					})}
				</QueueAnim>
				<div className='stick-footer'>
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							onFocus = {
								v=>{
								this.whenFocusOnInput()
							}}
							extra={[<span 
										key='1'
										style={{marginRight:15}}
										onClick={()=>{
											this.setState({showEmoji:!this.state.showEmoji})
											this.fixCarousel()
										}}
										role='img'
										aria-label='emoji'
									>😀</span>,
									<span key='2' onClick={()=>this.handleSubmit()}>发送</span>
							]}
						></InputItem>
					</List>
					{this.state.showEmoji?
						<Grid
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={el=>{
							this.setState(
								{text:this.state.text+el.text}
							)
						}}
					/>:null}
				</div>
			</div>
		)
	}
}

export default Chat
