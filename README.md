# Employment-Social-Networking-App
Employment-Social-Networking-App is built on Redux+React Router+Node.js





Redux+React Router+Node.js全栈开发笔记;


参考: https://coding.imooc.com/learn/list/150.html


1.课程目标和学习内容;

<1.1>课程内容;

开发一个有实时聊天功能的招聘APP;

APP所包含的功能模块:
(1)登录注册(/登出);
(2)信息完善;
(3)个人中心;
(4)牛人列表;
(5)BOSS列表;
(6)消息列表;
(7)聊天详情页;


课程内容可以分成三个部分, 参考下图:

￼



2.知识储备;

<2.1>React开发环境;

(1)React官方脚手架;

create-react-app 是一个官方推荐的react项目脚手架工具,自动配置webpack和eslint等内容, 也支持开发者的定制配置;

Create React App works on macOS, Windows, and Linux with no build configuration.

官网: https://github.com/facebookincubator/create-react-app
https://github.com/songjiuchong/create-react-app (forked)


create-react-app使用步骤:

<1>安装create-react-app;
$ sudo npm install -g create-react-app

<2>初始化一个react项目目录(安装react需要的基本开发环境,架构,以及第三方依赖, 如: ReactDOM);
$ create-react-app myapp

<3>查看生成的目录内容;
￼

基本结构:
￼

package.json的结构:

￼

其中react-scripts中包含了所有webpack和eslint的配置, 相当于一个向外部暴露的黑盒; 之后如果需要自定义相关配置就需要使用eject命令先将其弹出; 


<4>启动项目;
$ npm start

￼


<5>浏览器访问localhost:3000 查看调试页面(当修改App.js内容后页面会自动刷新);

￼


<6>安装第三方库;

$ npm install redux —save

然后在index.js中添加:
import {createStore} from 'redux';
刷新页面后不会报错, 说明redux已经正确安装;


<7>弹出react-scripts;

$ npm run eject

￼

需要注意的是, 这个步骤是不可逆的, 一旦选择yes, 那么就会安装一系列原本封装在react-scripts中的依赖, 并且会重新配置package.json;

￼

弹出成功后观察文件目录的变化:

￼

新增了config和scripts这两个目录, 其中config中是一些jest和webpack相关的配置文件, scripts中是实际执行npm run相关命令时运行的源代码, 之后可以通过node命令来运行;

观察package.json的变化:

￼

除了在dependencies中添加了许多原本封装在react-scripts中的第三方依赖, 可以看到还对一些依赖进行了配置;


补充:

￼



<2.2>ES6常用语法(补充);

(1)模板字符串使用``来表示, 除了可以连接字符串和变量, 还支持直接换行(而不需要\n);

例子:
在控制台输入:
console.log('1\n2\n3')
显示为:
1
2
3

在控制台输入:
console.log(“a
b
v”);
会报错: Invalid or unexpected token…

在控制台输入(chrome浏览器console中使用shift+enter来换行, IE和FF有多行模式):
console.log(`1
2
3`)
显示为:
1
2
3


(2)对象的计算属性;

例子:
let name = 'song';
let obj = {};
obj[name+1] = 1; 
console.log(obj.song1); //1;

let test = function(){console.log(4);};
obj = {
  name,
  test,
  [name+2]:2,    //这里[]中的内容就是计算属性;
  test1(){ console.log(3)}
}
console.log(obj);

控制台显示:
1
     [object Object] {
name: "song",
song2: 2,
test: function (){window.runnerWindow.proxyConsole.log(4);},
test1: test1(){ window.runnerWindow.proxyConsole.log(3)} }



<2.3~2.4>express+mongodb基础;

(1)Express开发web后台接口;
(2)非关系型数据库mongodb (不同于一般的表结构数据库, mongodb存储类似JSON对象的数据)
(3)使用nodejs的mongoose模块链接和操作mongodb; 


补充:
1.NoSQL(NoSQL = Not Only SQL )，泛指非关系型的数据库; NoSQL数据库的产生就是为了解决大规模数据集合多重数据种类带来的挑战，尤其是大数据应用难题; 

NoSQL数据库的四大分类:
(1)键值(Key-Value)存储数据库;
(2)列存储数据库;
(3)文档型数据库;
(4)图形(Graph)数据库;


express+mongodb开发步骤:

(1)安装express;

$ npm install express --save


(2)在项目目录下新建一个server文件夹, 并在其中创建server.js;

 
(3)安装nodemon(可以监听nodejs文件的改动, 如果有改动就会自动重启文件);

$ npm install -g nodemon

之后在控制台中将命令:
$ node server.js
改为:
$ nodemon server.js

就可以使用nodemon来运行并监听nodejs文件了;


(4)安装mongodb;

$ cd ~
$ brew install mongodb
$ mongod —config /usr/local/etc/mongod.conf

//启动;
$ mongo


