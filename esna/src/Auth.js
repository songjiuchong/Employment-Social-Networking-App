import React from 'react'
import {connect} from 'react-redux'
import {login, getUserData} from './Auth.redux'
import {Redirect} from 'react-router-dom'

@connect(
	state=>state.auth,
	{login, getUserData}
)
class Auth extends React.Component{
	componentDidMount(){
		this.props.getUserData()
	}
	render(){
		return (
			<div>
				<h2>my name is {this.props.user}, my age is {this.props.age}</h2>
				{this.props.isAuth? <Redirect to='/dashboard'/> : null}
				<h2>You do not have permission to view this Page.</h2>
				<button onClick={this.props.login}>login</button>
			</div>
		)
	}
}

export default Auth