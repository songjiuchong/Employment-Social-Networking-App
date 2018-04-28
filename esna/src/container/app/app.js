import React from 'react'
import AuthRoute from '../../component/authroute/authroute'
import {
	Route, 
	Switch
} from 'react-router-dom'
import Login from '../login/login'
import Register from '../register/register'
import BossInfo from '../bossinfo/bossinfo'
import GeniusInfo from '../geniusinfo/geniusinfo'
import Dashboard from '../../component/dashboard/dashboard' 
import Chat from '../../component/chat/chat' 

class App extends React.Component{
	constructor(props){
		super(props)
		this.state={
			hasError:false
		}
	}
	componentDidCatch(err,info){
		this.setState({
			hasError: true
		})
	}
	render(){
		return this.state.hasError?<img className='error-container' src={require('./error.png')} alt='error'/>
		:(
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					<Route path='/chat/:user' component={Chat}></Route>
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
		)
	}
}

export default App