import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {
	BrowserRouter, 
	Route, 
	Link, 
	Redirect, 
	Switch
} from 'react-router-dom'

import App from './App'
import {counter} from './index.redux'

function Two(){
	return <h2>two</h2>
}
function Three(){
	return <h2>three</h2>
}
class Test extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <h2>TEST {this.props.match.params.location}</h2>
	}
}

const store = createStore(counter, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<ul>
					<li>
						<Link to='/'>one</Link>
					</li>
					<li>
						<Link to='/two'>two</Link>
					</li>
					<li>
						<Link to='/three'>three</Link>
					</li>
					<li>
						<Link to='/123'>123</Link>
					</li>
				</ul>
					{/*只渲染第一个匹配的Route*/}
					<Route path='/' exact component={App}></Route>
					<Route path='/two' component={Two}></Route>
					<Route path='/three' component={Three}></Route>
					<Redirect to='/three'></Redirect>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
