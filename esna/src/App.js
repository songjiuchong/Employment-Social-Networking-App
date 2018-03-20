import React from 'react'
import {connect} from 'react-redux'
import {addGUN, removeGUN, addGUNAsync} from './index.redux'

@connect(
  state=>({num:state.counter}),
  {addGUN, removeGUN, addGUNAsync}
)
class App extends React.Component{
  render(){
    return (
      <div>
        <button onClick = {this.props.addGUN}>增加武器</button>
        <button onClick = {this.props.removeGUN}>减少武器</button>
        <button onClick = {this.props.addGUNAsync}>延迟发放</button>
        <h1>目前有武器{this.props.num}把.</h1>
      </div>
    )
  }
}

export default App