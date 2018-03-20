import React from 'react'
import {Link, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './Auth.redux'
import App from './App'

function Two(){
	return <h2>two</h2>
}
function Three(){
	return <h2>three</h2>
}

@connect(
	state=>state.auth,
	{logout}
)
class Dashboard extends React.Component{
	render(){
		const match = this.props.match
		console.log(this.props.match)
		const redirectToLogin = <Redirect to='/login'></Redirect>
		const app = (
			<div>
					<h1>Dashboard</h1>
					<button onClick={this.props.logout}>logout</button>
					<ul>
						<li>
							<Link to={`${match.url}`}>one</Link>
						</li>
						<li>
							<Link to={`${match.url}/two`}>two</Link>
						</li>
						<li>
							<Link to={`${match.url}/three`}>three</Link>
						</li>
					</ul>
					<Route path={`${match.url}/`} exact component={App}></Route>
					<Route path={`${match.url}/two`} component={Two}></Route>
					<Route path={`${match.url}/three`} component={Three}></Route>
			</div>
		)
		return this.props.isAuth ? app: redirectToLogin
	}
}

export default Dashboard