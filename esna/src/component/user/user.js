import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'

@connect(
	state=>state.user,
	{logoutSubmit}
)
class User extends React.Component{
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
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

		return this.props.user ? (
			<div>
				<Result
					img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt='' />}
					title={this.props.user}
					message={this.props.type=='boss' ? this.props.company:null}
				/>
				<List renderHeader={()=>'简介'}>
					<List.Item
						multipleLine
					>
						{this.props.title}
						{this.props.desc?
							this.props.desc.split('\n').map(m=>(
									<List.Item.Brief key={m+Math.random()}>{m}</List.Item.Brief>
							))
							:<List.Item.Brief>待更新</List.Item.Brief>
						}
						{this.props.money?<List.Item.Brief>薪资:{this.props.money}</List.Item.Brief>:null}
					</List.Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<List.Item onClick = {this.logout}>退出登录</List.Item>
				</List>
			</div>
		): this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null
	}
}

export default User
