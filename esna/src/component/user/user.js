import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace} from 'antd-mobile'

@connect(
	state=>state.user
)
class User extends React.Component{

	render(){

		return this.props.user ? (
			<div>
				<Result
					img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt='' />}
					title={this.props.user}
					message={this.props.type=='boss' ? this.props.company:null}
				/>
				<List renderHeader={()=>'简介'}>
					<List.Item
						multipleLine
					>
						{this.props.title}
						{this.props.desc.split('\n').map(m=>(
							<List.Item.Brief key={m+Math.random()}>{m}</List.Item.Brief>
						))}
						{this.props.money?<List.Item.Brief>薪资:{this.props.money}</List.Item.Brief>:null}
					</List.Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<List.Item>退出登录</List.Item>
				</List>
			</div>
		):null
	}
}

export default User