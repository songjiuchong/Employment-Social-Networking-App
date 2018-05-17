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
		this.refEle = null
		this.hasFocused = false //经过交互操作后最终页面稳定状态下是否有输入框处于focus状态, 这个属性将决定下次有输入框被focus时是否会执行位置调整的操作;
		this.inFocus = false  //在onBlur事件触发后会被立即置false, 并且等待300ms后再判断是否有onFoucs事件再次将其置true, 如果有则不执行onBlur相关位置调整, 如果没有则执行位置调整并将hasFocused状态置false;
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.whenFocusOnInput = this.whenFocusOnInput.bind(this)
		this.whenBlurOnInput = this.whenBlurOnInput.bind(this)
		this.getRefEle = this.getRefEle.bind(this)
	}
	whenFocusOnInput(){
		this.inFocus = true
		if(!this.hasFocused){
			document.documentElement.scrollTop = 10000 //for chrome
			document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
			setTimeout(()=>{
				this.refEle.style.position = 'relative'
				this.refEle.style.bottom = '267px'
			},200)
			this.hasFocused = true
		}
	}
	whenBlurOnInput(){
		this.inFocus  = false
		setTimeout(()=>{
			if(!this.inFocus){
				this.refEle.style.position = 'block'
				this.refEle.style.bottom = '0'
				this.hasFocused = false
			}
		},300)
	}
	getRefEle(ref){
		if(ref){
			this.refEle = ref
		}
	}
	register(){
		this.props.history.push('/register')
		this.props.cleanMsg()
	}
	handleLogin(){
		this.props.login(this.props.state)
	}
	
	componentDidMount(){
		document.documentElement.scrollTop = 10000 //for chrome
		document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
    	document.getElementsByTagName('body')[0].style.backgroundColor = 'black'
    }
    componentWillUnmount(){
    	document.getElementsByTagName('body')[0].style.backgroundColor = '#0000000f'
    }

	render(){
		return (
			<div ref={this.getRefEle}>
				{this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
						<InputItem 
							onChange={v=>this.props.handleChange('user',v)}
							onFocus = {v=>this.whenFocusOnInput()}
							onBlur = {v=>this.whenBlurOnInput()}
						>用户</InputItem>
						<InputItem 
							type='password' 
							onChange={v=>this.props.handleChange('pwd',v)}
							onFocus = {v=>this.whenFocusOnInput()}
							onBlur = {v=>this.whenBlurOnInput()}
						>密码</InputItem>
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