(5)安装mongoose;

$ npm install mongoose —save


(6)修改server.js文件来测试mongo的连接;

server.js;

const express = require('express')
const mongoose = require('mongoose')

//连接mongo, 并且使用esna这个集合(如果不存在会新建);
const DB_URL = 'mongodb://127.0.0.1:27017/esna'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
  console.log('mongo connect success')
})

//新建一个文档模型('表'), 文档名为user, 文档内容定义在mongoose.Schema对象的参数中;
const User = mongoose.model('user', new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}
}))

//新增数据;
// User.create({
//  user:'imooc',
//  age:18
// },function(err, doc){
//  if(!err){
//    console.log(doc)
//  }else{
//    console.log(err)
//  }
// })

//删除数据;
// User.remove({age:18},function(err,doc){
//  console.log(doc)
// })

//更新数据;
// User.update({'age':'18'},{'$set':{user:'x'}},function(err,doc){
//  console.log(doc)
// })

//新建app;
const app = express();

app.get('/',function(req,res){
  res.send('<h1>Hello world</h1>')
})
app.get('/data',function(req,res){
  User.find({},function(err,doc){
    res.json(doc)
  })
})
app.listen(9093,function(){
  console.log('Node app start at port 9093')
})


￼


(7)定义文档模型(类似于表);
……
//新建一个文档模型('表'), 文档名为user, 文档内容定义在一个新的mongoose.Schema对象中;
const User = mongoose.model('user', new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}
}))
……

一个数据库文档对应一个模型, 通过模型对数据库进行操作;
其中, 数据结构通过type:String/Number/...等来定义;
create, remove, update分别用来增删改操作;
find和findOne用来查询数据;


(8)新增数据;
……
//新增数据;
User.create({
  user:'imooc',
  age:18
},function(err, doc){
  if(!err){
    console.log(doc)
  }else{
    console.log(err)
  }
})
……

￼

需要注意的是, 虽然之前在创建文档模型时明确指定了user和age属性的type类型和require:true, 但是在新增数据时如果给age传入字符串数字或者不设置age都能成功新增数据(给age传入’18’时会自动转换为数字18), 但是如果给age传入不能转换为数字的字符串时会报错:
ValidationError: user validation failed: age: Cast to Number failed for value "a" at path "age”……
这点有待补充确认; 


(9)查询数据;
……
app.get('/data',function(req,res){
  User.find({},function(err,doc){
    res.json(doc)
  })
})
……

￼
需要注意的是, find方法总是返回一个数组, 就算只有一条数据或没有数据, 使用findOne方法就会返回一个对象或者null;


(10)删除数据;
……
User.remove({age:18},function(err,doc){
  console.log(doc)
})
……

返回结果为: {n: 4, ok: 1} 代表一共删除4条记录, 执行成功;


(11)更新数据;
……
User.update({'user':'imooc'},{'$set':{age:26}},function(err,doc){
  console.log(doc)
})
……

上例中返回的内容是: { n: 1, nModified: 1, ok: 1 } 匹配了找到一条数据, 并且修改了一条数据, 执行成功;
如果返回: { n: 1, nModified: 0, ok: 1 } 代表匹配了一条数据, 但是并没有更新数据(更新内容与原内容相同), 执行成功;
需要注意的是, 上例中只会查找到第一个满足'user':'imooc’的数据项并且修改其age属性, 而不会修改所有满足'user':'imooc’的项; 



3.React基础知识复习/antd-mobile UI库的使用;

React目前最新版本是16, 默认版本还是15; 

手动更新为最新版本(等到16正式发布后就不需要添加@next了):

$ npm install —save react@next react-dom@next


<3.1>例子;

(1)下图是使用react的JSX语法实际转换为JS执行时的代码:

￼


(2)修改App.js;

import React from 'react'

class App extends React.Component{
  render(){
    const boss = 'Li'
    return (
      <div>
        <h2>DLT {boss}</h2>
        <One/>
      </div>
    )
  }
}

class One extends React.Component{
  render(){
    const boss = 'Zh'
    return <h2>DLT One {boss}</h2>
  }
}

export default App

需要注意的是, 组件的render方法中只能return一个根标签, 并且如果JSX语句有多行的话需要用()括起; 

￼


(3)组件之间传递数据;

import React from 'react'

class App extends React.Component{
  render(){
    const boss = 'Li'
    return (
      <div>
        <h2>DLT {boss}</h2>
        <One boss = 'Zh'/>
      </div>
    )
  }
}

class One extends React.Component{
  render(){
    return (
      <div>
        <h2>DLT One {this.props.boss}</h2>
        <Two boss = 'Song'/>
      </div>
    )
  }
}

function Two(props){
  return <h2>DLT {props.boss}</h2>
}

export default App

需要注意的是, 如果组件只有render函数, 还可以用函数的形式写组件, 但是不要使用this.props, 因为不是一个类, 直接使用参数props; 

