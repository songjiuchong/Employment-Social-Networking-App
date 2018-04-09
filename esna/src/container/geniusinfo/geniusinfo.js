import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import hocForm from '../../component/hoc-form/hoc-form'

@connect(
	state=>state.user,
	{update}
)
@hocForm
class GeniusInfo extends React.Component{
	constructor(props){
		super(props)
		// this.state = {
		// 	title:'',
		// 	desc:''
		// }
	}
	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo

		return (
			<div>
				{redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null}
				<NavBar mode="dark">牛人完善信息页面</NavBar>
				{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
				<AvatarSelector
					selectAvatar={(imgname)=>{
						this.props.handleChange('avatar',imgname)}}
				></AvatarSelector> 
				<InputItem onChange={(v)=>this.props.handleChange('title',v)}>
					求职岗位
				</InputItem>
				<TextareaItem 
					onChange={(v)=>this.props.handleChange('desc',v)}
					rows={3}
					autoHeight
					title='个人简介'
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