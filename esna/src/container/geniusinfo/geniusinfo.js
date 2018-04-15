import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update, errorMsg} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import hocForm from '../../component/hoc-form/hoc-form'

@connect(
	state=>state.user,
	{update, errorMsg}
)
@hocForm
class GeniusInfo extends React.Component{
	constructor(props){
		super(props)
		// this.state = {
		// 	title:'',
		// 	desc:''
		// }

		//初始化高阶组件的state
		if(this.props.user){
			const iState = {avatar:this.props.avatar, title:this.props.title, desc:this.props.desc}
			this.props.initState(iState)
		}
	}
	componentWillReceiveProps(newProps){
		//初始化高阶组件的state
		if(!newProps.state.hasInit){
			const iState = {avatar:newProps.avatar, title:newProps.title, desc:newProps.desc}
			this.props.initState(iState)
		}
	}
	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo

		return (
			<div>
				{redirect&&redirect!==path&&redirect!=='/genius'&&redirect!=='/boss'?
					<Redirect to={this.props.redirectTo}/>
					:(redirect=='/boss'?<Redirect to='/bossinfo' />:null)
				}

				<NavBar mode="dark">牛人完善信息页面</NavBar>
				{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
				<AvatarSelector
					errorMsg={this.props.errorMsg}
					initAvatar = {this.props.state.avatar}
					selectAvatar={(imgname)=>{
						this.props.handleChange('avatar',imgname)}}
				></AvatarSelector> 
				<InputItem onChange={(v)=>this.props.handleChange('title',v)} value={this.props.state.title}>
					求职岗位
				</InputItem>
				<TextareaItem 
					onChange={(v)=>this.props.handleChange('desc',v)}
					rows={3}
					autoHeight
					title='个人简介'
					value={this.props.state.desc}
				>
				</TextareaItem>
				<Button 
					onClick={()=>{
						this.props.update(this.props.state)
					}}
					type='primary'>提交</Button>
			</div>
		)
	}

}

export default GeniusInfo