￼


(4)组件内部state;

Constructor用来设置初始状态, 需要先执行super(props);
state是一个不可变对象(一旦初始化后), 通过this.state来获取, this.setState来修改;

import React from 'react'

class App extends React.Component{
  render(){
    const boss = 'Li'
    return (
      <div>
        <h2>DLT {boss}</h2>
        <One boss = 'Zh'/>
      </div>
    )
  }
}

class One extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      soldier:['a','b','c']
    }
  }
  render(){
    return (
      <div>
        <h2>DLT One {this.props.boss}</h2>
        <ul>
          {this.state.soldier.map(v=>{
            return <li key={v}>{v}</li>
          })}
        </ul>
        <Two boss = 'Song'/>
      </div>
    )
  }
}

function Two(props){
  return <h2>DLT {props.boss}</h2>
}

export default App

￼


需要注意的是, 上例中如果没有在返回的<li></li>元素中添加值唯一的key属性, 虽然程序可以执行, 但是会在console中报错:
Warning: Each child in an array or iterator should have a unique "key" prop.


(5)事件;

onClick点击事件;
<1>JSX中, onClick={this.函数名}来绑定事件;
<2>this引用的问题, 需要在构造函数中使用bind绑定this;
<3>this.setState修改本组件state, 需要传入新的state对象, 而不是修改已存在的state;

import React from 'react'

class App extends React.Component{
  render(){
    const boss = 'Li'
    return (
      <div>
        <h2>DLT {boss}</h2>
        <One boss = 'Zh'/>
      </div>
    )
  }
}

class One extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      soldier:['a','b','c']
    }
    this.addSoldier = this.addSoldier.bind(this)
  }
  
  addSoldier(){
    this.setState({
      soldier:[...this.state.soldier, 'new soldier ' + Math.random(1)]
    })
  }

  render(){
    return (
      <div>
        <h2>DLT One {this.props.boss}</h2>
        <button onClick={this.addSoldier}>add new soldier</button>
        <ul>
          {this.state.soldier.map(v=>{
            return <li key={v}>{v}</li>
          })}
        </ul>
        <Two boss = 'Song'/>
      </div>
    )
  }
}

function Two(props){
  return <h2>DLT {props.boss}</h2>
}

export default App

￼

需要注意的是, 除了在constructor中使用this.addSoldier = this.addSoldier.bind(this)来绑定事件回调函数内部的this, 还可以使用箭头函数:
<button onClick={()=>this.addSoldier()}>add new soldier</button>
当然也可以在指定addSoldier时就使用箭头函数:
addSoldier = ()=>{
    this.setState({
      soldier:[...this.state.soldier, 'new soldier ' + Math.random(1)]
    })
  }


(6)React生命周期;

React组件有若干钩子函数, 在组件的不同状态下执行;

参考下图:

￼

￼


需要注意的是, 上图中的Second Render指的是子组件第一次render时的生命周期情况, 与父组件第一次render稍有不同的是, 由于其defaultProps是由父组件传递进来的, 所以不需要执行getDefaultProps函数; 
而Props Change这一项更准确的表述应该是Props Received from Parent Component, 原因下面就会讲解; 

……
ReactDOM.render(<App />, document.getElementById('root'));
……


import React from 'react'

class App extends React.Component{
  render(){
    const boss = 'Li'
    return (
      <div>
        <h2>DLT {boss}</h2>
        <One boss = 'Zh'/>
      </div>
    )
  }
}

class One extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      soldier:['a','b','c']
    }
    console.log('组件初始化.')
  }
  
  addSoldier = ()=>{
    this.setState({
      soldier:[...this.state.soldier, 'new soldier ' + Math.random(1)]
    })
  }

  componentWillMount(){
    console.log('组件即将加载.')
  }
  componentDidMount(){
    console.log('组件加载完毕.')
  }
  componentWillReceiveProps(nextProps){
    console.log(`组件将要接收父组件传入的Props属性${nextProps.boss}了.`)
  }
  shouldComponentUpdate(){
    console.log('是否要更新这个组件.')
    return true
  }
  componentWillUpdate(){
    console.log('组件即将更新.')
  }
  componentDidUpdate(){
    console.log('组件已经更新.')
  }
  componentWillUnmount(){
    console.log('组件已经卸载.')
  }

  render(){
    console.log('组件正在加载.')
    return (
      <div>
        <h2>DLT One {this.props.boss}</h2>
        <button onClick={this.addSoldier}>add new soldier</button>
        <ul>
          {this.state.soldier.map(v=>{
            return <li key={v}>{v}</li>
          })}
        </ul>
        <Two boss = 'Song'/>
      </div>
    )
  }
}

function Two(props){
  return <h2>DLT {props.boss}</h2>
}

export default App

上例执行后在console中显示:

