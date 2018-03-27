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

需要注意的是, package.json文件中关于babel和eslintConfig这样的配置都是相当于代替了.babelrc/.eslintrc 配置文件, 让用户执行babel/eslint 相关命令时无须每次都添加参数, 当然create-react-app会自动在webpack.config相关的配置中设置babel/eslint相关命令的执行条件; 

参考:
https://www.cnblogs.com/zhenwen/archive/2016/07/17/5679589.html (.babelrc)
https://www.cnblogs.com/ruanyifeng/p/5283708.html (.eslintrc)


补充内容:

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

//连接mongo, 并且使用esna这个数据库(如果不存在会新建);
const DB_URL = 'mongodb://127.0.0.1:27017/esna'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
  console.log('mongo connect success')
})

//新建一个集合(‘表’),名为user, 内容定义在mongoose.Schema实例对象中;
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

补充:
1.mongoDB 数据库概念;

MongoDB的一个实例可以拥有一个或多个相互独立的数据库，每个数据库都有自己的集合;
集合可以看作是拥有动态模式的表;
文档是MongoDB中基本的数据单元，类似关系型数据库表的行, 是键值对的一个有序集合;
每个文档都有个特殊的"_id",在文档所属集合中是唯一的;

参考:
https://blog.csdn.net/lihao__/article/details/76691513


(7)定义集合模型(类似于表);
……
//新建一个集合(‘表’),名为user, 内容定义在mongoose.Schema实例对象中;
const User = mongoose.model('user', new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}
}))
……

一个集合对应一个模型, 通过模型对集合进行操作;
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

修改package.json, 将babel配置修改为(相当于修改了.babelrc文件, 参考:https://www.cnblogs.com/zhenwen/archive/2016/07/17/5679589.html):

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

被connect方法包装过的组件最后在页面中的结构是类似下图这样的:
￼

也就是说connect方法会创建一个新的名为,如: Connect(Auth)这样的组件, 在组件内部做一些相关设置(如: 在componentDidMount方法中设置forceUpdate函数等), 最后在其render方法内获取this.context中的store, 并且将相关内容做为props属性传递给其子组件(UI组件), 也就是开发者自行声明的Auth组件; 

更多内容可以参考: Redux笔记中: ’21.React-Redux 的用法;’ 相关内容和 ’25.<Provider>组件’ 中 ‘React-Redux自动生成的容器组件的代码’ 相关内容;



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


需要注意的是, 如果路由使用了<Switch>组件, 那么最后渲染的页面中只包含被匹配的那个Route组件的内容, 如果不使用<Switch>组件, 那么所有Route组件都会被渲染到页面中, 但是只有最终匹配路由的Route组件其中的component会被渲染;

参考下图中页面结构:
￼
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

如果将上例中路由改为:
……
        <Switch>
          {/*只渲染第一个匹配的Route*/}
          <Route path='/' component={App}></Route>
          <Route path='/two' component={Two}></Route>
          <Route path='/three' component={Three}></Route>
        </Switch>
……

那么如果访问’/two’也会进入第一个路由并且渲染App组件, 而且不会再继续查找, 除非给<Route path='/' component={App}></Route>添加exact属性, 那么访问’/two’就会进入第二个路由;


<4.10-4.12>react-router 4 与 Redux配合使用;

应用实例;

(1)在src中新建Auth.js, Auth.redux.js和Dashboard.js文件;

 src/index.js;

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

import {counter} from './index.redux'
import Auth from './Auth'
import Dashboard from './Dashboard'

const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Auth}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
        <Redirect to='/dashboard'></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)


Dashboard.js;

import React from 'react'
import {Link, Route} from 'react-router-dom'
import App from './App'

function Two(){
  return <h2>two</h2>
}
function Three(){
  return <h2>three</h2>
}

class Dashboard extends React.Component{
  render(){
    return (
      <div>
          <ul>
            <li>
              <Link to='/dashboard/'>one</Link>
            </li>
            <li>
              <Link to='/dashboard/two'>two</Link>
            </li>
            <li>
              <Link to='/dashboard/three'>three</Link>
            </li>
          </ul>
          <Route path='/dashboard/' exact component={App}></Route>
          <Route path='/dashboard/two' component={Two}></Route>
          <Route path='/dashboard/three' component={Three}></Route>
      </div>
    )
  }
}

export default Dashboard

这里需要注意的是, 如果将上例Dashboard.js中的路由给为:
……
<Route path='/dashboard/' exact component={App}></Route>
<Route path='/dashboard/two' component={Two}></Route>
<Route path='/dashboard/two' component={Two}></Route>
<Route path='/dashboard/three' component={Three}></Route>
……
那么访问’dashboard/two’时页面会渲染两遍Two组件, 也就是说此时路由并非出于<Switch>中, 所以可以得知, 父路由如果处于<Switch>组件中, 它的子路由并不会继承<Switch>组件的功能, 需要自己重新设置组件:
……
<Switch>
  <Route path='/dashboard/' exact component={App}></Route>
  <Route path='/dashboard/two' component={Two}></Route>
  <Route path='/dashboard/two' component={Two}></Route>
  <Route path='/dashboard/three' component={Three}></Route>
</Switch>
……


index.redux.js;


const ADD_GUN = '增加武器'
const REMOVE_GUN = '减少武器'

