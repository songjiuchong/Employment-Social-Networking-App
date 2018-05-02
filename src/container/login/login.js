import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login, cleanMsg} from '../../redux/user.redux'
import hocForm from '../../component/hoc-form/hoc-form'

@connect(
	state=>state.user,
	{login, cleanMsg}
)
@hocForm
class Login extends React.Component{
	constructor(props){
		super(props)
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	register(){
		this.props.history.push('/register')
		this.props.cleanMsg()
	}
	handleLogin(){
		this.props.login(this.props.state)
	}
	render(){
		return (
			<div>
				{this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
						<InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
						<InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button onClick={this.handleLogin} type="primary">登录</Button>
					<WhiteSpace />
					<Button onClick={this.register} type="primary">注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login