组件初始化.
组件即将加载.
组件正在加载.
组件加载完毕.

所以上例虽然是子组件, 但是由于是第一次被render, 所以属于first render的范畴;


上例点击add new按钮后由于更改了组件的state, console中显示:

是否要更新这个组件.
组件即将更新.
组件正在加载.
组件已经更新.


import React from 'react'

class App extends React.Component{
  constructor(){
    super()
    this.state = {mystate:1}
  }
  myUpdate = ()=>{
    this.setState({
      mystate: this.state.mystate + 1
    })
  }
  render(){
    const boss = 'Li'
    return (
      <div>
        <h2>DLT {boss}</h2>
        <button onClick={this.myUpdate}>change mystate</button>
        <One boss = 'Zh'/>
      </div>
    )
  }
}

class One extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      soldier:['a','b','c']
    }
    console.log('组件初始化.')
  }
  
  addSoldier = ()=>{
    this.setState({
      soldier:[...this.state.soldier, 'new soldier ' + Math.random(1)]
    })
  }

  componentWillMount(){
    console.log('组件即将加载.')
  }
  componentDidMount(){
    console.log('组件加载完毕.')
  }
  componentWillReceiveProps(nextProps){
    console.log(`组件将要接收父组件传入的Props属性${nextProps.boss}了.`)
  }
  shouldComponentUpdate(){
    console.log('是否要更新这个组件.')
    return true
  }
  componentWillUpdate(){
    console.log('组件即将更新.')
  }
  componentDidUpdate(){
    console.log('组件已经更新.')
  }
  componentWillUnmount(){
    console.log('组件已经卸载.')
  }

  render(){
    console.log('组件正在加载.')
    return (
      <div>
        <h2>DLT One {this.props.boss}</h2>
        <button onClick={this.addSoldier}>add new soldier</button>
        <ul>
          {this.state.soldier.map(v=>{
            return <li key={v}>{v}</li>
          })}
        </ul>
        <Two boss = 'Song'/>
      </div>
    )
  }
}

function Two(props){
  return <h2>DLT {props.boss}</h2>
}

export default App

￼

上例在点击change mystate按钮后在console中显示:

组件将要接收父组件传入的Props属性Zh了.
是否要更新这个组件.
组件即将更新.
组件正在加载.
组件已经更新.

上例中, 父组件每次更改state后重新render都会再次render其子组件, 虽然每次传入子组件的props值相同, 但是都会触发componentWillReceiveProps这个钩子函数, 并将传给子组件的props传入这个钩子函数的参数列表;


补充:
1.如果使用以下方式render嵌套组件:
……
import App,{One} from './App';

ReactDOM.render(<App>123<One/>456</App>, document.getElementById('root'));
……

页面中只会render App组件的内容, <App></App>中的内容会被当成App组件的this.props.children传入, 而不能直接通过ReactDOM.render()方法生成;

如果使用以下方式render嵌套组件:
……
import App,{One} from './App';

ReactDOM.render(<App><One/></App>, document.getElementById('root'));
……

class App extends React.Component{
  constructor(){
    super()
    this.state = {mystate:1}
  }
  myUpdate = ()=>{
    this.setState({
      mystate: this.state.mystate + 1
    })
  }
  render(){
    const boss = 'Li'
    return (
      <div>
        <h2>DLT {boss}</h2>
        <button onClick={this.myUpdate}>change mystate</button>
        {this.props.children}
      </div>
    )
  }
}
……

上例这种方式在页面加载后, console显示(与之前行为相同):

组件初始化.
组件即将加载.
组件正在加载.
组件加载完毕.

点击add new soldier按钮后, console显示(与之前行为相同):

是否要更新这个组件.
组件即将更新.
组件正在加载.
组件已经更新.

点击change mystate按钮后, console中不会显示内容, 但是App组件的mystate状态一直在实时变化;
说明使用上例这种方式render嵌套组件后, One组件没有被认为是App组件的子组件, 当App组件状态变化后并不会自动去走一遍update子组件的流程;
并且使用这种方式也无法在父组件的render方法中为子组件传递props属性; 
当然如果上例这种情况下要为子组件设置初始属性可以通过:
ReactDOM.render(<App><One boss='outsider’></One></App>, document.getElementById('root'));

 2.关于组件类constructor方法的参数;
……
ReactDOM.render(<App ini='1'></App>, document.getElementById('root'));
……

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {mystate:1}
    console.log(this.props.ini)
  }
  myUpdate = ()=>{
    this.setState({
      mystate: this.state.mystate + 1
    })
  }
  render(){
    const boss = 'Li'
    return (
      <div>
        <h2>DLT {boss}{this.props.ini}</h2>
        <button onClick={this.myUpdate}>change mystate</button>
        <One boss='Zh'/>
      </div>
    )
  }
}