//reducer;
export function counter(state=10, action){
  switch(action.type){
    case ADD_GUN:
      return state+1
    case REMOVE_GUN:
      return state-1
    default:
      return state
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


Auth.redux.js;

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export function auth(state={isAuth:false, user:'song'},action){
  switch(action.type){
    case LOGIN:
      return {...state, isAuth:true}
    case LOGOUT:
      return {...state, isAuth:false}
    default:
      return state
  }
}

export function login(){
  return {type:LOGIN}
}

export function logout(){
  return {type:LOGOUT}
}


App.js;

import React from 'react'
import {connect} from 'react-redux'
import {addGUN, removeGUN, addGUNAsync} from './index.redux'

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

export default App


Auth.js;

import React from 'react'
import {connect} from 'react-redux'
import {login} from './Auth.redux'

class Auth extends React.Component{
  render(){
    return <h2>Auth page</h2>
  }
}

export default Auth


通过上面的代码可以发现react-router4 路由嵌套的模式;

上例在浏览器中访问’/dashboard/two’后的html结构:
￼

还有一点需要注意的是, 目前上面的代码中存在了两个不同的reducer(也存在两种不同形式的state), 一个是index.redux.js中的counter, 另一个是Auth.redux.js中的auth, 那么很显然需要将不同的reducer/state合并成一个才能正常使用redux; 


(2)使用combineReducers来合并多个reducer;

combineReducers方法的具体机制参考:
Redux笔记中: ’12.Reducer 的拆分；’ 相关内容;


创建一个reducer.js 文件用来合并应用中的所有reducer函数;

import {combineReducers} from 'redux'
import {counter} from './index.redux'
import {auth} from './Auth.redux'

export default combineReducers({counter,auth})


修改src/index.js;

将 import {counter} from './index.redux' 删除;
添加 import reducers from './reducer'
……
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))
console.log(store.getState())
……

需要注意的是, 由于combineReducers方法的机制会改变state对象的结构, 还需要修改App.js:
……
@connect(
  state=>({num:state.counter}),
  {addGUN, removeGUN, addGUNAsync}
)
……

上例在浏览器中加载后, 控制台中显示:

￼
￼


上面显示的对象就是使用了combineReducers方法合并了counter和auth这两个reducer后执行createStore方法后生成的初始state对象;


修改Dashboard.js:

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
    const redirectToLogin = <Redirect to='/login'></Redirect>
    const app = (
      <div>
          <ul>
            <li>
              <Link to='/dashboard/'>one</Link>
            </li>
            <li>
              <Link to='/dashboard/two'>two</Link>
            </li>
            <li>
              <Link to='/dashboard/three'>three</Link>
            </li>
          </ul>
          <Route path='/dashboard/' exact component={App}></Route>
          <Route path='/dashboard/two' component={Two}></Route>
          <Route path='/dashboard/three' component={Three}></Route>
      </div>
    )
    return this.props.isAuth ? app: redirectToLogin
  }
}

export default Dashboard


在浏览器加载页面后由于初始的state.auth.isAuth是false, 所以会自动跳转到’/login’页面:
￼


修改Auth.js, 增加login功能;

import React from 'react'
import {connect} from 'react-redux'
import {login} from './Auth.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.auth,
  {login}
)
class Auth extends React.Component{
  render(){
    return (
      <div>
        {this.props.isAuth? <Redirect to='/dashboard'/> : null}
        <h2>You do not have permission to view this Page.</h2>
        <button onClick={this.props.login}>login</button>
      </div>
    )
  }
}

export default Auth

上例在页面加载后首先会跳转到’/login’页面:

￼

点击login按钮后会跳转到’/dashboard’页面;
因为点击按钮会触发dispatch({type:LOGIN}), 从而更新了state.auth.isAuth为true, 这样会使页面中使用了react-redux的conntect方法的组件被执行forceUpdate方法, 也就是重新执行其render方法更新组件状态, 由于页面中目前只有Auth组件(只有Auth组件被react-redux使用subscribe方法绑定了其forceUpdate函数), 并且其render方法中使用了{this.props.isAuth? <Redirect to='/dashboard'/> : null}逻辑来判断用户登录状态, 所以组件重新render后会直接跳转到’/dashboard’页面; 


修改Dashboard.js, 增加logout功能;

……
  render(){
    const redirectToLogin = <Redirect to='/login'></Redirect>
    const app = (
      <div>
          <h1>Dashboard</h1>
          <button onClick={this.props.logout}>logout</button>
          <ul>
            <li>
              <Link to='/dashboard/'>one</Link>
            </li>
            <li>
              <Link to='/dashboard/two'>two</Link>
            </li>
            <li>
              <Link to='/dashboard/three'>three</Link>
            </li>
          </ul>
          <Route path='/dashboard/' exact component={App}></Route>
          <Route path='/dashboard/two' component={Two}></Route>
          <Route path='/dashboard/three' component={Three}></Route>
      </div>
    )
    return this.props.isAuth ? app: redirectToLogin
  }
……

上例在页面加载后显示: 
￼

点击logout按钮后会重新render Dashboard组件, 然后跳转到’/login’页面;


使用this.props.match属性优化路由路径写法;

修改Dashboard.js;
……
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
……

需要注意的是, 类似’/dashboard/’这样以’/‘结尾的路径既能匹配’/dashboard/‘, 又能匹配’/dashboard’这样的路由, 同理,如果路径为’/dashboard’, 那么它同时能匹配路由: ’/dashboard/‘ 和 ’/dashboard‘; 



5.实际项目需求分析;

<5.1>页面分类:

￼



