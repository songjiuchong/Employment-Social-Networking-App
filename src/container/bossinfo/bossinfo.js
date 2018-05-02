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
class BossInfo extends React.Component{
	constructor(props){
		super(props)
		// this.state = {
		// 	title:'',
		// 	company:'',
		// 	money:'',
		// 	desc:''
		// }

		//初始化高阶组件的state
		if(this.props.user){
			const iState = {avatar:this.props.avatar, title:this.props.title, company:this.props.company, money:this.props.money, desc:this.props.desc}
			this.props.initState(iState)
		}
	}
	componentWillReceiveProps(newProps){
		console.log(newProps)
		//初始化高阶组件的state
		if(!newProps.state.hasInit){
			const iState = {avatar:newProps.avatar, title:newProps.title, company:newProps.company, money:newProps.money, desc:newProps.desc}
			this.props.initState(iState)
		}
	}
	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo

		return (
			<div>
				{redirect&&redirect!==path&&redirect!=='/boss'&&redirect!=='/genius'?
					<Redirect to={this.props.redirectTo}/>
					:(redirect=='/genius'?<Redirect to='/geniusinfo'/>:null)
				}

				<NavBar mode="dark">BOSS完善信息页面</NavBar>
				{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
				<AvatarSelector
					errorMsg={this.props.errorMsg}
					initAvatar = {this.props.state.avatar}
					selectAvatar={(imgname)=>{
						this.props.handleChange('avatar', imgname)
					}}
				></AvatarSelector> 
				<InputItem onChange={(v)=>this.props.handleChange('title',v)} value={this.props.state.title}>
					招聘职位
				</InputItem>
				<InputItem onChange={(v)=>this.props.handleChange('company',v)} value={this.props.state.company}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>this.props.handleChange('money',v)} value={this.props.state.money}>
					职位薪资
				</InputItem>
				<TextareaItem 
					onChange={(v)=>this.props.handleChange('desc',v)}
					rows={3}
					autoHeight
					title='职位要求'
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

export default BossInfo