上例中如果不在constructor方法中传递props给super()方法就不能在constructor方法中读取this.props属性, 但是不会影响在render()方法中使用
<h2>DLT {boss}{this.props.ini}</h2>; 
原因是, 在运行完组件的constructor方法后react会通过getDefaultProps方法重新使用默认传入的props属性为this.props赋值; 

还有一点需要注意的是, this.props中的所有属性都是是只读属性, 所以无法在constructor中为其赋值;
如果在react使用getDefaultProps时发现组件当前的this.props与default props不相同时(也就是开发者在constructor中为this.props重新赋值了), 就会报错(但是不会中断程序, 会将default props属性覆盖用户为this.props赋值的属性):
Warning: App(...): When calling super() in `App`, make sure to pass up the same props that your component's constructor was passed.
所以不要在constructor中对this.props或者this.props中的任何属性赋值;


(7)安装react官方推荐的开发插件(chrome);

￼

￼

安装完毕后再次打开chrome开发者工具, 就会发现新增了debug react项目代码的选项:

￼

右侧工具栏还能实时显示选中组件的Props和State;


(8)antd-mobile UI组件库;

蚂蚁金服出品的UI组件库, 有两个版本, 一个是PC端的, 一个是移动端的;

这里使用移动端最新的2.0版:
http://beta.mobile.ant.design/
https://mobile.ant.design/

安装:
$ npm install antd-mobile@next —save

使用(同时引入antd-mobile的Button组件以及CSS):
……
import {Button} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
……

css文件的路径参考:
￼

然后使用Button组件:
……
<Button type=‘primary’ onClick={this.myUpdate}>change mystate</Button>
……
<Button type='ghost' onClick={this.addSoldier}>add new soldier</Button>
……

antd-mobile的Button组件的具体使用方式以及API可以参考:
https://mobile.ant.design/components/button/


在页面中显示:

￼


安装并配置babel插件: babel-plugin-import;

之前使用的两条import语句来分别引入antd-mobile的Button组件和antd-mobile的css文件:
import {Button} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

这两条import语句相当于将整个库都引入后单独使用了Button组件;

为了提高打包编译的速度和浏览器下载资源的速度, 可以通过以下的写法来按需加载组件:
import Button from 'antd/lib/button';
import 'antd/lib/button/style';

上面的两条import语句将antd-mobile的Button组件以及相关css单独引入;

更好的办法是使用 babel, 用 babel-plugin-import 来实现同样的按需加载效果:

安装:
$ npm install babel-plugin-import —save-dev

修改package.json, 将babel配置修改为(相当于修改了.babelrc文件):

"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      ["import", { "libraryName": "antd-mobile", "style": "css" }]
    ]
  },
……

需要注意的是, 由于package.json是json文件, 所以需要将键值对都用双引号括起; 

之后babel插件会将import命令后的antd-mobile转换成 antd/lib/xxx 这样的写法了，同时因为设置了 style 属性，模块样式也可以按需自动加载，不需要再手动引入css或less文件了, 所以现在只需要引入: 
import { Button } from 'antd-mobile';

相当于引入了:
node_modules/antd-mobile/lib/button/index.js
node_modules/antd-mobile/lib/button/style/css.js


babel-plugin-import 用法参考:
￼

￼

参考:
https://www.cnblogs.com/yswz/p/7165031.html
https://github.com/ant-design/babel-plugin-import / https://www.npmjs.com/package/babel-plugin-import (babel-plugin-import 官方使用说明, 重要)


antd-mobile常用组件;

<1>Layout 布局组件;
<2>表单组件, 数据展示组件, 选择器…
<3>操作组件;