<5.2-5.3>前后端联调;

(1)axios;
Axios 是一个基于 promise 的 HTTP 库, 可以用在浏览器和 node.js 中; 

￼

参考:
https://www.kancloud.cn/yunye/axios/234845
https://www.npmjs.com/package/axios

安装:
$ npm install axios —save


(2)配置proxy;

由于目前前端代码是使用之前create-react-app生成的scripts文件夹中的start.js这个server文件来访问(内部其实使用了webpack-dev-server来创建server), 所以localhost:3000已经被占用, 而我们之前创建的server/server.js监听的端口是9093, 所以如果需要在localhost:3000页面中发送AJAX请求访问localhost:9093的资源就存在跨域问题, 这里使用proxy来解决;

修改package.json;
……
"eslintConfig": {
    "extends": "react-app"
  },
  "proxy":"http://localhost:9093",
……

添加proxy相关设置, 这样就使得页面中所有指向localhost:3000的请求都被转发到9093端口获取数据;


补充:
1.在package.json中添加的proxy设置会被create-react-app生成的相关文件读取然后配置webpackDevServer:

config/paths.js
……
appPublic: resolveApp('public'),
……
appPackageJson: resolveApp('package.json'),
……

scripts/start.js
……
const appName = require(paths.appPackageJson).name;
const urls = prepareUrls(protocol, HOST, port);
const compiler = createCompiler(webpack, config, appName, urls, useYarn);
const proxySetting = require(paths.appPackageJson).proxy;
const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    );
const devServer = new WebpackDevServer(compiler, serverConfig);
……

从上面的内容还可以发现, create-react-app在创建WebpackDevServer时会先有一个compile的过程, 就是根据webpack.config中的内容对指定文件进行build; 

关于const proxyConfig = prepareProxy(proxySetting, paths.appPublic) 这条语句, paths.appPublic返回的是项目下public文件夹的路径信息, 而这里的prepareProxy方法之所以需要传入这第二个参数, 是因为在设置proxy时需要判断请求的是否是public文件夹中的内容, 如果是则不需要代理转发请求, 因为public文件夹中保存的都是webpack-dev-server生成的静态文件, 其中最重要的就是index.html文件, 也就是浏览器向webpack-dev-server(localhost:3000)服务器请求页面时返回的初始html文件(包含<div id="root"></div>这个节点), bundle.js文件就包含在其中; 也就是说, 除了请求localhost:3000服务器中public文件夹下的文件, 其它请求都会被proxy转发; 

所以, create-react-app在用户启用其内置server的时候会读取package.json中关于proxy的配置, 然后对server进行proxy的设置, 转发请求;
￼


(3)测试前后端通信;

修改Auth.js;
……
import axios from 'axios'
……
class Auth extends React.Component{
  componentDidMount(){
    axios.get('/data').then(res=>{
      console.log(res)
    })
  }
……

页面加载后console中成功获取server.js中返回内容:
￼

server/server.js:
……
￼


如果将Auth.js修改为:

……
class Auth extends React.Component{
  constructor(){
    super()
    this.state = {data:[]}
  }
  componentDidMount(){
    axios.get('/data').then(res=>{
      if(res.status === 200){
        this.setState({data:res.data})
        console.log(this.state.data) //[......]
      }
    })
  }
  componentWillUpdate(nextProps, nextState){
    console.log(this.state.data[0]) //undefined;
    console.log(nextState.data[0].user) //imooc;
  }
  render(){
    return (
      <div>
        <h2>{this.state.data[0]?this.state.data[0].user:'none user'}</h2>
        {this.props.isAuth? <Redirect to='/dashboard'/> : null}
        <h2>You do not have permission to view this Page.</h2>
        <button onClick={this.props.login}>login</button>
      </div>
    )
  }
}
……

页面显示为:
￼

从控制台显示内容的顺序可以发现, 当react运行到this.setState()后就会先执行componentWillUpdate()方法, 此时this.state还未被更新, 新的state将作为其第二个参数传入, 当componentWillUpdate方法执行完成后才会将this.state更新, 然后执行render方法, 最后继续执行componentDidMount方法中之后的内容;

还有一点需要特别注意: 
(1)对于原生的React来说, 无论this.setState()方法是否将组件的state更新了(也就是说是否传入了一个与当前state内容不同的值), 都会触发接下去的一系列钩子函数, 包括组件的render方法;
(2)对于React配合Redux来说, 如果dispatch了一个action, 经过reducer之后最终返回了一个和之前内容相同的state, 同样会触发所有在store上subscribe的内容;
(3)但是对于react-redux来说, 如果dispatch方法执行后reducer方法最终返回了一个和之前内容相同的state(深度比较的结果), 那么使用了connect的组件的forceUpdate方法不会被执行, 也就是说这些组件不会被重新render; 实现这个功能的方法可能是react-redux在connect方法封装一个组件时, 在store.subscribe()传入的函数中在this.forceUpdate()之前会先对上一个state(组件第一次加载时会创建一个专门用来保存当前state的属性, 以便之后在subscribe回调函数中与最新的state比较, 如果不同就把新的state赋值给这个属性, 下一次再比较时会重复这个动作)与当前reducer返回的state做一个深度比较, 如果相同就不会再执行this.forceUpdate()方法;

补充:
1.对象的深度比较:
function compare(origin, target) {
    if (typeof target === 'object')    {
        if (typeof origin !== 'object') return false
        for (let key of Object.keys(target))
            if (!compare(origin[key], target[key])) return false
        return true
    } else return origin === target
}


修改Auth.redux.js;
……
const USER_DATA = 'USER_DATA'

const initState = {
  isAuth:false,
  user:'song',
  age:20
}

export function auth(state=initState,action){
  switch(action.type){
    case LOGIN:
      return {...state, isAuth:true}
    case LOGOUT:
      return {...state, isAuth:false}
    case USER_DATA:
      return {...state, user:action.payload.user, age:action.payload.age}
    default:
      return state
  }
}

export function getUserData(){
  return dispatch=>{
    axios.get('/data').then(res=>{
      if(res.status === 200){
        dispatch(userData(res.data[0]))
      }
    })
  }
}

export function userData(data){
  return {type:USER_DATA, payload:data}
}
……


修改Auth.js;

import React from 'react'
import {connect} from 'react-redux'
import {login, getUserData} from './Auth.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.auth,
  {login, getUserData}
)
class Auth extends React.Component{
  componentDidMount(){
    this.props.getUserData()
  }
  render(){
    return (
      <div>
        <h2>my name is {this.props.user}, my age is {this.props.age}</h2>
        {this.props.isAuth? <Redirect to='/dashboard'/> : null}
        <h2>You do not have permission to view this Page.</h2>
        <button onClick={this.props.login}>login</button>
      </div>
    )
  }
}

