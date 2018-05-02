import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
	state=>state,
	{getUserList}
)
class Boss extends React.Component{
	componentDidMount(){
		this.props.getUserList('genius')
	}
	render(){
		const redirect = this.props.user.redirectTo
		return (
			<div>
				{redirect&&redirect.indexOf('boss')==-1&&redirect.indexOf('me')==-1?<Redirect to={'/genius'}/>:null}
				<UserCard userlist={this.props.chatuser.userlist}/>
			</div>
		)
	}
}

export default Boss