例子(List, API参考: https://mobile.ant.design/components/list/):
……
import {Button, List} from 'antd-mobile'
……
render(){
    console.log('组件正在加载.')
    return (
      <div>
        <h2>DLT One {this.props.boss}</h2>
        <Button type='ghost' onClick={this.addSoldier}>add new soldier</Button>
        <List renderHeader={()=>'soldier list'} renderFooter={()=>'soldier list footer'}>
          {this.state.soldier.map(v=>{
            return (<List.Item key={v}>
              {v}
            </List.Item>)
          })}
        </List>
        <Two boss = 'Song'/>
      </div>
    )
  }
……

￼



4.Redux状态管理/React-router;

<4.1>例子;

修改src/index.js;

import {createStore} from 'redux'

function counter(state=0, action){
  switch(action.type){
    case '增加武器':
      return state+1
    case '减少武器':
      return state-1
    default:
      return 10
  }
}

const store = createStore(counter)

const init = store.getState()

console.log(init);

function listener(){
  const current = store.getState()
  console.log(`目前有${current}把武器.`)
}

store.subscribe(listener)

store.dispatch({type:'增加武器'})
store.dispatch({type:'减少武器'})
store.dispatch({type:'增加武器'})

上例运行后在控制台显示:

10
目前有11把武器.
目前有10把武器.
目前有11把武器.


<4.2>Redux与React一起使用;

在src下新建一个index.redux.js来单独管理redux;

src/index.redux.js;

const ADD_GUN = '增加武器'
const REMOVE_GUN = '减少武器'

//reducer;
export function counter(state=0, action){
  switch(action.type){
    case ADD_GUN:
      return state+1
    case REMOVE_GUN:
      return state-1
    default:
      return 10
  }
}

//action creator;
export function addGUN(){
  return {type:ADD_GUN}
}
export function removeGUN(){
  return {type:REMOVE_GUN}
}


修改src/index.js;

import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'
import App from './App'
import {counter} from './index.redux'

const store = createStore(counter)

function render(){
  ReactDom.render(<App store={store}/>, document.getElementById('root'))

}

store.subscribe(render)

render()


修改src/app.js;

import React from 'react'
import {addGUN,removeGUN} from './index.redux'

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const store = this.props.store
    const num = store.getState()
    return (
      <div>
        <button onClick = {()=>{store.dispatch(addGUN())}}>增加武器</button>
        <button onClick = {()=>{store.dispatch(removeGUN())}}>减少武器</button>
        <h1>目前有武器{num}把.</h1>
      </div>
    )
  }
}

export default App


上例在页面中加载后显示:

￼

点击增加/减少武器按钮会改变文本中显示的数量;


<4.3>组件解耦;

react的设计强调组件应该是独立的, 与应用的其它部分解耦的, 这样才能做到随时随地都能被其它地方调用, 而上面的例子的App.js中使用了: import {addGUN,removeGUN} from './index.redux' 来引入index.redux.js中的内容, 这样就与redux相关的模块发生了强耦合, 所以在设计上需要改进;

App.js;

import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const store = this.props.store
    const num = store.getState()
    const addGUN = this.props.addGUN;
    const removeGUN = this.props.removeGUN;
    
    return (
      <div>
        <button onClick = {()=>{store.dispatch(addGUN())}}>增加武器</button>
        <button onClick = {()=>{store.dispatch(removeGUN())}}>减少武器</button>
        <h1>目前有武器{num}把.</h1>
      </div>
    )
  }
}

export default App


src/index.js;

import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'
import App from './App'
import {counter, addGUN, removeGUN} from './index.redux'

const store = createStore(counter)

function render(){
  ReactDom.render(<App store={store} addGUN={addGUN} removeGUN={removeGUN} />, document.getElementById('root'))

}

store.subscribe(render)

render()

上例中react组件所需要的所有额外信息都是外部通过props属性传入的, 而不是由组件本身import的, 这样就形成了解耦;



<4.4>Redux处理异步action;

这里使用最常用的redux-thunk插件来处理异步操作;

 (1)安装redux-thunk;

$ npm install redux-thunk --save


(2)使用applyMiddleware开启redux-thunk中间件, 然后被改造过后dispatch方法就可以接收函数了;

src/index.js;

import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import {counter, addGUN, removeGUN} from './index.redux'

const store = createStore(counter, applyMiddleware(thunk))
……


(3)添加一个返回函数的异步action creator, 在组件中添加一个延迟2a增加武器的按钮;

index.redux.js;

……
export function addGUNAsync(){
  return dispatch=>{
    setTimeout(()=>{
      dispatch(addGUN())
    },2000)
  }
}


src/index.js;

……
import {counter, addGUN, removeGUN, addGUNAsync} from './index.redux'
……
function render(){
  ReactDom.render(<App store={store} addGUN={addGUN} addGUNAsync={addGUNAsync} removeGUN={removeGUN} />, document.getElementById('root'))

}


App.js;

……
const addGUNAsync = this.props.addGUNAsync;
……
<button onClick = {()=>{store.dispatch(addGUNAsync())}}>延迟发放</button>
……



<4.5>Redux调试工具(chrome);

(1)在chrome中安装Redux DevTools;
￼

安装完成后在chrome的developer tools的选项栏中就会新增Redux选项;


(2)使用Redux DevTools;

可以现在console中输入window.devToolsExtension, 查看是否返回一个函数, 如果是就说明插件安装成功, 可以使用了;

修改src/index.js:
……
import {createStore, applyMiddleware, compose} from 'redux'
……
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

修改createStore的参数为上例中的这样, 就可以在developer tools中的redux控制台观察应用中redux相关的数据变化了;

需要注意的是, compose函数的第二个参数需要传入window.devToolsExtension(), 或者f=>f(直接传递参数的空函数), 而不是()=>{}这样的空函数; 
很显然window.devToolsExtension()会返回一个函数, 这个函数接收createStore做为参数, 然后再返回一个经过封装的createStore给applyMiddleware(thunk)返回的函数做为参数; 

applyMiddleware运行原理参考:
Redux笔记中: ’17. applyMiddleware();’里的源码;


