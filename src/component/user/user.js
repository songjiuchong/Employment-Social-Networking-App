import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit, authSuccess} from '../../redux/user.redux'

@connect(
	state=>state.user,
	{logoutSubmit, authSuccess}
)
class User extends React.Component{
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
		this.updateInfo = this.updateInfo.bind(this)
	}
	componentDidMount(){
		this.props.authSuccess({type:this.props.type, avatar:this.props.avatar})
	}
	updateInfo(){
		const alert = Modal.alert
        alert('提示', '是否前往修改个人信息页面?', [
          { text: '算了' },
          { text: '前往', onPress: () => {
          	const targetPath = this.props.type=='boss'?'/bossinfo':'/geniusinfo'
			this.props.history.push(targetPath)
          }},
        ])
	}
	logout(){
		const alert = Modal.alert
        alert('注销', '是否继续退出?', [
          { text: 'Cancel' },
          { text: 'Ok', onPress: () => {
			browserCookie.erase('userid')
			this.props.logoutSubmit()
          }},
        ])
	}
	render(){

		let userImg = this.props.avatar?require(`../img/${this.props.avatar}.png`):require('../img/default.png')
		return this.props.user ? (
			<div>
				<Result
					img={<img src={userImg} style={{width:50}} alt='' />}
					title={this.props.user}
					message={this.props.type=='boss' ? this.props.company:null}
				/>
				<List renderHeader={()=>'个人简介'}>
					<List.Item
						multipleLine
					>
						{this.props.title}
						{
							this.props.desc.split('\n').map(m=>(
									<List.Item.Brief key={m+Math.random()}>{m}</List.Item.Brief>
							))
						}
						{this.props.money?<List.Item.Brief>薪资:{this.props.money}</List.Item.Brief>:null}
					</List.Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<List.Item onClick = {this.updateInfo}>修改个人信息</List.Item>
				</List>
				<List>
					<List.Item onClick = {this.logout}>退出登录</List.Item>
				</List>
			</div>
		): this.props.redirectTo&&this.props.redirectTo=='/login'?<Redirect to={this.props.redirectTo} />:<div/>
	}
}

export default User
