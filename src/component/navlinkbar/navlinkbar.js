
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
	state=>state.chat
)
class NavLinkBar extends React.Component{
	static propTypes = {
		data:PropTypes.array.isRequired
	}
	constructor(props){
		super(props)
		this.shouldUpdateRef = null
		this.shouldUpdateUri = ''
		this.shouldUpdateUriHardCoded = require('./img/boss.png')
		this.refForUpdate = this.refForUpdate.bind(this)
	}
	refForUpdate(ref){
		console.log(ref)
		if(ref && ref.props.title == '牛人'){
			this.shouldUpdateRef = ref
			const unSelectedUri = ref.props.icon.uri
			const selectedUri = ref.props.selectedIcon.uri
			if(ref.props.selected){
				this.shouldUpdateUri = selectedUri
			}else{
				this.shouldUpdateUri = unSelectedUri
			}
		}
	}
	componentDidMount(){
		//如果处于遍历中首个被渲染的牛人图标的url不是使用data URL方法设置的, 说明server端在SSR时并没有正确解析require方法中传入的路径, 并且组件的update也未能更新元素的url属性, 所以这里手动修复;
		if(document.getElementsByClassName('am-tab-bar-tab-image')[0].src.indexOf('data:image/png;base64')<0){
			//当首屏加载'/me'页面后, 执行bundle js时根本不会去render boss图标, 所以不会触发相应的refForUpdate方法, 也就不会给this.shouldUpdateUri赋值了, 这里设置了硬编码来解决这种情况;
			if(this.shouldUpdateUri){
				document.getElementsByClassName('am-tab-bar-tab-image')[0].src = this.shouldUpdateUri
			}else{
				document.getElementsByClassName('am-tab-bar-tab-image')[0].src = this.shouldUpdateUriHardCoded
			}
			
		}
	}
	render(){
		const navList = this.props.data.filter(v=>!v.hide)
		const {pathname} = this.props.location
		return (
			<div className='fixed-bottom'>
			<TabBar tintColor="black">
				{navList.map(v=>(
					<TabBar.Item 
						ref={this.refForUpdate}
						badge={v.path=='/msg'?this.props.unread:0}
						key={v.path}
						title={v.text}
						icon={{uri:require(`./img/${v.icon}.png`)}}
						selectedIcon={{uri:require(`./img/${v.icon}_fill.png`)}}
						selected = {pathname === v.path}
						onPress={()=>{
							this.props.history.push(v.path)
						}}
					></TabBar.Item>
				))}
			</TabBar>
			{this.props.children}
			</div>
		)
	}
}

export default NavLinkBar