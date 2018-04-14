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
	}
	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo

		return (
			<div>
				{redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null}
				<NavBar mode="dark">BOSS完善信息页面</NavBar>
				{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
				<AvatarSelector
					errorMsg={this.props.errorMsg}
					selectAvatar={(imgname)=>{
						this.props.handleChange('avatar', imgname)
					}}
				></AvatarSelector> 
				<InputItem onChange={(v)=>this.props.handleChange('title',v)}>
					招聘职位
				</InputItem>
				<InputItem onChange={(v)=>this.props.handleChange('company',v)}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>this.props.handleChange('money',v)}>
					职位薪资
				</InputItem>
				<TextareaItem 
					onChange={(v)=>this.props.handleChange('desc',v)}
					rows={3}
					autoHeight
					title='职位要求'
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