export default Auth

上例在页面中显示为:

￼

当前数据库中数据为:

￼

这样就完成了react-redux通过ajax获取server中数据库信息并渲染页面;


(4)axios的拦截器功能;

在src中创建一个config.js文件用来设置配置;

config.js;

import axios from 'axios'
import {Toast} from 'antd-mobile'

//拦截请求;
axios.interceptors.request.use(function(config){
  Toast.loading('loading...',0)
  return config
})

//拦截响应;
axios.interceptors.response.use(function(config){
  setTimeout(()=>Toast.hide(),2000)  //为了让loading组件能显示更长时间;
  return config
})


在index.js中添加:
……
import './config'
……


上例在页面中显示:
￼


antd-mobile的Toast组件, 参考:
https://mobile.ant.design/components/toast-cn/


补充:
1.关于axios设置拦截器的注意点;
(1)interceptor必须在请求前设置才有效; (2)直接为axios全局对象创建interceptor，会导致全局的axios发出的请求或接收的响应都会被拦截到，所以应该使用axios.create()来创建单独的axios实例, 如:

var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});



6.登录注册设计;

(1)基于cookie实现用户认证;

express依赖cookie-parser插件来实现对cookie的管理, 安装cookie-parser:

$ npm install cookie-parser —save


(2)用户cookie管理流程;
￼


(3)项目文件目录结构以及登录/注册页面基本页面构建;

￼


src/index.js;

import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {
  BrowserRouter, 
  Route, 
  Redirect, 
  Switch
} from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import reducers from './reducer'
import './config'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)


src/component/logo/logo.js;

import React from 'react'
import logoImg from './job.png'
import './logo.css'

class Logo extends React.Component{

  render(){
    return (
      <div className="logo-container">
        <img src={logoImg} alt=""/>
      </div>
    )
  }
}

export default Logo


src/component/logo/logo.css;

.logo-container{
  margin-top: 50px;
  text-align: center;
  margin-bottom: 20px;
}


src/container/login/login.js;

import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.register = this.register.bind(this)
  }

  register(){
    this.props.history.push('/register')
  }

  render(){
    return (
      <div>
        <Logo></Logo>
        <h2>登录页</h2>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login


src/container/register/register.js;

import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      type: 'genius'
    }
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <List>
          <InputItem>用户名</InputItem>
          <WhiteSpace />
          <InputItem>密码</InputItem>
          <WhiteSpace />
          <InputItem>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.state.type=='genius'}>
            牛人
          </RadioItem>
          <RadioItem checked={this.state.type=='boss'}>
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button type="primary">注册</Button>
        </List>
      </div>
    )
  }
}

export default Register


上面的代码在页面加载后效果为:

访问’/login’;
￼

点击注册按钮后跳转到’/register’;
￼


antd-mobile组件参考:
https://mobile.ant.design/components/wing-blank-cn/ (WingBlank: 两翼留白)
https://mobile.ant.design/components/white-space-cn/ (WhiteSpace: 上下留白)
https://mobile.ant.design/components/list-cn/ (List: 列表)
https://mobile.ant.design/components/input-item-cn/ (InputItem: 文本输入)
https://mobile.ant.design/components/radio-cn/ (Radio: 单选框)
https://mobile.ant.design/components/button-cn/ (Button: 按钮)


(4)路由判断组件;

在component文件夹下新建文件夹authroute, 并在其中添加authroute.js;

import React from 'react'
import axios from 'axios'

class AuthRoute extends React.Component{
  componentDidMount(){
    //获取用户信息;
    axios.get('/user/info').
      then(res=>{
        if(res.status==200){
          console.log(res.data)
        }
      })
  }
  render(){
    return null
  }
}

export default AuthRoute

上例说明, 组件的render方法如果不需要渲染任何内容只需要返回null, 这样仍旧会触发componentDidMount钩子函数中的内容;


修改src/index.js;

……
import AuthRoute from './component/authroute/authroute'
……
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)


修改server/server.js;

const express = require('express')
const userRouter = require('./user')

//新建app;
const app = express();

app.use('/user',userRouter)

app.listen(9093,function(){
  console.log('Node app start at port 9093')
})

