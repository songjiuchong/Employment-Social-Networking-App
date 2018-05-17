import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import hocForm from '../../component/hoc-form/hoc-form'

@connect(
	state=>state.user,
	{register}
)
@hocForm
class Register extends React.Component{
	constructor(props){
		super(props)
		this.refEle = null
		this.hasFocused = false //经过交互操作后最终页面稳定状态下是否有输入框处于focus状态, 这个属性将决定下次有输入框被focus时是否会执行位置调整的操作;
		this.inFocus = false  //在onBlur事件触发后会被立即置false, 并且等待300ms后再判断是否有onFoucs事件再次将其置true, 如果有则不执行onBlur相关位置调整, 如果没有则执行位置调整并将hasFocused状态置false;
		this.handleRegister = this.handleRegister.bind(this)
		this.getRefEle = this.getRefEle.bind(this)
		this.whenFocusOnInput = this.whenFocusOnInput.bind(this)
		this.whenBlurOnInput = this.whenBlurOnInput.bind(this)
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
	componentDidMount(){
		document.documentElement.scrollTop = 10000 //for chrome
		document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
		this.props.handleChange('type','genius')
		document.getElementsByTagName('body')[0].style.backgroundColor = 'black'
	}
	handleRegister(){
		this.props.register(this.props.state)
	}

    componentWillUnmount(){
    	document.getElementsByTagName('body')[0].style.backgroundColor = '#0000000f'
    }

	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div ref={this.getRefEle}>
				{this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<List>
					{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
					<InputItem 
						onChange={v=>this.props.handleChange('user',v)}
						onFocus = {v=>this.whenFocusOnInput()}
						onBlur = {v=>this.whenBlurOnInput()}
					>用户名</InputItem>
					<WhiteSpace />
					<InputItem type='password' 
						onChange={v=>this.props.handleChange('pwd',v)}
						onFocus = {v=>this.whenFocusOnInput()}
						onBlur = {v=>this.whenBlurOnInput()}
					>密码</InputItem>
					<WhiteSpace />
					<InputItem 
						type='password' 
						onChange={v=>this.props.handleChange('repeatpwd',v)}
						onFocus = {v=>this.whenFocusOnInput()}
						onBlur = {v=>this.whenBlurOnInput()}
					>确认密码</InputItem>
					<WhiteSpace />
					<RadioItem checked={this.props.state.type=='genius'} 
					onChange={()=>this.props.handleChange('type','genius')}>
						牛人
					</RadioItem>
					<RadioItem checked={this.props.state.type=='boss'}
					onChange={()=>this.props.handleChange('type','boss')}>
						BOSS
					</RadioItem>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
				</List>
			</div>
		)
	}
}

export default Register