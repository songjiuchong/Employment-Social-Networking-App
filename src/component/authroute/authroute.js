import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {authSuccess} from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(
	null,
	{authSuccess}
)
class AuthRoute extends React.Component{
	componentDidMount(){
		const publicList = ['/login', '/register']
		const pathname = this.props.location.pathname
		if(publicList.indexOf(pathname) > -1){
			return null
		}

		//通过上传浏览器中userid相关的cookie来获取用户登录信息;
		axios.get('/user/info')
			.then(res=>{
				if(res.status==200&&res.data.code==0){
						this.props.authSuccess(res.data.data)
				}else{
						this.props.history.push('/login')
				}
			})
	}
	render(){
		return null
	}
}

export default AuthRoute