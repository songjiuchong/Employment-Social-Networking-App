import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlinkbar/navlinkbar'

@connect(
	state=>state
)
class Dashboard extends React.Component{
	
	render(){
		const {pathname} = this.props.location
		const user = this.props.user
		const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				//component: Boss,
				hide: user.type == 'genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				//component: Genius,
				hide: user.type == 'boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				//component: Msg,
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				//component: User,
			}
		]

		return (
			<div>
				<NavBar mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}

export default Dashboard