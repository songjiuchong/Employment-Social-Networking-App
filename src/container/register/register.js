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
		this.handleRegister = this.handleRegister.bind(this)
		this.getRefEle = this.getRefEle.bind(this)
		this.whenFocusOnInput = this.whenFocusOnInput.bind(this)
		this.whenBlurOnInput = this.whenBlurOnInput.bind(this)
	}
	whenFocusOnInput(){
		this.refEle.style.position = 'relative'
		this.refEle.style.bottom = '263px'
	}
	whenBlurOnInput(){
		this.refEle.style.position = 'block'
		this.refEle.style.bottom = '0'
	}
	getRefEle(ref){
		if(ref){
			this.refEle = ref
		}
	}
	componentDidMount(){
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