参考下图:

￼
￼
￼



<4.6>react-redux;

(1)安装react-redux;

$ npm install react-redux —save


(2)使用react-redux;

src/index.js;

import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import App from './App'
import {counter} from './index.redux'

const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
  (<Provider store={store}>
    <App /> 
  </Provider>),
  document.getElementById('root')
)


app.js;

import React from 'react'
import {connect} from 'react-redux'
import {addGUN, removeGUN, addGUNAsync} from './index.redux'

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

const mapStateToProps = (state)=>{
  return {num:state}
}

const actionCreator = {addGUN, removeGUN, addGUNAsync}

App = connect(
  mapStateToProps, actionCreator
)(App)
export default App


index.redux.js

const ADD_GUN = '增加武器'
const REMOVE_GUN = '减少武器'

//reducer;
export function counter(state=0, action){
  switch(action.type){
    case ADD_GUN:
      return state+1
    case REMOVE_GUN:
      return state-1
    default:
      return 10
  }
}

//action creator;
export function addGUN(){
  return {type:ADD_GUN}
}
export function removeGUN(){
  return {type:REMOVE_GUN}
}
export function addGUNAsync(){
  return dispatch=>{
    setTimeout(()=>{
      dispatch(addGUN())
    },2000)
  }
}

需要注意的是, 之前提过组件的解耦, 但是由于使用react-redux将会需要为UI组件创建一层外层逻辑组件的封装, 必须为connect函数传入第二个参数, 也就是组件需要触发的dispatch相关函数(这些函数会通过props传给内层UI组件), 所以只能在此通过import引入'./index.redux’中的内容, 有一定的耦合性, 但是由于整个connect过程都在这一个App.js模块中完成, 最后export的是一个经过包装的组件, 可以直接被使用; 

更多内容可以参考: Redux笔记中: ’21.React-Redux 的用法;’ 相关内容;



<4.7>使用装饰器的方式书写connect;

(1)安装babel-plugin-transform-decorators-legacy插件;
$ npm install babel-plugin-transform-decorators-legacy —save-dev


(2)在package.json中的babel配置里添加新的plugins配置;

"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd-mobile",
          "style": "css"
        }
      ],
      ["transform-decorators-legacy"]
    ]
  },


(3)改造connect的使用方法;

App.js;