上例使用了express的中间件功能将/user的子路由交给user.js路由模块处理;


在server文件夹下新建user.js;

const express = require('express')
const Router = express.Router()

Router.get('/info',function(req,res){
  return res.json({code:1})
})

module.exports = Router


在server文件夹下新建model.js;

const mongoose = require('mongoose')

//连接mongo, 并且使用esna这个集合(如果不存在会新建);
const DB_URL = 'mongodb://127.0.0.1:27017/esna'
mongoose.connect(DB_URL)

上例说明model.js使用来存放数据库相关代码的文件;


(5)验证后的跳转;

修改authroute.js;

import React from 'react'
import axios from 'axios'
import { withRouter } from ‘react-router-dom'

@withRouter
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname) > -1){
      return null
    }
    //获取用户信息;
    axios.get('/user/info').
      then(res=>{
        if(res.status==200){
          if(res.data.code==0){
            //用户通过验证;
          }else{
            this.props.history.push('/login')
          }
        }
      })
  }
  render(){
    return null
  }
}

export default AuthRoute

上例在页面中访问’/user/info’后由于server返回的json对象中code属性为1, 所以会跳转到’/login’页面, 如果将server返回的json对象中code属性改为0, 那么上例在componentDidMount方法中会通过验证然后直接去访问’/user/info’, 最后页面显示server返回的json对象; 


修改src/index.js;
……
function Boss(){
  return <h2>BOSS page</h2>
}
……
      <div>
        <AuthRoute></AuthRoute>
        <Route path='/boss' component={Boss}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
……

上例中使用了withRouter函数来封装AuthRoute组件, 使得react-router会将当前的路由信息做为props对象传递给AuthRoute组件, 所以在AuthRoute中就可以使用this.props.location.pathname/this.props.history.push等属性或函数了;
上例在页面加载后如果访问’/boss’, 那么会自动跳转到’/login’, 如果修改server/user.js中的返回内容:
Router.get('/info',function(req,res){
  return res.json({code:0})
})
那么当访问’/boss’就能在页面中渲染Boss组件的内容了;
这样就实现了通过AuthRoute组件完成验证用户信息之后跳转;

观察下图可以观察使用了withRouter方法封装AuthRoute组件后的页面结构, 以及传递给AuthRoute组件的props的内容:
￼

需要注意的是, withRouter方法在react-router2与react-router4中的用法不同, 关于react-router2中的withRouter方法可以参考:
React-router2笔记中’11.路由的钩子;’里withRouter的相关内容; 


(6)注册交互的实现;

修改register.js

