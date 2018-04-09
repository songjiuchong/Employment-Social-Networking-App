import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
	static propTypes = {
		userlist: PropTypes.array.isRequired
	}
	handleChat(v){
		this.props.history.push(`/chat/${v.user}`)
	}
	render(){
		return (
			<WingBlank>
				<WhiteSpace></WhiteSpace>
				{this.props.userlist.map(v=>(
					v.avatar ? 
					<Card key={v._id} onClick={()=>this.handleChat(v)}>
						<Card.Header
							title = {v.user}
							thumb = {require(`../img/${v.avatar}.png`)}
							thumbStyle = {{width:40}}
							extra = {<span>{v.title}</span>}
						>
						</Card.Header>
						<Card.Body>
							{v.type=='boss'?<div>公司:{v.company}</div>:null}
							{v.desc.split('\n').map(d=>(
								<div key={d+Math.random()}>{d}</div>
							))}
							{v.type=='boss'?<div>薪资:{v.money}</div>:null}
						</Card.Body>
					</Card> : null
				))}
			</WingBlank>
		)
	}
}

export default UserCard