……
@connect(
  state=>({num:state}),
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
……

decorator相关内容参考:
ES6/ES7/ES8笔记中: ‘136.修饰器；’相关内容;



<4.8-4.9>React-router4;

React-router4是最新版本, 与之前的React-router2不兼容, 浏览器和RN(React Native)均兼容;
从React-router4开始, react-router就被拆分为了两个库, 这里安装的react-router-dom是针对浏览器端的;

 (1)安装;

$ npm install react-router-dom —save


(2)基本使用实例;

src/index.js;

……
import {BrowserRouter, Route, Link} from 'react-router-dom'
……
function Two(){
  return <h2>two</h2>
}
function Three(){
  return <h2>three</h2>
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
        </ul>
        <Route path='/' component={App}></Route>
        <Route path='/two' component={Two}></Route>
        <Route path='/three' component={Three}></Route>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)

需要注意的是, BrowserRouter组件中也只能包含一个根元素, 所以上例中使用了一个<div></div>将其中内容包了起来;
上例在浏览器中显示为:

￼
￼

可以发现, 当点击了指向’/two’或者’/three’的Link时同样显示了’/’根目录Route的内容, 这是因为’/’默认并非是完全匹配的, 也就是说’/two’或者’/three’也同时匹配了’/’, 属于正则匹配(但是这样的正则规则只适用于’/‘, 如果是类似: ‘/two’和’/two2’这样的路径是不会同时匹配的); 解决办法是在<Route path='/' component={App}></Route>中添加一个exact属性:
<Route path='/' exact component={App}></Route>

页面显示为:
￼

需要注意的是, react-router4与react-router2不同的是, 默认情况下不是找到匹配路由规则就停止查找, 而是继续查找并渲染所有匹配规则的路由组件, 也就是说如果上例中路由改为:
……
<Route path='/' exact component={App}></Route>
<Route path='/two' component={Two}></Route>
<Route path='/three' component={Three}></Route>
<Route path='/three' component={Two}></Route>
……

那么访问’/three’时页面中会同时渲染Three和Two组件, 上例中如果给<Route path='/three' component={Three}></Route>添加exact属性也不会影响最后结果, 因为确实是完全匹配了’/three’, 只是同时存在两个’/three’这样的路由规则; 


(3)Route的path属性中使用’/:’;

src/index.js;

……
class Test extends React.Component{
  constructor(props){
    super(props)
    console.log(this.props)
  }
  render(){
    return <h2>TEST</h2>
  }
}
……
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
        </ul>
        <Route path='/' exact component={App}></Route>
        <Route path='/:location' component={Test}></Route>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
 
上例在浏览器中显示:
￼

可以发现, 在Route使用类似: <Route path='/:location' component={Test}></Route> 这种方式定义path后, Test组件的props属性的match属性中将会与不在path中使用’/:’的Route定义有一些不同, 前者的params属性中的值是一个以path中’/:’后指定的字符串为key, 实际匹配路由地址中字符串为value的对象, 而后者是一个空对象;

下图是直接访问’/test’, 并且匹配到了path=‘/test’的Route的情况:
￼

那么根据上面显示的传入组件props属性中的这些内容可以发现, 在组件中使用this.props.match.params.location就可以获取实际路由地址中匹配Route组件中path属性’/:’后的字符串了;
还可以发现, this.props.history中的location属性与this.props.location属性相同;

需要注意的是, 使用组件中this.props.history.push/replace方法可以触发react-router的路由系统, 但是如果直接使用类似: window.history.pushState({},null,'/two'); 这样的方式只会更改浏览器地址栏地址, 而不会触发react-router的路由系统;


(4)Redirect;

在 react-router4 中, <Redirect>组件有from和to属性, from 属性仅用于<Redirect>处于<Switch> 组件中的时候使用, 如果脱离<Switch>单独使用, 那么在不使用react-router4的Link组件或者Route对应component的this.props.history.push/replace()方法来跳转的情况下, 手动修改浏览器地址栏跳转或者重新刷新页面则一定会跳转到Redirect组件指定的路由; 如果使用了Link组件或者Route对应component的this.props.history.push/replace()方法, 则会直接忽略Redirect组件(不过以上所说的情况都会在console报错: Warning: You tried to redirect to the same route you're currently on: … 之后会解释报错的具体原因);
当它位于<Switch>语句中时, 只有在其他路由不匹配或者匹配from属性指定路径的情况下, 才会渲染Redirect组件; 


(5)Switch;

src/index.js;

……
class Test extends React.Component{
  render(){
    return <h2>TEST {this.props.match.params.location}</h2>
  }
}
……
<Route path='/' exact component={App}></Route>
<Route path='/two' component={Two}></Route>
<Route path='/three' component={Three}></Route>
<Route path='/:location' component={Test}></Route>
……

上例在浏览器中显示:
￼
￼

可以发现, 当路径不匹配任何路由规则时就会触发Test组件渲染, 但是上例的问题是, 点击two或者three按钮同时也会渲染Test组件;
解决方法(给Route组件添加exact无法解决这个问题)是使用Switch组件, 因为Switch组件只会去渲染其中第一个匹配的路由;

src/index.js;

……
        <Switch>
          {/*只渲染第一个匹配的Route*/}
          <Route path='/' exact component={App}></Route>
          <Route path='/two' component={Two}></Route>
          <Route path='/three' component={Three}></Route>
          <Route path='/:location' component={Test}></Route>
        </Switch>
……

￼


src/index.js;

……
        <Switch>
          {/*只渲染第一个匹配的Route*/}
          <Route path='/' exact component={App}></Route>
          <Route path='/two' component={Two}></Route>
          <Route path='/three' component={Three}></Route>
          <Redirect from='/123' to='/three'></Redirect>
        </Switch>
……

上例在页面加载后点击<Link to='/123'>123</Link> 会跳转到 <Route path='/three' component={Three}></Route>并渲染Three组件, 而如果在地址栏输入一个不存在匹配的路径, 如:/12345, 那么不会渲染任何component; 
如果将上例中Redirect组件中的from属性删除, 那么无论是点击<Link to='/123'>123</Link>还是在地址栏输入一个不存在匹配的路径都会跳转到<Route path='/three' component={Three}></Route>并渲染Three组件;

需要注意的是, 如果将上例中路由改为:
……
        <Switch>
          {/*只渲染第一个匹配的Route*/}
          <Redirect to='/three'></Redirect>
          <Route path='/' exact component={App}></Route>
          <Route path='/two' component={Two}></Route>
          <Route path='/three' component={Three}></Route>
        </Switch>
……

那么console中会报错:
Warning: You tried to redirect to the same route you're currently on: "/three"
这是因为路由形成了死循环, 当进入Switch组件后, 直接重定向到"/three", 然后又会进入一次路由, 再次重定向, 进入路由...
所以需要将Switch中的没有指定from属性的Redirect组件放在其它路由组件的最后(并且to属性必须与之前已存在的某个Route组件path属性匹配, 不然会进入死循环), 如果Switch中的Redirect组件指定了from属性, 并且from属性与to属性不同(如果相同又会进入死循环), 那么它可以放在任意顺序的位置;


<4.10-4.12>react-router 4 与 Redux配合使用;

应用实例1;

(1)在src中新建Auth.js, Auth.redux.js和Dashboard.js文件;