import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key,val){
    this.setState({
      [key]:val 
    })
  }
  handleRegister(){
    console.log(this.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <List>
          <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem type='password' 
          onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem type='password' 
          onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.state.type=='genius'} 
          onChange={()=>this.handleChange('type','genius')}>
            牛人
          </RadioItem>
          <RadioItem checked={this.state.type=='boss'}
          onChange={()=>this.handleChange('type','boss')}>
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register

上例中当用户填写完了所有信息后，Register组件自身的state就包含了这些内容，然后点击注册按钮，就能对用户填写的所有信息进行验证和提交了；

￼


从上例中可以发现，Register组件使用了react原生的state来保存状态而非使用redux，这是因为Register组件中的这些状态无需与其他组件共享，并且根据组件解耦的原则，在不需要依赖外部状态的情况下组件本身的状态应该就只保存在组件内部，这样方便被复用；

需要注意的是, react的虚拟Dom树与实际Dom树(这里的实际Dom树其实也是react保存在内存中的虚拟树, 用来与更新后的虚拟树做对比然后将差异更新到实际页面中)对比的机制并非是将虚拟Dom树与当前实时页面中的Dom树结构进行对比, 而是与上一次触发了react的render方法后重新绘制的虚拟Dom树进行对比, 也就是说, 如果用户自行改变了页面中Dom树的内容, 而非通过react的render方法进行修改, 那么react就不会将这个改动保存到实际Dom树中, 如果之后react的render方法再次重新渲染了虚拟Dom树, 由于最终对比的内容中不存在用户自行更改的内容, 那么除非此次虚拟树更新的内容正好与用户自行更改的内容处于相同节点，不然用户的更改就不会被其他内容替换；就像上例中用户每次在InputItem输入框中输入任何内容(InputItem元素的value属性会相应更新)就会触发它的onChange事件更新Register组件的state，从而会重新render Register组件中的所有内容到虚拟dom树中，但是由于与虚拟dom树对比的实际树中并没有包含InputItem元素value属性的更新，所以最终两棵虚拟树对比结果相同，react不会去更新页面, 用户在输入框中的输入会保留下来；


(7)注册请求发送;

在src/redux文件夹下创建user.redux.js(用来共享用户相关的数据);

import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState={
  isAuth:false,
  msg:'',
  user:'',
  pwd:'',
  type:''
}

//reducer
export function user(state=initState,action){
  switch (action.type){
    case REGISTER_SUCCESS: 
      return {...state, msg:'', isAuth:true, ...action.payload }
    case ERROR_MSG: 
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }
}

function registerSuccess(data){
  return {type:REGISTER_SUCCESS, payload:data}
}
function errorMsg(msg){
  return {msg, type:ERROR_MSG}
}

//action creator
export function register({user,pwd,repeatpwd,type}){
  if(!user||!pwd||!type){
    return errorMsg('用户信息不完整')
  }
  if(pwd!==repeatpwd){
    return errorMsg('两次输入的密码不同')
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
      .then(res=>{
          if(res.status==200&&res.data.code===0){
            dispatch(registerSuccess({user,pwd,type}))
          }else{
            dispatch(errorMsg(res.data.msg))
          }
      })
  }
}


修改src/reducer.js;

import {combineReducers} from 'redux'
import {user} from './redux/user.redux'

export default combineReducers({user})


修改src/container/register/register;

import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {register}
)
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key,val){
    this.setState({
      [key]:val 
    })
  }
  handleRegister(){
    this.props.register(this.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <List>
          <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem type='password' 
          onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem type='password' 
          onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.state.type=='genius'} 
          onChange={()=>this.handleChange('type','genius')}>
            牛人
          </RadioItem>
          <RadioItem checked={this.state.type=='boss'}
          onChange={()=>this.handleChange('type','boss')}>
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register


上例在页面加载后用户在’/register’页面输入不同信息下state的变化:

￼

￼


在src中新建一个index.css文件;

.error-msg{
  color:#f50;
  padding-left: 10px;
}


在register.js中添加显示用户报错信息的元素;
……
import '../../index.css'
……
        <List>
          {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
          <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
……


在src/index.js中引入index.css;
……
import './index.css'
……

上例在页面加载后测试截图:

￼
￼


(8)数据库模型建立;

修改model.js;

const mongoose = require('mongoose')

//连接mongo, 并且使用esna这个集合(如果不存在会新建);
const DB_URL = 'mongodb://127.0.0.1:27017/esna'
mongoose.connect(DB_URL)

const models = {
  user:{
    'user':{type:String, require:true},
    'pwd':{type:String, require:true},
    'type':{type:String, require:true},
    //用户头像
    'avatar':{type:String},
    //个人简介
    'desc':{type:String},
    //职位名
    'title':{type:String},
    //Boss需要的两个字段
    'company':{type:String},
    'money':{type:String}
  },
  chat:{
  }
}

for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel:function(name){
    return mongoose.model(name)
  }
}


需要注意的是, 使用mongoose.model创建新的集合且没有传入collection参数时，Mongoose会通过model name（就是第一个参数），调用utils.toCollectionName方法产生一个collection name，而这个方法会使name变成复数形式(如果本身就是以s结尾的就不会再改变),  如果你不想要这个过程，只要传入collection name参数或设置Schema中的collection name选项, 如:

var schema = new Schema({ name: String }, { collection: 'actor' });
// or
schema.set('collection', 'actor');
// or
var collectionName = 'actor'
var M = mongoose.model('Actor', schema, collectionName);

同样, 在查询集合时, 也可以只传入非复数形式的集合名, mongoose会先添加s再去数据库查找(如果数据库中同时存在一个集合名的复数和非复数形式, 那么就会精确匹配), 所以此项目中使用:
const User = model.getModel('user') 来获取esna数据库中的users集合, 但是在mongodb的terminal操作数据库时, 就需要使用复数形式的名称来查找了, 如:
use esna
show collections
db.users.find()

参考:
https://blog.csdn.net/azureternite/article/details/52349114


(9)服务器端添加解析请求的中间件;

安装body-parser插件和cookie-parser插件;

body-parser是一个HTTP请求体解析中间件，作用是对post请求的请求体进行解析, 使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就经常使用这个模块做为请求体解析中间件; 需要注意的是对于POST请求的Content-Type是multipart/form-data的情况下，处理相对复杂些，目前body-parser不打算对其进行支持; 

参考:
https://www.jianshu.com/p/ea0122ad1ac0 
https://www.cnblogs.com/chyingp/p/nodejs-learning-express-body-parser.html

$ npm install body-parser —save
$ npm install cookie-parser —save


修改server/server.js;

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

//新建app;
const app = express();

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

app.listen(9093,function(){
  console.log('Node app start at port 9093')
})


修改server/user.js;

const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list',function(req,res){
  User.find({},function(err,doc){
    return res.json(doc)
  })
})

Router.post('/register', function(req,res){
  const {user, pwd, type} = req.body
  User.findOne({user},function(err,doc){
    if(doc){
      return res.json({code:1, msg:'用户名重复'})
    }
    User.create({user,pwd,type},function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错'})
      }
      return res.json({code:0})
    })
  })
})

Router.get('/info',function(req,res){
  return res.json({code:0})
})

module.exports = Router


上例中在页面中完成注册后再次使用同一个用户名提交注册后就会报错, 说明之前的用户信息已经成功提交到了后端:

￼


(10)注册跳转/密码加密;

在src文件夹下新建util.js:

export function getRedirectPath({type, avatar}){
  //根据用户信息返回跳转地址;
  let url = (type==='boss')?'/boss':'/genius'
  if(!avatar){
    url += 'info'
  }
  return url
}

上例中根据用户传入的信息中是否有avatar属性来判断是否需要跳转到用户信息完善页面;
至于为什么单独将getRedirectPath函数放在src/util.js中而没有直接放在redux/user.redux.js里的原因是, getRedirectPath中并非是处理或者dispatch action的函数只是一个工具类型的函数, redux下的代码应该只包含reducer和action creator相关的内容; 


修改user.redux.js;
……
//reducer
export function user(state=initState,action){
  switch (action.type){
    case REGISTER_SUCCESS: 
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload }
    case ERROR_MSG: 
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }
}
……


