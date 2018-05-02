
import React from 'react'

export default function hocForm(Comp){
	return class WrapperComp extends React.Component{
		constructor(props){
			super(props)
			this.state = {hasInit:false}
			this.handleChange = this.handleChange.bind(this)
			this.initState = this.initState.bind(this)
		}
		
		initState(state){
			if(!this.state.hasInit)
				this.setState({hasInit:true, ...state})
		}

		handleChange(key,val){
			this.setState({
				[key]:val	
			})
		}

		render(){
			return <Comp handleChange={this.handleChange} initState={this.initState} state={this.state} {...this.props}></Comp>
		}

	}
}