import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
	static propTypes = {
		selectAvatar: PropTypes.func.isRequired
	}
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		const avatarList = 'fox,rabbit,fox1,fox2,fox3,fox4,rabbit1,rabbit2,rabbit3,rabbit4'   //src/component/img文件夹中所有头像图片的前缀名组成的字符串数组;
							.split(',')
							.map(v=>({
								icon:require(`../img/${v}.png`),
								text:v
							}))
		const gridHeader = this.state.icon ? 
							(<div>
								<span style={{'verticalAlign': 'middle'}}>已选择头像:</span>
								<img style={{'verticalAlign': 'middle', 'marginLeft':10,width:30}} src={this.state.icon}/>
							</div>) 
							: '请选择头像'
		return (
			<div>
				<List renderHeader={()=>gridHeader}>
					<Grid data={avatarList} 
						  columnNum='5'
						  onClick = {ele=>{
						  		this.setState(ele)
								this.props.selectAvatar(ele.text)
								this.props.errorMsg('')
						  }}
					/>
				</List>
			</div>
		)
	}
}

export default AvatarSelector