再次成功注册后可以发现redux的state.user.redirectTo属性更新为了’/bossinfo’: 

￼


修改register.js;
……
render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        <Logo></Logo>
……

上例中在Register组件渲染部分的开头添加了判断是否需要redirect的逻辑, 当用户成功注册后, redux的state.user会更新, 所以Register会被重新render, 继而跳转到了用户完善信息页面;


目前用户注册成功后的密码是以明文的形式直接存储在数据库中的, 但是这样显然缺乏安全性, 所以这里需要将密码通过MD5加密后再存储;

这里使用一个第三方库: utility来完成加密(https://www.npmjs.com/package/utility);

$ npm install utility —save

修改server/user.js;
……
const utils = require('utility')
……
    User.create({user, type, pwd: utils.md5(pwd)},function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错'})
      }
      return res.json({code:0})
    })
……

重新成功注册后, 观察数据库中存储的用户信息:
……
{"_id":"5ab9e71ab7583174ac8c0227","user":"song2","type":"genius","pwd":"202cb962ac59075b964b07152d234b70","__v":0}
……


不过需要注意的是, 虽然md5不可逆（指攻击者不能从哈希值h(x)中逆推出x）而且碰撞几率低（指不能找到两个值x、x’具有相同的哈希值）；然而这种方式也是不安全的，因为只要枚举出所有的常用密码，做成一个索引表，就可以推出来原始密码，这张索引表也被叫做“彩虹表”;

比如反向解密上例中MD5存储的pwd:202cb962ac59075b964b07152d234b70:
￼

由于密码过于简单, 所以被解密的可能就非常高, 那么除了在注册时硬性规定用户创建的密码要符合一定的复杂度(比如:必须包括大小写, 特殊符号, 数字等), 还可以在服务器端通过密码加盐来增加密码的安全性; 

修改server/user.js;
……
    User.create({user, type, pwd: md5Pwd(pwd)},function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错'})
      }
      return res.json({code:0})
    })
……
//MD5密码加盐
function md5Pwd(pwd){
  const salt = 'songjiuchong_Therapists@!@251511!' 
  return utils.md5(utils.md5(pwd+salt))
}


再次观察数据库中新增的用户记录:
{"_id":"5ab9ec6ab616f84a144231b2","user":"song5","type":"boss","pwd":"1addc366314c8bc34466429522c4afdc","__v":0}

可以发现同样使用123做为密码, 得到的pwd是1addc366314c8bc34466429522c4afdc, 现在重新尝试解密:
￼

上面的结果说明, 通过了密码加盐之后, 数据库存储的pwd已经不会被轻易解密了, 就算被解密, 那解密者也只是获得了utils.md5(utils.md5(pwd+salt))中内层的utils.md5(pwd+salt)的内容, 所以安全性是非常高的;


补充:
1.在线使用MD5算法加密:
http://www.cmd5.com/

2.密码加盐;

加盐很好理解，就是给原始密码加上特定的字符串，这样给攻击者增加攻击的成本，加盐的关键在于如何选择盐; 

参考:
https://blog.csdn.net/zp1996323/article/details/54782858


(11)登录的实现;

修改redux/user.redux.js;

import axios from 'axios'
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const initState={
  redirectTo:'',
  isAuth:false,
  msg:'',
  user:'',
  pwd:'',
  type:''
}

//reducer
export function user(state=initState,action){
  switch (action.type){
    case REGISTER_SUCCESS: 
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload }
    case LOGIN_SUCCESS: 
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload }
    case ERROR_MSG: 
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }
}
function loginSuccess(data){
  return {type:LOGIN_SUCCESS, payload:data}
}
function registerSuccess(data){
  return {type:REGISTER_SUCCESS, payload:data}
}
function errorMsg(msg){
  return {msg, type:ERROR_MSG}
}

//action creator
export function login({user, pwd}){
  if(!user||!pwd){
    return errorMsg('登录信息不完整')
  }
  return dispatch=>{
    axios.post('/user/login',{user,pwd})
      .then(res=>{
          if(res.status==200&&res.data.code===0){
            dispatch(loginSuccess(res.data.data))
          }else{
            dispatch(errorMsg(res.data.msg))
          }
      })
  }
}

export function register({user,pwd,repeatpwd,type}){
  if(!user||!pwd||!type){
    return errorMsg('用户信息不完整')
  }
  if(pwd!==repeatpwd){
    return errorMsg('两次输入的密码不同')
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
      .then(res=>{
          if(res.status==200&&res.data.code===0){
            dispatch(registerSuccess({user,pwd,type}))
          }else{
            dispatch(errorMsg(res.data.msg))
          }
      })
  }
}


修改container/login/login.js;

import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {login}
)
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register(){
    this.props.history.push('/register')
  }
  handleChange(key,val){
    this.setState({
      [key]:val 
    })
  }
  handleLogin(){
    this.props.login(this.state)
  }
  render(){
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
            <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login


修改server/user.js;

const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')

Router.get('/list',function(req,res){
  User.find({},function(err,doc){
    return res.json(doc)
  })
})

Router.post('/login',function(req,res){
  const {user, pwd} = req.body
  User.findOne({user, pwd:md5Pwd(pwd)},{pwd:0,__v:0,_id:0},function(err,doc){
    if(!doc){
      return res.json({code:1, msg:'用户名或密码错误'})
    }
    return res.json({code:0, data:doc})
  })
})

Router.post('/register', function(req,res){
  const {user, pwd, type} = req.body
  User.findOne({user},function(err,doc){
    if(doc){
      return res.json({code:1, msg:'用户名重复'})
    }
    User.create({user, type, pwd: md5Pwd(pwd)}, function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错'})
      }
      return res.json({code:0})
    })
  })
})

