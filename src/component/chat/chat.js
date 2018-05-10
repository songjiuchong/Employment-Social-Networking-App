import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getMsgList, sendMsg, recvMsg, listenerSet, readMsg, saveDraftMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import QueueAnim from 'rc-queue-anim'

//SSR中跳过对iScroll的设置, 因为会出现window not defined的错误;
const ReactIScroll = process?null:require('react-iscroll')
const iScroll = process?null:require('iscroll')

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
		this.chatmsgsLength = 0 //此聊天页面中所有需要显示的聊天记录的条数, 用来计算重新调整页面滚动条的等待时间;
		this.alreadyUpdated = false
		const msgDraft = this.props.chat.chatdraft[this.props.match.params.user]
		if(msgDraft)
			this.state.text = msgDraft
	}
	preHandler(e){
		document.getElementsByClassName('stick-footer')[0].blur()
		e.preventDefault()
		console.log(e)
	}
	updateDimensions1(thisComponent){
		setTimeout(()=>{
			document.getElementsByClassName('stick-footer')[0].style.position = 'absolute'
			document.getElementsByClassName('stick-footer')[0].scrollIntoView()
			document.getElementsByClassName('stick-footer')[0].style.bottom = '258px'
			document.getElementsByClassName('chatContent')[0].style.bottom = '300px'
			document.getElementsByClassName('chatContent')[0].scrollTo(0,10000)
			document.addEventListener('touchmove', thisComponent.preHandler, false)
		},300)
	}
	updateDimensions2(thisComponent){
		setTimeout(()=>{ //这里使用setTimout是因为blur事件会先于click事件触发, 在改变了元素位置后就无法触发接下去的相关click事件了, 所以需要让click事件先触发;
			document.getElementsByClassName('stick-footer')[0].style.position = 'fixed'
			document.getElementsByClassName('stick-footer')[0].style.bottom = '0'
			document.getElementsByClassName('chatContent')[0].style.bottom = '45px'
			document.removeEventListener('touchmove', thisComponent.preHandler, false)
		},200)
	}
	componentDidMount(){
		this.props.getMsgList()
		if(!this.props.chat.listenerset){
			this.props.recvMsg()
			this.props.listenerSet()
		}
		setTimeout(()=>{
			if(document.getElementsByClassName('chatContent')[0])
				document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
		},this.chatmsgsLength*100)
		//移动端时, 监听由聚焦输入框后引发的软键盘弹出, 然后进行一些对应的处理;
		if(navigator.userAgent.indexOf("Android")>0 || navigator.userAgent.indexOf("iPhone")>0 || navigator.userAgent.indexOf("iPad")>0){
			let timer = setInterval(()=>{
				if(document.getElementsByClassName('stick-footer')[0]){
					document.getElementsByClassName('stick-footer')[0].addEventListener("focus", ()=>{this.updateDimensions1(this)},true)
					document.getElementsByClassName('stick-footer')[0].addEventListener("blur", ()=>{this.updateDimensions2(this)},true)
					clearInterval(timer)
				}
			},200)
		}
	}
	componentWillUnmount(){
		const to = this.props.match.params.user
		this.props.readMsg(to)
		//聊天输入框未发送消息草稿保存
		const chatDraft = this.state.text
		this.props.saveDraftMsg(to, chatDraft)
		//移除监听聚焦输入框后移动端软键盘的弹出;
		document.getElementsByClassName('stick-footer')[0].removeEventListener("focus", this.updateDimensions1,true)
		document.getElementsByClassName('stick-footer')[0].removeEventListener("blur", this.updateDimensions2,true)
	}
	componentDidUpdate(){
		//如果是首次带有聊天数据的update(this.chatmsgsLength>0), 那么要等待所有聊天消息显示完成后再调整滚动条, 如果是接收新消息的更新则等待时间固定;
		if(this.alreadyUpdated){
			setTimeout(()=>{
				if(document.getElementsByClassName('chatContent')[0])
					document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
			},200)
		}else if(this.chatmsgsLength>0){
			setTimeout(()=>{
				if(document.getElementsByClassName('chatContent')[0])
					document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
			},this.chatmsgsLength*100)
			this.alreadyUpdated = true
		}
	}
	whenFocusOnInput(){
		setTimeout(()=>{
			// document.documentElement.scrollTop = 10000 //for chrome
			// document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
			document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
		},0)
		if(navigator.userAgent.indexOf("Android")>0 || navigator.userAgent.indexOf("iPhone")>0 || navigator.userAgent.indexOf("iPad")>0){
			if(this.state.showEmoji)
				document.getElementsByClassName('emojiBtn')[0].click()
		}
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
		this.chatmsgsLength = chatmsgs.length
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
				{process?
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
					</QueueAnim>:
					<ReactIScroll iScroll={iScroll}>
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
					</ReactIScroll>
				}
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
										className = 'emojiBtn'
										onClick={()=>{
											if(!this.state.showEmoji){
												setTimeout(()=>{ //这里使用setTimeout是因为之前在updateDimensions2这个onblur事件的执行函数中对.chatContent元素设置了bottom为45px, 这里需要保证在其之后执行;
													document.getElementsByClassName('chatContent')[0].style.bottom = '223px'
													document.getElementsByClassName('chatContent')[0].scrollTo(0,10000)
												},201)
											}else{
												document.getElementsByClassName('chatContent')[0].style.bottom = '45px'
											}
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