Router.get('/info',function(req,res){
  return res.json({code:0})
})

//MD5密码加盐
function md5Pwd(pwd){
  const salt = 'songjiuchong_Therapists@!@251511!' 
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router


上例在login页面成功登录后跳转到了’/geniusinfo’页面:
￼

可以发现向’user/login’发送的Ajax请求返回的data属性对象中只有type, user和_id这三个字段, 这是因为上例在user.js中使用了:

Router.post('/login',function(req,res){
  const {user, pwd} = req.body
  User.findOne({user, pwd:md5Pwd(pwd)},{pwd:0,__v:0},function(err,doc){
    if(!doc){
      return res.json({code:1, msg:'用户名或密码错误'})
    }
    return res.json({code:0, data:doc})
  })
})

mongoose的findOne方法支持传入第二个对象参数, 来屏蔽查询到记录的某些指定属性;


(12)使用cookie保存登录状态;

修改server/user.js;

const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const _filter = {pwd:0,__v:0}

Router.get('/list',function(req,res){
  User.find({},function(err,doc){
    return res.json(doc)
  })
})

Router.post('/login',function(req,res){
  const {user, pwd} = req.body
  User.findOne({user, pwd:md5Pwd(pwd)}, _filter ,function(err,doc){
    if(!doc){
      return res.json({code:1, msg:'用户名或密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code:0, data:doc})
  })

})

Router.post('/register', function(req,res){
  const {user, pwd, type} = req.body
  User.findOne({user},function(err,doc){
    if(doc){
      return res.json({code:1, msg:'用户名重复'})
    }
    User.create({user, type, pwd: md5Pwd(pwd)}, function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错'})
      }
      const {user, type, _id} = d
      res.cookie('userid',_id)
      return res.json({code:0, data:{user, type, _id}})
    })
  })
})

Router.get('/info',function(req,res){
  const {userid} = req.cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid}, _filter, function(err,doc){
    if(err){
      return res.json({code:1, msg:'后端出错了'})
    }
    if(doc){
      return res.json({code:0, data:doc})
    }
  })
})

//MD5密码加盐
function md5Pwd(pwd){
  const salt = 'songjiuchong_Therapists@!@251511!' 
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router


修改redux/user.redux.js;

import axios from 'axios'
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState={
  redirectTo:'',
  isAuth:false,
  msg:'',
  user:'',
  type:''
}

//reducer
export function user(state=initState,action){
  switch (action.type){
    case REGISTER_SUCCESS: 
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload }
    case LOGIN_SUCCESS: 
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload }
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG: 
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }
}
function loginSuccess(data){
  return {type:LOGIN_SUCCESS, payload:data}
}
function registerSuccess(data){
  return {type:REGISTER_SUCCESS, payload:data}
}
function errorMsg(msg){
  return {msg, type:ERROR_MSG}
}

//action creator
export function loadData(userinfo){
  return {type:LOAD_DATA, payload:userinfo}
}

export function login({user, pwd}){
  if(!user||!pwd){
    return errorMsg('登录信息不完整')
  }
  return dispatch=>{
    axios.post('/user/login',{user,pwd})
      .then(res=>{
          if(res.status==200&&res.data.code===0){
            dispatch(loginSuccess(res.data.data))
          }else{
            dispatch(errorMsg(res.data.msg))
          }
      })
  }
}

export function register({user,pwd,repeatpwd,type}){
  if(!user||!pwd||!type){
    return errorMsg('用户信息不完整')
  }
  if(pwd!==repeatpwd){
    return errorMsg('两次输入的密码不同')
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
      .then(res=>{
          if(res.status==200&&res.data.code===0){
            dispatch(registerSuccess(res.data.data))
          }else{
            dispatch(errorMsg(res.data.msg))
          }
      })
  }
}


修改component/authroute/authroute.js;

import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(
  null,
  {loadData}
)
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname) > -1){
      return null
    }
    //通过上传浏览器中userid相关的cookie来获取用户登录信息;
    axios.get('/user/info').
      then(res=>{
        if(res.status==200){
          if(res.data.code==0){
            this.props.loadData(res.data.data)
          }else{
            this.props.history.push('/login')
          }
        }
      })
  }
  render(){
    return null
  }
}

export default AuthRoute


上例中需要注意的是, @withRouter必须写在@connect的前面, 因为修饰器是从后向前返回值的, 也就是说需要先通过connect方法将AuthRoute组件进行封装, 返回后的AuthRoute再被传入withRouter来添加路由属性; 
还需要注意的是, 在user.redux.js中将initState对象中的pwd属性删除了, 因为pwd属性不需要被放在redux的state中在组件之间共享, 它仅需要保存在注册和登录组件自身的state中以便发送到后端进行验证等操作; 


上例在清除cookie缓存后访问’/login’页面后的cookie/redux的state:
￼

￼

然后输入正确的用户名/密码点击登录后的cookie/redux的state:
￼
￼


上例在清除cookie信息后访问’/register’页面后的cookie/redux的state:
￼
￼

然后输入有效的用户信息点击注册后的cookie/redux的state:
￼
￼

此时如果在’/bossinfo’页面中直接刷新页面, 页面不会跳转且cookie/redux的state信息与上两张图相同;






