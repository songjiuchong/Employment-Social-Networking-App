# Employment-Social-Networking-App
Employment-Social-Networking-App is built on Redux+React Router+Node.js





Redux+React Router+Node.js全栈开发笔记 (一);


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

![](./dev_memo_img/1.png)


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

![](./dev_memo_img/2.png)

package.json的结构:

![](./dev_memo_img/3.png)

其中react-scripts中包含了所有webpack和eslint的配置, 相当于一个向外部暴露的黑盒; 之后如果需要自定义相关配置就需要使用eject命令先将其弹出; 


<4>启动项目;
$ npm start

![](./dev_memo_img/4.png)

<5>浏览器访问localhost:3000 查看调试页面(当修改App.js内容后页面会自动刷新);

![](./dev_memo_img/5.png)



<6>安装第三方库;

$ npm install redux —save

然后在index.js中添加:
import {createStore} from 'redux';
刷新页面后不会报错, 说明redux已经正确安装;


<7>弹出react-scripts;

$ npm run eject

![](./dev_memo_img/6.png)

弹出成功后观察文件目录的变化:

![](./dev_memo_img/7.png)

新增了config和scripts这两个目录, 其中config中是一些jest和webpack相关的配置文件, scripts中是实际执行npm run相关命令时运行的源代码, 之后可以通过node命令来运行;

观察package.json的变化:

![](./dev_memo_img/8.png)

除了在dependencies中添加了许多原本封装在react-scripts中的第三方依赖, 可以看到还对一些依赖进行了配置;

需要注意的是, package.json文件中关于babel和eslintConfig这样的配置都是相当于代替了.babelrc/.eslintrc 配置文件, 让用户执行babel/eslint 相关命令时无须每次都添加参数, 当然create-react-app会自动在webpack.config相关的配置中设置babel/eslint相关命令的执行条件; 

参考:
https://www.cnblogs.com/zhenwen/archive/2016/07/17/5679589.html (.babelrc)
https://www.cnblogs.com/ruanyifeng/p/5283708.html (.eslintrc)


补充内容:

![](./dev_memo_img/9.png)

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

![](./dev_memo_img/10.png)

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

![](./dev_memo_img/11.png)

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

![](./dev_memo_img/12.png)

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

![](./dev_memo_img/13.png)


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

![](./dev_memo_img/14.png)


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

![](./dev_memo_img/15.png)


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

![](./dev_memo_img/16.png)


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

![](./dev_memo_img/17.png)

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

![](./dev_memo_img/18.png)

![](./dev_memo_img/19.png)

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
    console.log('组件即将卸载.')
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

![](./dev_memo_img/20.png)

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


重要补充:
1.componentDidMount()和react的其它钩子函数不同, 它是在虚拟树对比完成并将一个原本在页面中不存在的组件添加到页面之后才会触发(就算这个组件render方法返回null也会触发), 而其他的钩子函数都是在虚拟树更新和对比阶段触发的; 
2.componentDidUpdate在组件render()方法执行完之后, 虚拟树开始对比之前触发, 就算component的render方法返回null也会触发;
3.react是如何判断一个组件是否是第一次加载;
由于一个组件第一次加载时会触发其componentWillMount和componentDidMount方法, 而如果做为其它组件的子组件在父组件更新的情况下也同时被更新时就会触发componentWillUpdate/componentDidUpdate等一系列方法, 那么react是如何判断一个组件是否是第一次被加载的呢?
举个例子, 如果一个父组件的render方法中根据某个判断条件来决定是否加载一个子组件, 那么每次父组件更新时都有可能添加/移除或者更新这个子组件, 那么react是如何判断的呢?
当一个组件第一次被加载时会执行其constructor方法并新创建一个组件的实例, 之后对组件的操作其实都是对这个实例的操作, 也就是说如果是initial render(react发现这个组件还未实例化), 那么这个组件接下来会触发componentWillMount/render/componentDidMount这一系列方法, 不管是否是因为父组件的render而触发的加载, 而如果react发现一个component已经存在实例对象了, 那么就会执行update相关的一系列方法; 对一个组件的移除会触发其componentWillUnmont方法(并不会触发update相关的钩子函数), 同时react会删除已经创建的实例对象; 
但是react是如何判断一个组件是否已经实例化了呢?
其实在一个组件的render方法执行后还存在一个对比的过程(还未进行react虚拟dom树与实际树的对比), 假设一个父组件的render方法中包含了若干个子组件(多个子组件可能属于同一个组件类), 无论这些子组件是否最终会被加载(可能由于一些判断条件导致某些情况下只有一些子组件会加载, 一些会被忽略), 都会被react按顺序添加在全局范围内不会重复react id以便区分, 之后在父组件的一次render执行后哪些id的子组件加载了, 哪些id的子组件没有加载是有记录的(做为属性保存在父组件中), 接着render生成的这个父组件的虚拟树片段会和当前react中保存的虚拟树中对应的片段进行对比(由于父组件本身也存在独一无二的react id, 所以可以很方便地找到进行对比), 根据父组件对子组件的id记录(react中保存的虚拟树中的组件也有对子组件id的记录)就能很清楚的对比出哪些子组件已经创建过实例了只需要update, 哪些子组件需要创建新的实例, 哪些子组件需要被移除, 与此同时子组件就会根据判断下来的不同情况开始走自己的流程:
<1>如果是被判断为新加载的子组件, 那么就会走componentWillMount/render/componentDidMount的步骤, 很显然这种情况下子组件其下的所有子孙组件也会依次走相同的步骤;
<2>如果是被判断为update的子组件, 那么就会走componentWillUpdate/render/componentDidUpdate的步骤, 也就是说, 这种情况下它本身会做为父组件去render自己的虚拟树片段, 记录其子组件id…
<3>如果是被判断为需要移除的子组件, 那么就会走componentWillUnmont的步骤, 这种情况下子组件其下的所有子孙组件也会依次走相同的步骤;
某个组件的componentWillUnmount方法是在这个组件对应的元素被DOM操作从HTML页面中移除之前触发的;

当父组件其下的所有子孙组件的render相关流程都执行完毕后, 最初的父组件的render方法才算运行结束, 其生成的完整虚拟树片段会更新到react保存的虚拟树对应的片段中, 也就完成了react虚拟树的更新, 之后就可以进行虚拟dom树与实际树的对比了;
另外, 如果是setState/forceUpdate方法触发的组件更新一定不是首次加载, 因为这两个方法需要实例对象this来调用;
4.关于父组件和子组件钩子函数的执行顺序;

当装载一个新的父组件时:
父组件的componentWillMount先触发, 然后触发子组件的componentWillMount;
子组件的componentDidMount先触发, 然后触发父组件的componentDidMount;

当update一个父组件时:
父组件的componentWillUpdate先触发, 然后触发子组件的componentWillUpdate;
子组件的componentDidUpdate先触发, 然后触发父组件的componentDidUpdate;

当移除一个父组件时:
父组件的componentWillUnmount先触发, 然后触发子组件的componentWillUnmount;

可以发现, 在父组件render方法执行阶段触发的钩子函数父组件都是先于子组件的, 具体原因可以参考上面第3条中解释的父/子组件加载流程;
在render方法后才触发的钩子函数componentDidUpdate, 子组件是先于父组件的, 这是因为子组件的render方法会先行返回, 最终父组件的render方法才会返回; 

对于componentDidMount方法而言, 父组件和子组件其实是一起被当成一个整体添加到html页面中的(这样的dom操作是效率最高的), 其实父组件会将所有子组件的componentDidMount方法按顺序(新增组件在render方法执行完毕后其指定的componentDidMount方法才会被注册, 所以是从内层到外层这样的顺序)保存在一个数组中, 当最后父组件render方法执行完毕会将自己的componentDidMount方法也放入这个数组(如果父组件没有指定componentDidMount方法也没有关系), 并且会在当前组件上绑定一个任务(这个任务会在虚拟树对比结束后, 在制定对HTML进行dom操作时被取出并关联到这个组件的dom操作中): 当整个父组件以及其中的内容被一起mount到html页面之后将数组中保存的所有componentDidMount方法按顺序遍历执行, 所以也就是说如果某个子组件或者父组件本身没有指定componentDidMount方法都不会影响最终所有被注册的componentDidMount方法的正确执行;

对于componentWillUnmount方法而言, 父组件和子组件是一起被当成一个整体从HTML页面中移除的(这样的dom操作是效率最高的), 而对于一个将要被移除的组件而言, 它和其子组件的render方法仍旧会被执行(主要是为其中需要被移除的组件注册componentWillUnmount方法), 不过这里会按从外层到内层的顺序注册componentWillUnmount方法, 与上面介绍的componentDidMount方法的机制类似, 父组件同样会将自己以及所有子组件注册的componentWillUnmount方法放入一个数组(但是顺序和之前是相反的), 然后在当前组件上绑定一个任务: 当整个父组件以及其中的内容将要从html页面中被一起移除之前将数组中保存的所有componentWillUnmount方法按顺序遍历执行, 同样就算是父组件本身没有注册componentWillUnmount方法也不会影响最终所有被注册的componentWillUnmount方法的正确执行;


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

![](./dev_memo_img/21.png)

![](./dev_memo_img/22.png)

安装完毕后再次打开chrome开发者工具, 就会发现新增了debug react项目代码的选项:

![](./dev_memo_img/23.png)

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

![](./dev_memo_img/24.png)

然后使用Button组件:
……
<Button type=‘primary’ onClick={this.myUpdate}>change mystate</Button>
……
<Button type='ghost' onClick={this.addSoldier}>add new soldier</Button>
……

antd-mobile的Button组件的具体使用方式以及API可以参考:
https://mobile.ant.design/components/button/


在页面中显示:

![](./dev_memo_img/25.png)

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

![](./dev_memo_img/26.png)

![](./dev_memo_img/27.png)

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

![](./dev_memo_img/28.png)

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

![](./dev_memo_img/29.png)

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

![](./dev_memo_img/30.png)

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

![](./dev_memo_img/31.png)


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

![](./dev_memo_img/32.png)

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

![](./dev_memo_img/33.png)

可以发现, 当点击了指向’/two’或者’/three’的Link时同样显示了’/’根目录Route的内容, 这是因为’/’默认并非是完全匹配的, 也就是说’/two’或者’/three’也同时匹配了’/’, 属于正则匹配(但是这样的正则规则只适用于’/‘, 如果是类似: ‘/two’和’/two2’这样的路径是不会同时匹配的); 解决办法是在<Route path='/' component={App}></Route>中添加一个exact属性:
<Route path='/' exact component={App}></Route>

页面显示为:

![](./dev_memo_img/34.png)

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

![](./dev_memo_img/35.png)

可以发现, 在Route使用类似: <Route path='/:location' component={Test}></Route> 这种方式定义path后, Test组件的props属性的match属性中将会与不在path中使用’/:’的Route定义有一些不同, 前者的params属性中的值是一个以path中’/:’后指定的字符串为key, 实际匹配路由地址中字符串为value的对象, 而后者是一个空对象;

下图是直接访问’/test’, 并且匹配到了path=‘/test’的Route的情况:

![](./dev_memo_img/36.png)

那么根据上面显示的传入组件props属性中的这些内容可以发现, 在组件中使用this.props.match.params.location就可以获取实际路由地址中匹配Route组件中path属性’/:’后的字符串了;
还可以发现, this.props.history中的location属性与this.props.location属性相同;

需要注意的是, 使用组件中this.props.history.push/replace方法可以触发react-router的路由系统, 但是如果直接使用类似: window.history.pushState({},null,'/two'); 这样的方式只会更改浏览器地址栏地址, 而不会触发react-router的路由系统;


重要补充:
1.当页面加载后通过react-router路由跳转, Router组件会监听路径的变化, 然后被更新(props.history.location.pathname中更新了当前路径信息), 此时, 其下设置的Route组件都处于Router组件的this.props.children中, Router组件更新时会找到它们(参考下图), 然后根据它们的path属性来匹配当前路径, 如果匹配, 就调用这个Route组件的setState方法将路径信息加入它的state.match.url中(不匹配的Route组件的this.state.match属性为null) , Router组件还同时会将路径信息传入所有Route组件(无论其path是否匹配当前路径)的context.router中(参考下图);  然后这个Route组件会根据this.state.match在其render方法中进行判断是否需要加载其component属性对应的子组件, 也就是说, 符合路由匹配的Route组件的component属性对应的组件会被当成Route组件的子组件加载(如果是首次加载会触发componentWillMount和componentDidMount方法), 并将history, location, match三个属性做为其props属性传入(参考下图); 不符合的Route组件的component属性对应的组件会被移除(并会触发其componentWillUnmount方法); 

Router组件的属性构造:

![](./dev_memo_img/37.png)

Route组件的props属性:

![](./dev_memo_img/38.png)

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

![](./dev_memo_img/39.png)

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

![](./dev_memo_img/40.png)


需要注意的是, 如果路由使用了<Switch>组件, 那么最后渲染的页面中只包含被匹配的那个Route组件的内容, 如果不使用<Switch>组件, 那么所有Route组件都会被渲染到页面中, 但是只有最终匹配路由的Route组件其中的component会被渲染;

参考下图中页面结构:

![](./dev_memo_img/41.png)

![](./dev_memo_img/42.png)

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

![](./dev_memo_img/43.png)

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

![](./dev_memo_img/44.png)

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

![](./dev_memo_img/45.png)

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

![](./dev_memo_img/46.png)

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

![](./dev_memo_img/47.png)

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

![](./dev_memo_img/48.png)

<5.2-5.3>前后端联调;

(1)axios;
Axios 是一个基于 promise 的 HTTP 库, 可以用在浏览器和 node.js 中; 

![](./dev_memo_img/49.png)

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

![](./dev_memo_img/50.png)

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

![](./dev_memo_img/51.png)

server/server.js:
……

![](./dev_memo_img/52.png)

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

![](./dev_memo_img/53.png)

从控制台显示内容的顺序可以发现, 当react运行了this.setState()后, 当组件的componentWillUpdate()方法开始执行时, 此时this.state还未被更新, 新的state将作为其第二个参数传入, 当componentWillUpdate方法执行完成后才会将this.state更新, 然后执行render方法, 最后继续执行componentDidMount方法中之后的内容;

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

其实上面这个方法是存在错误的, 因为当target对象的属性少于origin对象的属性, target对象拥有的所有属性都同时被origin对象拥有, 并且这两个对象中的这些属性都相等, 那么这个方法会返回true, 其实这两个对象属性个数本身就是不同的, 如:
let a = {x:1, y:2}
let b = {x:1, y:2, z:3}
compare(b,a) //true

对上面的方法进行改造:

function compare(origin, target) {
    if (typeof target === 'object' && typeof origin === 'object')    {
  if(Object.keys(target).length !== Object.keys(origin).length) 
    return false
        for (let key of Object.keys(target))
            if (!compare(origin[key], target[key])) return false
        return true
    }else{
  return origin === target
    }
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

![](./dev_memo_img/54.png)

当前数据库中数据为:

![](./dev_memo_img/55.png)

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

![](./dev_memo_img/56.png)


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

![](./dev_memo_img/57.png)


(3)项目文件目录结构以及登录/注册页面基本页面构建;

![](./dev_memo_img/58.png)

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

![](./dev_memo_img/59.png)

点击注册按钮后跳转到’/register’;

![](./dev_memo_img/60.png)

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

//连接mongo, 并且使用esna这个数据库(如果不存在会新建);
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

![](./dev_memo_img/61.png)

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


![](./dev_memo_img/62.png)

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

![](./dev_memo_img/63.png)

![](./dev_memo_img/64.png)


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

![](./dev_memo_img/65.png)

![](./dev_memo_img/66.png)

(8)数据库模型建立;

修改model.js;

const mongoose = require('mongoose')

//连接mongo, 并且使用esna这个数据库(如果不存在会新建);
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

![](./dev_memo_img/67.png)


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

![](./dev_memo_img/68.png)


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

![](./dev_memo_img/69.png)

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

![](./dev_memo_img/70.png)

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
  User.findOne({user, pwd:md5Pwd(pwd)},{pwd:0,__v:0},function(err,doc){
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

![](./dev_memo_img/71.png)

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


上例中需要注意的是, @withRouter必须写在@connect的前面, 因为修饰器是从后向前返回值的, 也就是说需要先通过connect方法将AuthRoute组件进行封装, 封装后的AuthRoute再被传入withRouter来添加路由属性; 

还需要注意的是, 在user.redux.js中将initState对象中的pwd属性删除了, 因为pwd属性不需要被放在redux的state中在组件之间共享, 它仅需要保存在注册和登录组件自身的state中以便发送到后端进行验证等操作; 

最后需要注意一点, 当页面加载后通过react-router路由跳转, Router组件会监听路径的变化, 然后被更新(props.history.location.pathname中更新了当前路径信息), 此时, 其下设置的Route组件都处于Router组件的this.props.children中, Router组件更新时会找到它们(参考下图), 然后根据它们的path属性来匹配当前路径, 如果匹配, 就调用这个Route组件的setState方法将路径信息加入它的state.match.url中(不匹配的Route组件的this.state.match属性为null) , Router组件还同时会将路径信息传入所有Route组件(无论其path是否匹配当前路径)的context.router中(参考下图);  然后这个Route组件会根据this.state.match在其render方法中进行判断是否需要加载其component属性对应的子组件, 也就是说, 符合路由匹配的Route组件的component属性对应的组件会被当成Route组件的子组件加载(如果是首次加载会触发componentWillMount和componentDidMount方法), 并将history, location, match三个属性做为其props属性传入(参考下图); 不符合的Route组件的component属性对应的组件会被移除(并会触发其componentWillUnmount方法), 上例中的AuthRoute组件就属于每次路由改变都匹配的情况, 所以react-route路由跳转并不会再次触发向服务器检查用户浏览器cookie的逻辑, 只会重新update一遍AuthRoute组件, 除非页面刷新;

Router组件的属性构造:

![](./dev_memo_img/72.png)

Route组件中的context结构:

![](./dev_memo_img/73.png)

Route组件component属性对应子组件的props属性:

![](./dev_memo_img/74.png)

相关复习: 
1.componentDidMount()和react的其它钩子函数不同, 它是在虚拟树对比完成并将一个原本在页面中不存在的组件添加到页面之后才会触发(就算这个组件render方法返回null也会触发), 而其他的钩子函数都是在虚拟树更新和对比阶段触发的; 
2.componentDidUpdate在组件render()方法执行完之后, 虚拟树开始对比之前触发, 就算component的render方法返回null也会触发;
3.react是如何判断一个组件是否是第一次加载;
由于一个组件第一次加载时会触发其componentWillMount和componentDidMount方法, 而如果做为其它组件的子组件在父组件更新的情况下也同时被更新时就会触发componentWillUpdate/componentDidUpdate等一系列方法, 那么react是如何判断一个组件是否是第一次被加载的呢?
举个例子, 如果一个父组件的render方法中根据某个判断条件来决定是否加载一个子组件, 那么每次父组件更新时都有可能添加/移除或者更新这个子组件, 那么react是如何判断的呢?
当一个组件第一次被加载时会执行其constructor方法并新创建一个组件的实例, 之后对组件的操作其实都是对这个实例的操作, 也就是说如果是initial render(react发现这个组件还未实例化), 那么这个组件接下来会触发componentWillMount/render/componentDidMount这一系列方法, 不管是否是因为父组件的render而触发的加载, 而如果react发现一个component已经存在实例对象了, 那么就会执行update相关的一系列方法; 对一个组件的移除会触发其componentWillUnmont方法(并不会触发update相关的钩子函数), 同时react会删除已经创建的实例对象; 
但是react是如何判断一个组件是否已经实例化了呢?
其实在一个组件的render方法执行后还存在一个对比的过程(还未进行react虚拟dom树与实际树的对比), 假设一个父组件的render方法中包含了若干个子组件(多个子组件可能属于同一个组件类), 无论这些子组件是否最终会被加载(可能由于一些判断条件导致某些情况下只有一些子组件会加载, 一些会被忽略), 都会被react按顺序添加在全局范围内不会重复react id以便区分, 之后在父组件的一次render执行后哪些id的子组件加载了, 哪些id的子组件没有加载是有记录的(做为属性保存在父组件中), 接着render生成的这个父组件的虚拟树片段会和当前react中保存的虚拟树中对应的片段进行对比(由于父组件本身也存在独一无二的react id, 所以可以很方便地找到进行对比), 根据父组件对子组件的id记录(react中保存的虚拟树中的组件也有对子组件id的记录)就能很清楚的对比出哪些子组件已经创建过实例了只需要update, 哪些子组件需要创建新的实例, 哪些子组件需要被移除, 与此同时子组件就会根据判断下来的不同情况开始走自己的流程:
<1>如果是被判断为新加载的子组件, 那么就会走componentWillMount/render/componentDidMount的步骤, 很显然这种情况下子组件其下的所有子孙组件也会依次走相同的步骤;
<2>如果是被判断为update的子组件, 那么就会走componentWillUpdate/render/componentDidUpdate的步骤, 也就是说, 这种情况下它本身会做为父组件去render自己的虚拟树片段, 记录其子组件id…
<3>如果是被判断为需要移除的子组件, 那么就会走componentWillUnmont的步骤, 这种情况下子组件其下的所有子孙组件也会依次走相同的步骤;
某个组件的componentWillUnmount方法就是在其父组件render生成的虚拟树片段与react虚拟树对应片段对比后发现需要被移除时触发的;

当父组件其下的所有子孙组件的render相关流程都执行完毕后, 最初的父组件的render方法才算运行结束, 其生成的完整虚拟树片段会更新到react保存的虚拟树对应的片段中, 也就完成了react虚拟树的更新, 之后就可以进行虚拟dom树与实际树的对比了;
另外, 如果是setState/forceUpdate方法触发的组件更新一定不是首次加载, 因为这两个方法需要实例对象this来调用;
4.关于父组件和子组件钩子函数的执行顺序;

当装载一个新的父组件时:
父组件的componentWillMount先触发, 然后触发子组件的componentWillMount;
子组件的componentDidMount先触发, 然后触发父组件的componentDidMount;

当update一个父组件时:
父组件的componentWillUpdate先触发, 然后触发子组件的componentWillUpdate;
子组件的componentDidUpdate先触发, 然后触发父组件的componentDidUpdate;

当移除一个父组件时:
父组件的componentWillUnmount先触发, 然后触发子组件的componentWillUnmount;

可以发现, 在父组件render方法执行阶段触发的钩子函数父组件都是先于子组件的, 具体原因可以参考上面第3条中解释的父/子组件加载流程;
在render方法后才触发的钩子函数componentDidUpdate, 子组件是先于父组件的, 这是因为子组件的render方法会先行返回, 最终父组件的render方法才会返回; 

对于componentDidMount方法而言, 父组件和子组件其实是一起被当成一个整体添加到html页面中的(这样的dom操作是效率最高的), 其实父组件会将所有子组件的componentDidMount方法按顺序(新增组件在render方法执行完毕后其指定的componentDidMount方法才会被注册, 所以是从内层到外层这样的顺序)保存在一个数组中, 当最后父组件render方法执行完毕会将自己的componentDidMount方法也放入这个数组(如果父组件没有指定componentDidMount方法也没有关系), 并且会在当前组件上绑定一个任务(这个任务会在虚拟树对比结束后, 在制定对HTML进行dom操作时被取出并关联到这个组件的dom操作中): 当整个父组件以及其中的内容被一起mount到html页面之后将数组中保存的所有componentDidMount方法按顺序遍历执行, 所以也就是说如果某个子组件或者父组件本身没有指定componentDidMount方法都不会影响最终所有被注册的componentDidMount方法的正确执行;

对于componentWillUnmount方法而言, 父组件和子组件是一起被当成一个整体从HTML页面中移除的(这样的dom操作是效率最高的), 而对于一个将要被移除的组件而言, 它和其子组件的render方法仍旧会被执行(主要是为其中需要被移除的组件注册componentWillUnmount方法), 不过这里会按从外层到内层的顺序注册componentWillUnmount方法, 与上面介绍的componentDidMount方法的机制类似, 父组件同样会将自己以及所有子组件注册的componentWillUnmount方法放入一个数组(但是顺序和之前是相反的), 然后在当前组件上绑定一个任务: 当整个父组件以及其中的内容将要从html页面中被一起移除之前将数组中保存的所有componentWillUnmount方法按顺序遍历执行, 同样就算是父组件本身没有注册componentWillUnmount方法也不会影响最终所有被注册的componentWillUnmount方法的正确执行;


![](./dev_memo_img/75.png)


上例在清除cookie缓存后访问’/login’页面后的cookie/redux的state:

![](./dev_memo_img/76.png)

![](./dev_memo_img/77.png)

然后输入正确的用户名/密码点击登录后的cookie/redux的state:

![](./dev_memo_img/78.png)

![](./dev_memo_img/79.png)


上例在清除cookie信息后访问’/register’页面后的cookie/redux的state:

![](./dev_memo_img/80.png)

![](./dev_memo_img/81.png)


然后输入有效的用户信息点击注册后的cookie/redux的state:

![](./dev_memo_img/82.png)

![](./dev_memo_img/83.png)

此时如果在’/bossinfo’页面中直接刷新页面, 页面不会跳转且cookie/redux的state信息与上两张图相同;



7.完善用户信息;

<7.1>Boss信息完善页面;

(1)bossinfo页面;

在src/container/bossinfo中新建bossinfo.js;

import React from 'react'
import {NavBar, InputItem, TextareaItem} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:''
    }
  }
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
  render(){
    return (
      <div>
        
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <AvatarSelector></AvatarSelector> 
        <InputItem onChange={(v)=>this.onChange('title',v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('company',v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('money',v)}>
          职位薪资
        </InputItem>
        <TextareaItem 
          onChange={(v)=>this.onChange('desc',v)}
          rows={3}
          autoHeight
          title='职位要求'
        >
        </TextareaItem>
      </div>
    )
  }

}

export default BossInfo

补充:
TextareaItem组件中的rows属性用来指定初始的显示行数, 这里使用rows=‘3’和rows={3}的效果是相同的; autoHeight属性用来指定组件是否能够自适应高度(如果不指定就会以滚动条的方式展示超出范围的内容); 与InputItem组件不同的是, 这里的title需要以title属性来指定, 而不是直接写在组件元素的内容部分;

antd-mobile相关组件可以参考(这里的NavBar组件只用作BossInfo页面的header使用):
https://mobile.ant.design/components/nav-bar/ (NavBar)
https://mobile.ant.design/components/textarea-item/ (TextareaItem)


![](./dev_memo_img/84.png)

(2)AvatarSelector组件(用户头像组件);

在src/component/avatar-selector中新建avatar-selector.js;
在src/component下新建img文件夹, 并放入几张头像图片;

avatar-selector.js;

import React from 'react'
import {Grid, List} from 'antd-mobile'

class AvatarSelector extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    const avatarList = 'fox,rabbit,fox1,fox2,fox3,fox4,rabbit1,rabbit2,rabbit3,rabbit4'.split(',').map(v=>({icon:require(`../img/${v}.png`), text:v}))  //src/component/img文件夹中所有头像图片的前缀名组成的字符串数组;
    const gridHeader = this.state.icon ? 
              (<div>
                <span style={{'vertical-align': 'middle'}}>已选择头像:</span>
                <img style={{'vertical-align': 'middle', 'margin-left':10,width:30}} src={this.state.icon}/>
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
              }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector

上例中:
1.Grid的onClick事件回调函数中传入的参数ele的结构与组件data属性指定的数组中的元素相同: {icon:require(`../img/${v}.png`), text:v}; 
2.很显然antd-mobile的List组件的renderHeader属性允许函数返回一个jsx语法的元素对象;
3.给jsx中元素的style属性设置值时需要注意将vertical-align, margin-left这样的属性名改为verticalAlign, marginLeft, 不然的话css功能可能可以实现, 但是会报错: Unsupported style property vertical-align. Did you mean verticalAlign?
4.icon:require(`../img/${v}.png`) 这样的用法其实就是webpack对图片引入的支持, 会返回一个图片的有效请求路径, 可以直接放在<img>元素的src属性中使用,如:

例1:
……
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
……

例2:
var img1 = document.createElement("img");
img1.src = require("./small.png");
document.body.appendChild(img1);

antd-mobile的Grid组件可以参考:
https://mobile.ant.design/components/grid/


修改bossinfo.js;
……
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
……
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={(imgname)=>{
            this.setState({
              avatar: imgname
            })
          }}
        ></AvatarSelector>
        <Button type='primary'>提交</Button>
……

上例通过父组件传递一个处理用户选中头像的函数给一个公用的子组件, 子组件通过自己元素的onClick方法将用户点击头像的信息传递给这个函数, 相当于将父组件的方法绑定在了子组件的点击事件回调函数中;

在BOSS信息完善页面输入所有信息:

![](./dev_memo_img/85.png)

(3)BOSS信息页面的前后端交互;

修改bossinfo.js;
……
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
@connect(
  state=>state.user,
  {update}
)
class BossInfo extends React.Component{
……
        <Button 
          onClick={()=>{
            this.props.update(this.state)
          }}
          type='primary'>提交</Button>
……


修改user.redux.js;

由于形式和作用相同, 删除LOGIN_SUCCESS和REGISTER_SUCCESS这两个reducer的选择条件相关内容, 统一使用AUTH_SUCCESS来代替;
并删除iniState中的isAuth属性;

import axios from 'axios'
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState={
  redirectTo:'',
  msg:'',
  user:'',
  type:''
}

//reducer
export function user(state=initState,action){
  switch (action.type){
    case AUTH_SUCCESS: 
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), ...action.payload }
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG: 
      return {...state, msg:action.msg}
    default:
      return state
  }
}
function authSuccess(data){
  return {type:AUTH_SUCCESS, payload:data}
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
            dispatch(authSuccess(res.data.data))
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
            dispatch(authSuccess(res.data.data))
          }else{
            dispatch(errorMsg(res.data.msg))
          }
      })
  }
}

export function update(data){

  //这里暂时省略了对用户填写信息内容格式等的验证步骤;

  return dispatch=>{
    axios.post('/user/update',data)
      .then(res=>{
          if(res.status==200&&res.data.code===0){
            dispatch(authSuccess(res.data.data))
          }else{
            dispatch(errorMsg(res.data.msg))
          }
      })
  }
}


修改server/user.js;
……
Router.post('/update',function(req,res){
  const userid = req.cookies.userid
  if(!userid){
    return res.json({code:1, msg:'请先登录'})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, _filter, function(err, doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    }, body)
    return res.json({code:0, data})
  })
})
……

上例中的findByIdAndUpdate方法是mongoose提供的一个更新一条记录(或者说文档)的API, 第一个参数是需要查找的记录的_id, 第二个参数是需要被更新的项组成的对象;
上例使用了:
    Object.assign({},{
      user:doc.user,
      type:doc.type
    }, body)

这样的方式来创建一个包含所有用户信息的对象, 之所以没有使用’…’扩展运算符, 是因为目前在我们自己创建的专门用来接收API请求的server(不是webpack-dev-server)中, 也就是我们自己的nodejs环境还未配置babel等解析最新ES6语法的插件;

还需要注意的是, 目前update这个action creator并没有要求用户一定要填写某些内容, 也就是说用户可以不完善任何信息直接完成注册, 但是下次登录时如果检测到用户头像未指定, 那就会直接跳转到对应的完善信息页面;


修改bossinfo.js;
……
import {Redirect} from 'react-router-dom'
……
{this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
<NavBar mode="dark">BOSS完善信息页面</NavBar>
{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
……

在登录状态下成功提交完善信息后跳转到’/boss’页面:

![](./dev_memo_img/86.png)


如果在已经成功登录’/bossinfo’页面的情况下, cookie失效, 那么点击提交按钮后:

![](./dev_memo_img/87.png)

但是如果一个已经登录的用户在还未选择过avatar的情况下在’/bossinfo’页面直接点击提交就会报错:
Warning: You tried to redirect to the same route you're currently on: "/bossinfo"

这是由于完善页面的请求成功后会向reducer发出一个type为AUTH_SUCCESS的action, 并将redux的state中的redirectTo属性更新为’/bossinfo’, 于是当前页面(也就是’/bossinfo’)页面被更新, 又因为bossinfo.js中存在: {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null} 这样的逻辑, 所以会造成跳转的死循环;
相同的问题也会发生在用户在成功提交了login/register页面信息后跳转到’/bossinfo’页面时;
总之就是在redux的state的redirectTo不为空, 且avatar为空的情况下来到’/bossinfo’页面就会发生跳转死循环;
原因就在util.js:
……
  let url = (type==='boss')?'/boss':'/genius'
  if(!avatar){
    url += 'info'
  }
  return url
……

解决办法是在bossinfo.js中修改:
……
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null}
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
……

这样就不会出现上述问题了;


(4)牛人信息页面;

修改index.js;
……
import GeniusInfo from './container/geniusinfo/geniusinfo'
……
<Route path='/geniusinfo’ component={GeniusInfo}></Route>
……


在src/container/geniusinfo中新建geniusinfo.js;

import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)
class GeniusInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title:'',
      desc:''
    }
  }
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo

    return (
      <div>
        {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
        <AvatarSelector
          selectAvatar={(imgname)=>{
            this.setState({
              avatar: imgname
            })
          }}
        ></AvatarSelector> 
        <InputItem onChange={(v)=>this.onChange('title',v)}>
          求职岗位
        </InputItem>
        <TextareaItem 
          onChange={(v)=>this.onChange('desc',v)}
          rows={3}
          autoHeight
          title='个人简介'
        >
        </TextareaItem>
        <Button 
          onClick={()=>{
            this.props.update(this.state)
          }}
          type='primary'>提交</Button>
      </div>
    )
  }

}

export default GeniusInfo

牛人完善信息页面:

![](./dev_memo_img/88.png)


在牛人完善信息页面提交信息后:

![](./dev_memo_img/89.png)

补充:
1.之前在server/user.js中使用了const _filter = {pwd:0,__v:0}来过滤从数据库查到的user信息然后才返回给前端, 所以前端redux的state.user中不会保存这两类数据, 其实还可以使用更加便捷的方式来达到这个目的:

user.redux.js;
……
function authSuccess(obj){
  const {pwd, ...data} = obj
  return {type:AUTH_SUCCESS, payload:data}
}
……

2.prop-types组件(在开发时可以第一时间发现一些类型传递的错误);

从react 16版本开始, 原本内置在react中的React.PropTypes, 如:
……
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}
……

已经被抽离出来形成一个单独的库了, 所以需要手动安装并引入;

$ npm install prop-types --save

avatar-selector.js;
……
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state = {}
  }
……

参考:
https://reactjs.org/docs/typechecking-with-proptypes.html






Redux+React Router+Node.js全栈开发笔记 (二);


……



8.牛人列表/BOSS列表;

(1)应用骨架;

在component/dashboard中新建dashboard.js;

import React from 'react'

class Dashboard extends from React.Component{

  render(){
    return (
      <h2>header</h2>
      <h2>footer</h2>
    )
  }
}

export default Dashboard


修改index.js;
……
import Dashboard from './component/dashboard/dashboard' 
……
          <Route path='/register' component={Register}></Route>
          <Route component='Dashboard'></Route>
        </Switch>
……


修改index.css;
……
.am-tab-bar{
  position: fixed;
  bottom:0;
  width:100%;
}

.am-navbar{
  position: fixed;
  top:0;
  width:100%;
}

.page-content{
  padding:45px 5px;
}

用来固定页面header导航栏, 和底部导航栏;


(2)导航和跳转;

修改component/dashboard/dashboard.js;

import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlinkbar/navlinkbar'

@connect(
  state=>state
)
class Dashboard extends React.Component{
  
  render(){
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        //component: Boss,
        hide: user.type == 'genius'
      },
      {
        path:'/genius',
        text:'boss',
        icon:'job',
        title:'BOSS列表',
        //component: Genius,
        hide: user.type == 'boss'
      },
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        //component: Msg,
      },
      {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        //component: User,
      }
    ]

    return (
      <div>
        <NavBar mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard

上例中, 将’/boss’, ‘/genius’, ‘/msg’, ’/me’这四个页面的header导航栏和底部导航栏的架构搭建了一下, 通过navList数组指定各个页面的数据方便遍历检索; 如果是boss的type登录的用户将默认可以看到牛人列表, 如果是genius的type登录的用户默认可以看到BOSS列表, 所以如果用户身份是boss, 那么在’/boss’页面不会显示跳转到’/genius’页面的图标, 如果用户身份是genius, 那么在’/genius’页面中不会显示跳转到’/boss’页面的图标, 其它两个图标是共享的; 而header导航栏中的文字和页面内容完全是根据当前路径对应path的navList数组元素的title属性和component属性对应的组件生成的, 也就是说, 如果不做其它限制的话, 身份为boss的用户也可以来到’/genius’页面查看BOSS列表的内容, 但是底部导航只会显示跳转到牛人列表的图标, 反之亦然; 


在component/navlinkbar中新建navlinkbar.js;

import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component{
  static propTypes = {
    data:PropTypes.array.isRequired
  }
  render(){
    const navList = this.props.data.filter(v=>!v.hide)
    const {pathname} = this.props.location
    return (
      <TabBar>
        {navList.map(v=>(
          <TabBar.Item 
            key={v.path}
            title={v.text}
            icon={{uri:require(`./img/${v.icon}.png`)}}
            selectedIcon={{uri:require(`./img/${v.icon}_fill.png`)}}
            selected = {pathname === v.path}
            onPress={()=>{
              this.props.history.push(v.path)
            }}
          ></TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar

可以发现, NavLinkBar这个组件简单地对antd-mobile的TabBar组件做了一层封装, 目的是接收从Dashboard组件传递进来的props: navList数组, 然后根据其中元素的hide属性来决定将忽略哪个图标, 然后通过TabBar.Item子组件来遍历过滤后的数组从而生成三个图标, 页面默认被选中的图标就是当前访问地址所对应的图标, 每个图标点击后都会通过Route传入的history.push方法跳转到图标所对应的页面, 这之所以使用原生的react-router的history.push方法是因为目前antd-mobile对<Link>组件的支持还不是很好;
当然, 另一个单独建立这个NavLinkBar组件的原因是: 它并非某个Route组件的component, 所以为了获取当前页面的location.pathname和history.push方法, 需要使用withRouter修饰器来封装一下, 封装后组件效果如下图所示:

![](./dev_memo_img/90.png)

![](./dev_memo_img/91.png)

可以发现, 被withRouter修饰器封装的组件会被withRouter(相当于Router)和Route组件包裹, 并且由于距离它最近的父Route组件属于非exact匹配(且没有指定path属性), 所以它的match.url和match.path为’/’, 不能以此来获取当前页面的路径; 

需要注意的是, 上例中的TabBar.Item组件的icon属性用来指定导航栏图标, 它的值可以是一个对象, 或者是一个jsx语法的元素对象;

![](./dev_memo_img/92.png)

关于antd-mobile中TabBar的用法可以参考:
https://mobile.ant.design/components/tab-bar/ 


在component/navlinkbar中创建一个img文件夹, 然后将底部导航栏用到的icon图片放入(icon图片名与dashboard.js中navList的icon属性一一对应);

![](./dev_memo_img/93.png)

补充:
关于各种格式和类型的小图标下载, 可以访问:
http://www.iconfont.cn/


上例在页面中的访问效果:

![](./dev_memo_img/94.png)

![](./dev_memo_img/95.png)

![](./dev_memo_img/96.png)

![](./dev_memo_img/97.png)


(3)牛人列表;

修改dashboard.js;
…..
import {Switch, Route} from 'react-router-dom'
……
const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        component: Boss,
        hide: user.type == 'genius'
      },
……
    return (
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}/>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
……

上例中, dashboard页面的主体部分使用路由来选择性加载boss/genius组件;


修改index.css;
……
.fixed-header.am-navbar{
  position: fixed;
  top:0;
  width:100%;
……


在src/component/boss中新建boss.js;

import React from 'react'
import axios from 'axios'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'

class Boss extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    axios.get('/user/list?type=genius').then(res=>{
      if(res.data.code==0){
        this.setState({data:res.data.data})
      }
    })
  }
  render(){
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.state.data.map(v=>(
          v.avatar ? 
          <Card key={v._id}>
            <Card.Header
              title = {v.user}
              thumb = {require(`../img/${v.avatar}.png`)}
              thumbStyle = {{width:40}}
              extra = {<span>{v.title}</span>}
            >
            </Card.Header>
            <Card.Body>
              {v.desc.split('\n').map(v=>(
                <div key={v+Math.random()}>{v}</div>
              ))}
            </Card.Body>
          </Card> : null
        ))}
      </WingBlank>
    )
  }
}

export default Boss

上例中通过componentDidMount钩子函数向后端请求所有type为genius的用户信息以便渲染牛人列表;
可以发现, 没有头像信息的用户将不会被显示在列表中;

关于antd-mobile中Card组件相关内容参考:
https://mobile.ant.design/components/card/


修改server/user.js;
……
Router.get('/list',function(req,res){
  let {type} = req.query
  if(!type) type = {}
    else type = {type}
  User.find(type,function(err,doc){
    return res.json({code:0, data:doc})
  })
})
……

上例中当访问’/user/list:type=boss’时会返回所有boss身份的用户信息, 访问’/user/list?genius’时会返回所有genius身份的用户信息, 如果访问’/user/list’, 那么req.query.type = undefined, 改造后会获取所有用户的信息;

![](./dev_memo_img/98.png)

(4)使用redux管理牛人列表;

在src/redux中新建chatuser.redux.js;

这里的思路是将用户列表同时视为一个聊天对象的列表(相关数据需要在不同组件之间共享), 也就是说, 除了显示用户的基本信息, 可以随时选择列表中的牛人/boss进行聊天;


chatuser.redux.js;

import axios from 'axios'

const USER_LIST = 'USER_LIST'

const initState = {
  userlist : []
}

//reducer
export function chatuser(state = initState, action){
  switch(action.type){
    case USER_LIST:
      return {...state, userlist:action.payload}
    default:
      return state
  }
}

//action creator
function userList(data){
  return {type:USER_LIST, payload:data}
}

export function getUserList(type){
  return dispatch=>{
    axios.get('/user/list?type=' + type).then(res=>{
      if(res.data.code==0){
        dispatch(userList(
          res.data.data.map(v=>{
            const {pwd, __v, ...filteredUser} = v
            return filteredUser
          })
        ))
      }
    })
  }
}

上例创建了redux的state的一个新的属性: chatuser, 专门用于存储genius/boss用户列表数据; 
由于从后端’/user/list?type=genius’取得的用户数组中的用户数据携带pwd和__v这两个不需要储存在redux的state中的属性, 所以将res.data.data中数组元素的属性进行了过滤;


修改component/boss/boss.js;

import React from 'react'
import {connect} from 'react-redux'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux'

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Boss extends React.Component{
  componentDidMount(){
    this.props.getUserList('genius')
  }
  render(){
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v=>(
          v.avatar ? 
          <Card key={v._id}>
            <Card.Header
              title = {v.user}
              thumb = {require(`../img/${v.avatar}.png`)}
              thumbStyle = {{width:40}}
              extra = {<span>{v.title}</span>}
            >
            </Card.Header>
            <Card.Body>
              {v.desc.split('\n').map(v=>(
                <div key={v+Math.random()}>{v}</div>
              ))}
            </Card.Body>
          </Card> : null
        ))}
      </WingBlank>
    )
  }
}

export default Boss

上例中, Boss组件不再通过自身的state来存储用户列表信息, 而是通过redux来获取和共享; 


修改reducer.js;

import {combineReducers} from 'redux'
import {user} from './redux/user.redux'
import {chatuser} from './redux/chatuser.redux'

export default combineReducers({user, chatuser})

观察state.chatuser

![](./dev_memo_img/99.png)



9.个人中心;

(1)boss列表创建和用户列表组件抽离;

修改component/dashboard/dashboard.js;
……
import Genius from '../..component/genius/genius'
……
      {
        path:'/genius',
        text:'boss',
        icon:'job',
        title:'BOSS列表',
        component: Genius,
        hide: user.type == 'boss'
      },
……


在src/component/genius下新建genius.js;

import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Genius extends React.Component{
  componentDidMount(){
    this.props.getUserList('boss')
  }
  render(){
    return <UserCard userlist={this.props.userlist}/>
  }
}

export default Genius


在src/component/usercard下新建usercard.js;

import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'

class UserCard extends React.Component{
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  render(){
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v=>(
          v.avatar ? 
          <Card key={v._id}>
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

上例中将原本处于boss.js和genius.js组件render部分的列表显示抽离了出来单独构成一个usercard.js公共组件, 由Boss和Genius组件通过props属性传递从后端获取的genius/boss用户列表数组来渲染页面列表部分的内容, 需要注意的是, 由于boss身份用户相比genius身份用户多出了money和company这两条信息, 所以需要根据不同情况改变列表中card的结构;


修改boss.js;

import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
  state=>state.chatuser,
  {getUserList}
)
class Boss extends React.Component{
  componentDidMount(){
    this.props.getUserList('genius')
  }
  render(){
    return <UserCard userlist={this.props.userlist}/>
  }
}

export default Boss


![](./dev_memo_img/100.png)

![](./dev_memo_img/101.png)

(2)个人中心信息展示;

在src/component/user中新建user.js;

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

上例中, 在List.Item组件中设置multipleLine属性的作用是, 当List.Item中内容部分超过一行时可以换行显示, 如果不设置就会直接将超出一行部分使用’…’显示; 

关于antd-mobile中Result组件相关内容, 可以参考:
https://mobile.ant.design/components/result/


修改dashboard.js;
……
import User from '../..component/user/user'
……
      {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component: User,
      }
……

![](./dev_memo_img/102.png)

![](./dev_memo_img/103.png)


(3)用户注销功能;

安装browser-cookies;

npm install browser-cookies —save

![](./dev_memo_img/104.png)

browser-cookies的API, 可以参考:
https://github.com/voltace/browser-cookies


修改component/user/user.js;
……
import browserCookie from 'browser-cookies'
……
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout(){
    const alert = Modal.alert
            alert('注销', '是否继续退出?', [
              { text: 'Cancel' },
              { text: 'Ok', onPress: () => {
      browserCookie.erase('userid')
      window.location.href = window.location.href
              }},
            ])
  }
……
<List.Item onClick = {this.logout}>退出登录</List.Item>
……

上例中, 使用了antd-mobile的Modal组件在用户点击退出登录时弹框向用户确认是否继续退出; 在用户确认退出后, 会清除相关cookie并使用window.location.href = window.location.href这样的方式来强制刷新页面, 这种刷新页面的方式显然不符合单页面应用的规范, 之后会加以优化, 以不刷新页面的方式来完成, 基本是通过清空redux的state中相关内容并跳转到指定页面来实现的; 

这里还需要理解的一点是, 很明显在这个项目中是通过清除前端的指定cookie来达到登出效果的, 因为后端只是简单地检查前端是否传递过来携带用户id的cookie来判断用户是否已经处于登录状态了(这种方式显然不够安全, 一旦用户id泄露, 前端就可以伪造cookie来访问需要登录权限的资源), 而在之前的Nodejs+ejs和Backbone项目中后端都是通过session来管理用户登录状态的, 也就是说在用户成功登录后会为其在session中保存一个独有的sessionid, 并且将sessionid放入cookie传递给前端, 前端再次访问时就会将这个带有sessionid的cookie传递过来, 后端检查这个sessionid是否存在于其session中(会存在过期的情况), 如果有就认为用户已经登录, 如果没有就视为未登录; 所以在这种通过session保存用户登录状态的项目中, logout并不是简单将前端指定cookie删除, 而是需要通知后端将对应sessionid在session中删除, 之后就算前端访问时传递了带有sessionid的cookie, 由于此sessionid已经不存在于后端的session中了, 所以也视为未登录; 

补充:
1.使用document.cookie可以获取当前页面的所有cookie;

![](./dev_memo_img/105.png)


特别注意:
这里有一个坑, 需要非常小心, antd-mobile中的TabBar组件默认高度为100%, 这样就会遮挡dashboard组件中之前的所有其它元素, 导致被遮挡元素无法触发点击事件, 所以需要修改.am-tab-bar的css属性: z-index;

![](./dev_memo_img/106.png)

![](./dev_memo_img/107.png)


需要修改index.css;
……
.am-tab-bar{
  position: fixed;
  bottom:0;
  width:100%;
  z-index:-1;
}
……

关于antd-mobile中Modal的用法可以参考:
https://mobile.ant.design/components/modal/

![](./dev_memo_img/108.png)


(4)注销同时清空redux中数据, 并做页面跳转;

修改redux/user.redux.js;
……
const LOGOUT = 'LOGOUT'
……
  case LOGOUT:
      return {...initState, redirectTo:'/login'}
……
export function logoutSubmit(){
  return {type:LOGOUT}
}
……


修改user/user.js;
……
import {logoutSubmit} from '../../redux/user.redux'
……
  logout(){
    const alert = Modal.alert
            alert('注销', '是否继续退出?', [
              { text: 'Cancel' },
              { text: 'Ok', onPress: () => {
        browserCookie.erase('userid')
        this.props.logoutSubmit()
              }},
            ])
  }
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
          <List.Item onClick = {this.logout}>退出登录</List.Item>
        </List>
      </div>
    ):<div>{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}</div>
  }
……

上例中需要注意的是, 在render方法中的三目运算符的’:’后的返回值不能直接设置为:
{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}, 会报错:

![](./dev_memo_img/109.png)

这是由于如果直接设置为:{…}相当于最后在render方法中返回了一个对象: return {…}, 所以需要使用<div></div>包裹起来, 返回一个react元素对象;
当然, 也可以直接设置为: this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null

参考:
https://stackoverflow.com/questions/44849206/react-js-syntax-error-this-is-a-reserved-word-in-render-function


登出后跳转到’/login’页面, 并且redux中的相关内容被清空;

![](./dev_memo_img/110.png)

但是此时在login页面会报错: 
Warning: You tried to redirect to the same route you're currently on: "/login"

这是由于login.js中存在:
{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}

需要优化为:
{this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo} />:null}



(5)使用高阶组件优化登录, 注册等页面的输入功能;

之前在login.js和register.js中存在:
  handleChange(key,val){
    this.setState({
      [key]:val 
    })
  }

这样的方法;

在bossinfo.js和geniusinfo.js中存在:
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
这样类似的方法;

那么怎样才能减少这样重复冗余的方法使用, 将这一功能抽象出来呢(有些类似JAVA中类实现某个抽象的接口)?


在Babel中转换一个React组件, 可以发现其实组件就是通过定义一个函数(或者说一个类)来实现的:

![](./dev_memo_img/111.png)


参考:
https://babeljs.io 


也就是说所有的React组件在本质上就是一个函数, 而高阶组件的基础就是函数式编程, 这里来实现两个简单的高阶组件:

<1>属性代理功能的高阶组(高阶组件还有一种功能是反向继承);
class Hello extends React.Component{
  render(){
    return <h2>hello</h2>
  }
}

function WrapperHello(comp){
  class WrapComp extends React.Component{
    render(){
      return (<div>
        <p>这是HOC(Higher-order component)高阶组件的特有元素</p>
        <Comp {…this.props}></Comp>
      </div>)
    }
  }
  return WrapComp
}

Hello = WrapperHello(Hello)

上例中, 通过WrapperHello这个高阶组件, 就可以获取一个封装后的具有属性代理功能的Hello组件;
类似: <Comp {…this.props}></Comp> 这样传递属性的方式又称为属性穿透;

react-redux的connect就属于高阶组件的使用, 上例中的Hello = WrapperHello(Hello)完全可以改为通过:

@WrapperHello
class Hello extends React.Component{
  render(){
    return <h2>hello</h2>
  }
}

这样的方式来封装Hello组件;


<2>反向继承功能的高阶组件;
class Hello extends React.Component{
  componentDidMount(){
      console.log('组件的生命周期')
    }
  render(){
    return <h2>hello</h2>
  }
}

function WrapperHello(Comp){
  class WrapComp extends Comp{
    componentDidMount(){
      console.log(‘高阶组件更新的生命周期’)
    }
  }
  return WrapComp
}
Hello = WrapperHello(Hello)

上例中, 加载封装后的Hello组件后在控制台显示:
高阶组件更新的生命周期


在src/component/hoc-form中新建一个hoc-form.js;

import React from 'react'

export default function hocForm(Comp){
  return class WrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key,val){
      this.setState({
        [key]:val 
      })
    }
    render(){
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }

  }
}


修改login.js;

import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import hocForm from '../../component/hoc-form/hoc-form'

@connect(
  state=>state.user,
  {login}
)
@hocForm
class Login extends React.Component{
  constructor(props){
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register(){
    this.props.history.push('/register')
  }
  handleLogin(){
    this.props.login(this.props.state)
  }
  render(){
    return (
      <div>
        {this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo} />:null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
            <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
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

上例中, 在Login组件上使用了hocForm高阶组件进行封装, 相应地, 在Login组件中需要改为在props中获取state和handleChange方法; 


修改register.js;

import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import hocForm from '../../component/hoc-form/hoc-form'

@connect(
  state=>state.user,
  {register}
)
@hocForm
class Register extends React.Component{
  constructor(props){
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount(){
    this.props.handleChange('type','genius')
  }
  handleRegister(){
    this.props.register(this.props.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        <Logo></Logo>
        <List>
          {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
          <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem type='password' 
          onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem type='password' 
          onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.props.state.type=='genius'} 
          onChange={()=>this.props.handleChange('type','genius')}>
            牛人
          </RadioItem>
          <RadioItem checked={this.props.state.type=='boss'}
          onChange={()=>this.props.handleChange('type','boss')}>
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

上例中, 由于原先Register组件的state有一个初始值来默认选中’牛人’单选项, 所以这里在删除了Register组件的state属性后, 添加了一个componentDidMount钩子函数来通知Register的高阶组件来设置这个初始值;


修改bossinfo.js;

import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import hocForm from '../../component/hoc-form/hoc-form'

@connect(
  state=>state.user,
  {update}
)
@hocForm
class BossInfo extends React.Component{
  constructor(props){
    super(props)
    // this.state = {
    //  title:'',
    //  company:'',
    //  money:'',
    //  desc:''
    // }
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo

    return (
      <div>
        {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null}
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
        <AvatarSelector
          selectAvatar={(imgname)=>{
            this.props.handleChange('avatar', imgname)
          }}
        ></AvatarSelector> 
        <InputItem onChange={(v)=>this.props.handleChange('title',v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v)=>this.props.handleChange('company',v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v)=>this.props.handleChange('money',v)}>
          职位薪资
        </InputItem>
        <TextareaItem 
          onChange={(v)=>this.props.handleChange('desc',v)}
          rows={3}
          autoHeight
          title='职位要求'
        >
        </TextareaItem>
        <Button 
          onClick={()=>{
            this.props.update(this.props.state)
          }}
          type='primary'>提交</Button>
      </div>
    )
  }

}

export default BossInfo

上例中, 需要将传入AvatarSelector组件的selectAvatar方法做修改, 不能使用this.setState方法了, 因为BossInfo组件的state属性已经删除了, 需要使用this.props.handleChange方法来代替;


修改geniusinfo.js;

import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import hocForm from '../../component/hoc-form/hoc-form'

@connect(
  state=>state.user,
  {update}
)
@hocForm
class GeniusInfo extends React.Component{
  constructor(props){
    super(props)
    // this.state = {
    //  title:'',
    //  desc:''
    // }
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo

    return (
      <div>
        {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
        <AvatarSelector
          selectAvatar={(imgname)=>{
            this.props.handleChange('avatar',imgname)}}
        ></AvatarSelector> 
        <InputItem onChange={(v)=>this.props.handleChange('title',v)}>
          求职岗位
        </InputItem>
        <TextareaItem 
          onChange={(v)=>this.props.handleChange('desc',v)}
          rows={3}
          autoHeight
          title='个人简介'
        >
        </TextareaItem>
        <Button 
          onClick={()=>{
            this.props.update(this.props.state)
          }}
          type='primary'>提交</Button>
      </div>
    )
  }

}

export default GeniusInfo



10.聊天详情页面;

(1)socket.io介绍;

socket.io是基于事件的实时双向通信库(前后端通过事件来进行双向通信), 不同于Ajax(基于http协议), 它是基于双向通信协议: websocket协议;


![](./dev_memo_img/112.png)


(2)安装socket.io库;

$ npm install socket.io —save
$ npm install socket.io-client —save


(3)修改index.css(为聊天页面添加一些基本样式);
……
#chat-page .chat-me .am-list-extra{
  flex-basis:auto;
}
#chat-page .chat-me .am-list-content{
  padding-right: 15px;
  text-align: right;
}
.stick-footer{
  z-index: 10;
  position: absolute;
  bottom: 0;
  width: 100%;
}

上例中, .stick-footer是聊天输入框的样式;


(4)修改src/index.js;
……
import Chat from './component/chat/chat' 
……
<Route path='/chat/:user' component={Chat}></Route>
……

上例中, 路由的path设置为’/chat/:user’, 是因为需要知道当前在和哪个用户聊天;


(5)在component/chat中新建chat.js;

import React from 'react'

class Chat extends React.Component{

  render(){
    console.log(this.props)
    return (
      <h2>chat with user:{this.props.match.params.user}</h2>
    )
  }
}

export default Chat


(6)修改component/usercard/usercard.js;

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


上例在点击song2这个usercard后会跳转到对应的chat页面:

![](./dev_memo_img/113.png)

![](./dev_memo_img/114.png)


(7)修改server/server.js;

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
  console.log('user login')
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(9093,function(){
  console.log('Node app start at port 9093')
})

上例中, 将socket.io与express关联了起来, 如果是仅仅使用socket.io, 只需要const io = require('socket.io’)即可;
将socket.io与express配合使用之后, 9093端口不仅可以监听http协议的请求, 还可以监听websocket协议的请求, 并且由io来对接收到的websocket请求做进一步处理; 


(8)修改chat.js;

import React from 'react'
import io from 'socket.io-client'

class Chat extends React.Component{
  componentDidMount(){
    const socket = io('ws://localhost:9093')
  }
  render(){
    console.log(this.props)
    return (
      <h2>chat with user:{this.props.match.params.user}</h2>
    )
  }
}

export default Chat

上例中, 由于目前在前端发起的ws请求是属于跨域的, 所以这里需要手动指定连接地址;
重新访问’http://localhost:3000/chat/song2’后, 服务器端控制台显示:
user login


(9)前后端实时显示消息;

修改server/model.js;
……
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
    'chatid': {'type':String, 'require':true},
    'from':{'type':String, 'require': true},
    'to':{'type':String, 'require': true},
    'read':{'type':Boolean, default:false},
    'content':{'type':String, 'require':true, 'default':''},
    'create_time': {'type':Number, 'default': new Date().getTime()}
  }
}
……

上例中, 在chat集合中设置的chatid字段是为了之后无须根据from和to字段来进行多次查询, 它保存的内容其实就是简单地将from和to中保存的用户_id值使用’_’进行连接得到的字符串; 


修改server/server.js;

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express();
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
  socket.on('sendmsg', function(data){
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content:msg}, function(err, doc){
      if(!err){
        delete doc._doc.__v
        io.emit('recvmsg', Object.assign({},doc._doc))
      }
    })
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(9093,function(){
  console.log('Node app start at port 9093')
})

上例中, 当服务器端监听到某个客户端socket发来的’sendmsg’请求事件后会使用io.emit方法在全局范围内广播一条’recvmsg’事件并同时将这条消息发送出去, 也就是说无论是否是这条消息直接发送用户或者是接收用户(from/to属性对应的用户)都会在客户端socket对象上接收到这条消息, 那么就现在应用的设计来说, 所有用户的redux.chat中内容都会被更新, 从而所有人的chat页面也都会显示这条消息的内容, 这显然不是最终正确的设计, 之后会进一步优化;


在src/redux中新建chat.redux.js;

import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

//聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg:[],
  unread:0
}

//reducer
export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST:
      return {...state, chatmsg:action.payload, unread:action.payload.filter(v=>!v.read).length}
    case MSG_RECV:
      return {...state, chatmsg:[...state.chatmsg, action.payload], unread:state.unread+1}
    // case MSG_READ:

    default:
      return state
  }
}

//action creator
function msgList(msgs){
  return {type:MSG_LIST, payload:msgs}
}
function msgRecv(msg){
  return {type:MSG_RECV, payload:msg}
}

export function recvMsg(){
  return dispatch=>{
    socket.on('recvmsg', function(data){
      dispatch(msgRecv(data))
    })
  }
}

export function sendMsg({from, to, msg}){
  return dispatch=>{
    socket.emit('sendmsg', {from, to, msg})
  }
}

export function getMsgList(){
  return dispatch=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status==200 && res.data.code==0){
          dispatch(msgList(res.data.msgs))
        }
      })
  }
}

上例中, recvMsg方法并非派发action的方法, 但是由于react-redux的connect方法第二个参数的格式限制, 所以只能构造成上面的形式, 它的作用是当用户发送一条消息时, 通过客户端socket对象向服务器端发送一个’sendmsg’请求事件, 服务器接收到消息后将会在数据库中新建一条消息记录, 并且在全局范围内(当前server连接的所有客户端socket)发送一个’recvmsg’请求(其实只需要对这条消息的发送者和接收者广播’recvmsg’请求即可, 之后应该会优化);
虽然这个recvMsg方法就功能上来说无须设置在chat.redux.js中, 直接在chat.js中用户点击发送时在客户端socket对象上emit ’sendmsg’请求事件效果也是相同的, 但是出于应用中对数据向后端的发送以及获取的功能最好都设置在redux相关的模块中(整体概念更加清晰), 并且由于客户端socket对象本身设置在chat.redux.js模块中, 也就是说Chat组件就算要直接向后端发送websocket请求也需要先从chat.redux.js模块中引入这个socket对象, 所以这里就在chat.redux.js中设置了sendMsg方法;

上例中, 与服务器端建立连接的客户端socket设置在了chat.redux.js中, 也就是说, 当应用加载时就已经与服务器建立了基于websocket的双向通信连接了(server端也同时开始监听从客户端发送的'sendmsg’事件了), 之后当chat.js模块被加载(Chat组件被加载), 其componentDidMount钩子函数中执行了getMsgList和recvMsg这两个派发action的函数, 第一个函数是为了向后端发送请求获取数据库中的一个消息列表(满足某些条件的所有消息记录组成的数组), 得到后端返回的数据后将更新redux的state.chat.chatmsg数组属性和state.chat.unread属性, 然后根据这些数据来渲染chat页面; 第二个函数用来在客户端socket对象上注册一个’recvmsg’请求事件的监听, 也就是说一旦客户端接收到了服务器端广播的一条’recvmsg’请求, 就会将接收到的消息数据更新到redux中, 这条消息会被添加到当前state.chat中chatmsg属性数组的最后(同时unread属性也会更新), 进而Chat组件会重新根据更新的数据渲染页面, 达到了实时更新消息的目的; 

这里有一个问题需要结合下面的chat.js来一起看, 当Chat组件第一次加载的时候会自动在socket上注册一次对’recvmsg’请求事件的监听, 那么当Chat组件卸载后(由于用户改变路由等原因)这个socket对象的监听任务还是存在的, 这就会引发一个问题: 当下一次Chat组件重新被加载时又会执行一次注册’recvmsg’请求事件的监听, 那么也就是说此时当客户端收到了来自服务器端的’recvmsg’请求后, 会连续执行两遍处理函数, 也就是将收到的同一条消息记录放入state.chat.chatmsg数组两次, 并且state.chat.unread也增加了两次; 
解决办法可以是在Chat组件的componentWillUnmount钩子函数中注销socket对象上对’recvmsg’请求事件的监听, 不过需要注意的是, socket对象的注册/注销函数的第二个参数的句柄(指针, 地址)必须是相同的, 例子:

    const socketHandler = function(data){
      dispatch(msgRecv(data))
    }
    socket.on('recvmsg', socketHandler)
    socket.removeEventListener('recvmsg', socketHandler)

不过, 之后会实现一个未读消息条数实时显示在消息图标上的这一功能, 如果这一功能依赖redux中state.chat.unread来更新的话, 那么这个socket上注册的对'recvmsg’请求事件的监听就不能随便取消, 因为需要通过它来实时更新state.chat.unread;
于此相关的另一个问题是, 如果用户打开应用, 但是并没有进入chat页面, 也就是Chat组件未加载, 此时客户端socket对象还没有监听来自服务器端的’recvmsg’请求事件, 那么在这种情况下, 未读消息条数实时显示在消息图标上的这一功能又应该通过什么方式实现呢?


修改chat.js;

import React from 'react'
import {List, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'

@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {text:''}
  }
  componentDidMount(){
    this.props.getMsgList()
    this.props.recvMsg()
  }
  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text:''})
  }
  render(){
    return (
      <div className='stick-footer'>
        <List>
          <InputItem
            placeholder='请输入'
            value={this.state.text}
            onChange={v=>{
              this.setState({text:v})
            }}
            extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
          ></InputItem>
        </List>
      </div>
    )
  }
}

export default Chat

通过上例可以发现, 在Chat组件中并不会利用handleSubmit函数直接在页面中添加用户发送出的消息内容, 而是将内容发送到服务器端存入数据库后向相关客户端socket对象广播消息的方式来更新客户端redux中相关数据, 进而重新渲染消息页面显示最新的消息;

需要注意的是, 上例中InputItem组件内的value={this.state.text}属性设置不可以省略, 原因是当用户点击发送后, 需要将InputItem组件中的内容清空(也就是将InputItem组件的value属性设置为’’), 如果省略了这条属性设置, 那么它就接收不到Chat组件自身state对象中text属性的最新更新(Chat组件state的更新不会对InputItem元素的value属性产生影响), 也就是说在其state更新并且重新render组件后, 在react虚拟dom树与实际dom树对比中不会发现InputItem元素的差异, 也就不会在html页面中更新它, 那么InputItem元素中已经输入的内容就会保留, 不会被重置; 
如果没有清空state.text属性这个功能的话, 那么在InputItem组件中设置或者不设置value={this.state.text}的效果是相同的, 其实归根结底只要保证组件state中指定的某些属性与相关元素的输入值(value属性)保持同步就可以了;

补充:
那么对于不使用redux和react-redux的应用, 如何在上例的这种发送消息的情况下实时更新页面呢?
解决方法可以是, 在后端将消息储存在数据库, 并通过'recvmsg’事件将消息发送给客户端socket对象后使用this.setState方法将消息更新在组件自己的state对象中, 从而达到根据最新数据实时渲染页面的效果;


修改src/reducer.js;
……
import {chat} from './redux/chat.redux'

export default combineReducers({user, chatuser, chat})


修改server/user.js;
……
const Chat = model.getModel('chat')
……
Router.get('/getmsglist', function(req,res){
  const user = req.cookies.userid
  Chat.find({'$or':[{from:user},{to:user}]},  _filter, function(err, doc){
    if(!err){
      return res.json({code:0, msgs:doc})
    }
  })
})
……

上例中, 对于聊天消息的查询条件是从指定用户发出或者发送给这个指定用户的所有消息记录, 那么也就是说对于一个用户而言, 无论是我发给谁的, 任何人发给我的都会做为查询返回值在我也某个其它用户的聊天界面中显示, 这显然不符合基本设计思路, 之后会优化;


修改usercard/usercard.js;
……
  handleChat(v){
    this.props.history.push(`/chat/${v._id}`)
  }
……
<Card key={v._id} onClick={()=>this.handleChat(v)}>
……

在用户来到与某个其他用户chat的页面后, redux中的state.chat.chatmsg将更新:

![](./dev_memo_img/115.png)

当用户发送了一条消息后, 这条消息将会被添加到redux的state.chat.chatmsg数组的最后, 同时state.chat.unread也会递增:

![](./dev_memo_img/116.png)


(10)优化chat页面;

修改chat.js;

import React from 'react'
import {List, InputItem, NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'

@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {text:''}
  }
  componentDidMount(){
    this.props.getMsgList()
    this.props.recvMsg()
  }
  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text:''})
  }
  render(){
    const user = this.props.match.params.user
    const Item = List.Item
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>
          {user}
        </NavBar>

        {this.props.chat.chatmsg.map(v=>{
          return v.from == user?(
            <List key={v._id}>
              <Item
              >{v.content}</Item>
            </List>
          ):(
            <List key={v._id}>
              <Item 
                extra={'avatar'}
                className='chat-me'
              >{v.content}</Item>
            </List>
          )
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat

上例中, 暂时还未实现用户头像显示功能, 对于用户自己发出的消息需要显示在右侧, 需要添加css class ’chat-ma’, 具体参考src/index.css;


在不同浏览器中以两个不同用户登录后聊天:

![](./dev_memo_img/117.png)


(11)聊天未读消息实时更新;

正如之前所提出的, 为了能够在消息图标上实时显示未读消息数量, 不能在Chat组件加载后才获取消息列表, 接收服务器端发来的新消息的方法也不能仅仅通过Chat组件的componentDidMount钩子函数来绑定, 而是需要在Dashboard组件加载时就绑定这两个方法; 

删除chat.js的componentDidMount钩子函数中的:
this.props.getMsgList()
this.props.recvMsg()


修改dashboard.js;
……
import {getMsgList, recvMsg} from '../../redux/chat.redux'

@connect(
  state=>state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component{
  componentDidMount(){
    this.props.getMsgList()
    this.props.recvMsg()
  }
  render(){
……


修改navlinkbar.js;
……
import {connect} from 'react-redux'

@withRouter
@connect(
  state=>state.chat
)
class NavLinkBar extends React.Component{
……
    <TabBar>
        {navList.map(v=>(
          <TabBar.Item 
            badge={v.path=='/msg'?this.props.unread:0}
            key={v.path}
……

![](./dev_memo_img/118.png)

![](./dev_memo_img/119.png)


不过, 目前还存在一个问题, 由于getMsgList和recvMsg这两个函数已经绑定在了Dashboard组件加载时, 那么如果是通过Dashboard组件跳转到chat页面, 消息列表和未读消息当然可以直接在redux中获取(并且实时显示更新), 但是如果用户在chat页面刷新页面, 也就是不通过Dashboard组件直接来到chat页面, 此时redux中还不存在消息列表与未读消息的信息, 那么就会出现问题, 解决办法是同时在Chat组件加载时绑定getMsgList和recvMsg这两个函数, 但是需要先行判断redux中是否已经存在消息列表以避免重复获取和重复监听, 修改chat.js:
……
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
……

相同的道理, 在dashboard.js中也需要做一样的判断:
……
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
…...


(12)完善chat页面功能;

修改server.user.js;
……
Router.get('/getmsglist', function(req,res){
  const user = req.cookies.userid

  User.find({}, function(e,userdoc){
    let users = {}
    if(!e){
      userdoc.forEach(v=>{
        users[v._id] = {name:v.user, avatar:v.avatar}
      })
    }

    Chat.find({'$or':[{from:user},{to:user}]}, _filter, function(err, doc){
      if(!err){
        return res.json({code:0, msgs:doc, users:users})
      }
    })
  })

})
……

上例中, 在Dashboard组件或者Chat组件首次加载后通过Ajax请求后端’/user/getmsglist’的数据时, 先获取所有用户的信息并以key/value(key:_id, value:{user, avatar})的形式保存, 然后再获取与当前登录用户相关的消息列表, 并同时返回这两类数据; 需要注意的是, 由于在查询消息列表的返回函数中使用到了users对象, 也就是说为了确保users对象先被查询到再与消息列表一同返回, 不能以平级的形式调用这两个find方法(它们都是异步的, 无法确定哪个先完成), 需要将Chat.find放在User.find的回调函数中; 

不难发现, 这里查询出了所有数据库中用户的信息然后放入users对象, 其实根据应用的设计思路, 对于boss身份的用户只可能与genius身份的用户进行聊天(反之亦然), 又因为聊天页面本身默认就是通过Boss/牛人列表点击进入的, 那么完全可以利用chatuser.redux.js模块中存储的userlist数组来代替这里的users对象, 因为users对象本身就是为了方便渲染chat页面聊天双方的头像和名称信息才创建的, 也就是说这里的额外查询一次所有用户的信息并更新到chat.redux的users对象中这个步骤其实是可以省略的, 完全可以通过将chatuser.redux.js模块中的getUserList方法分别绑定在Chat组件和Boss/Genius组件的componentDidMount中(目前只有这些组件需要从redux中获取最新的用户列表的信息, 之后的msg页面也有可能需要)来将最新的用户列表信息放入redux的state.chatuser中, 然后在chat页面就可以根据redux中最新的用户列表数据来渲染聊天双方的头像和名称信息了(当前登录用户的各种信息可以在redux的state.user中获取);

其实使用上面的这种优化方式还能同时修复目前存在的一个bug: 由于目前redux的state.chat中的users对象只在Dashboard/Chat组件首次加载时获取一次, 之后对chat聊天页面用户信息的渲染都是根据这个对象中的数据来进行的, 而Boss/Genius组件每次被加载时都会去后端取一次最新的用户列表数据并存储在redux的state.chatuser.userlist中, 那么如果在用户已经打开应用并且加载了Dashboard/Chat组件的情况下, 有其他新的用户注册了账号, 那么此时当前用户在不刷新页面的情况下来到Boss/牛人列表也是能够获取这个最新注册用户的信息的, 但是当进入与这个用户的chat页面后, 由于这个新用户的_id不存在与当前应用redux的state.chat.users对象中, 所以chat页面根本不会渲染;
在当前的设计架构下, 修复上面提到的这个bug的方法是修改chat.js中的componentDidMount方法:
  componentDidMount(){
    this.props.getMsgList()
    if(!this.props.chat.chatmsg.length){
      this.props.recvMsg()
    }
  }

这样每次用户来到chat页面都会重新获取一次数据库中所有用户的信息, 那么新注册用户的信息也能够拿到了;


补充:
1.在测试时发现一个bug, 就是当注册用户未填写desc字段的内容并完成注册后, 由于在user和boss/genius页面中需要通过split方法将用户desc字段中的信息按照换行符分行显示, 那么如果待展示用户在注册时并没有填写desc信息, 此时数据库的user集合中存储的这条记录中根本没有desc字段, 那么更新后的redux中state.user中也不存在desc属性, 所以在前端获取的用户数据的desc属性为undefined, 因此会报错: Cannot read property 'split' of undefined;
改进方法如下:

修改server/model.js;
……
'desc':{'type':String, 'default':'待更新'},
……


修改server/user.js;
……
Router.post('/update',function(req,res){
  const userid = req.cookies.userid
  if(!userid){
    return res.json({code:1, msg:'请先登录'})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc){
    if(!err){
      const data = Object.assign({},doc._doc,body)
      return res.json({code:0, data})
    }
  })
})
……

这里有一个特别需要注意的坑, 那就是mongoose的findByIdAndUpdate方法, 首先它不接受第三个filter对象参数来屏蔽返回信息中的指定自动, 其次, 在成功执行了数据库更新后, 这个方法的返回值doc中并非包含被更新对象的所有字段, 也并不是包含此次更新的所有字段, 而是包含了所有之前在创建集合的Schema结构时设置了requre:true或者default属性的所有字段, 也就是说, 当前user集合创建时的Schema结构为:
  {
    'user':{'type':String, 'require':true},
    'pwd':{'type':String, 'require':true},
    'type':{'type':String, 'require':true},
    //用户头像
    'avatar':{'type':String},
    //个人简介
    'desc':{'type':String, 'default':'待更新'},
    //职位名
    'title':{'type':String},
    //Boss需要的两个字段
    'company':{'type':String},
    'money':{'type':String}
  }

那么使用findByIdAndUpdate方法更新了user集合中某个记录后返回的doc中只包含:user, pwd, type, desc, _id, __v这些字段;

所以上例中使用了Object.assign({},doc._doc,body)来将此次前端完善信息的所有属性连同doc中返回的那些属性(其中desc非常重要, 因为前端很可能没有在完善信息时填写并传递这一属性, 那么就需要在这里取得doc中获取到的desc默认值来更新前端redux的state.user对象, 不然就会出现上面提到的desc为undefined的bug)一起返回给前端, 进而去更新redux的state.user;


这样在展示没有desc属性的用户(test用户)信息时:

![](./dev_memo_img/120.png)

![](./dev_memo_img/121.png)

2.还有一个bug, 由于目前应用中是通过: !this.props.chat.chatmsg.length 这样的条件来判断前端socket对象是否已经开始监听来自服务器端的'recvmsg’事件了, 那么如果某个用户(比如新注册用户)他既没有发送过任何消息给其他用户, 也没有接收过其他用户的消息, 也就是说数据库中就根本没有任何消息记录的from/to字段存储了这个用户的_id, 这种情况下, 此用户在应用中redux的state.chat.chatmsg属性就是一个长度为0的数组, 显然判断条件: !this.props.chat.chatmsg.length 会一直成立, 导致应用重复监听来自服务器端的'recvmsg’事件, 接下去如果用户发送一条消息或者收到一条消息, 就会在其redux的state.chat.chatmsg中实时添加重复消息, 于是chat页面中的消息内容也就会重复显示;
解决办法是在chat.redux.js的iniState中添加一个新的listenerset属性(标识应用是否已经监听了来自服务器端的'recvmsg’事件的标识符), 然后在Dashboard组件和Chat组件的componentDidMount方法中在执行recvMsg方法的同时执行listenerSet方法将redux中的标识符置为true, 并且将原先的判断条件: !this.props.chat.chatmsg.length 改为: !this.props.chat.listenerset;

修改dashboard.js;
……
  componentDidMount(){
    if(!this.props.chat.listenerset){
      this.props.getMsgList()
      this.props.recvMsg()
      this.props.listenerSet()
    }
  }
……

修改chat.js;
……
  componentDidMount(){
    this.props.getMsgList()
    if(!this.props.chat.listenerset){
      this.props.recvMsg()
      this.props.listenerSet()
    }
  }
……

////////////////////////////////////////////////////////


修改chat.redux.js;
……
const initState = {
  chatmsg:[],
  unread:0,
  users:{},
  listenerset:false
}
……
case MSG_LIST:
      return {...state, users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read).length}
……
export function getMsgList(){
  return dispatch=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status==200 && res.data.code==0){
          dispatch(msgList(res.data.msgs, res.data.users))
        }
      })
  }
}
……

上例中, 将后端'/user/getmsglist'返回的消息列表以及存储所有用户的_id, 名称/头像的对象通过MSG_LIST这个类型的action保存在了redux.chat中, 也就是说当Dashboard组件加载时, 这些信息已经都更新到redux中了;


修改chat.js;
……
import {List, InputItem, NavBar, Icon} from 'antd-mobile'
……
render(){
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users

    if(!users[userid]){
      return null
    }
    return (
      <div id='chat-page'>
        <NavBar 
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>

        {this.props.chat.chatmsg.map(v=>{
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from == userid?(
            <List key={v._id}>
              <Item
                thumb={avatar}
              >{v.content}</Item>
            </List>
          ):(
            <List key={v._id}>
              <Item 
                extra={<img src={avatar}/>}
                className='chat-me'
              >{v.content}</Item>
            </List>
          )
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
……

上例中, Chat组件通过redux的state.chat.users信息完善了聊天页面中聊天对象名称以及聊天双方头像显示的功能, 并且如果聊天对象的id不匹配从数据库中获取的所有用户id中的任何一个, 那么chat页面就不会渲染; 
其次, 在页面顶部的导航栏左侧添加了返回上一个页面的功能;


![](./dev_memo_img/122.png)


关于antd-mobile中Icon组件的内容可以参考:
https://mobile.ant.design/components/icon/


修改src/util.js;
……
export function getChatId(userId, targetId){
  return [userId,targetId].sort().join('_')
}
……


修改chat.js;
……
import {getChatId} from '../../util'
……
render(){
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users

    if(!users[userid]){
      return null
    }

    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid == chatid)
    return (
      <div id='chat-page'>
        <NavBar 
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>

        {chatmsgs.map(v=>{
……

上例中, 引入了在util.js中设置的getChatId方法, 然后在遍历消息列表并渲染聊天页面之前增加了一次过滤, 因为之前也提到过, 目前聊天页面存在的问题是, 
由于getMsgList函数获取到的消息列表包括: 当前登录用户发送给任何其它用户的消息与任何其它用户发送给当前登录用户的消息, 那么redux中state.chat.chatmsg存储的消息列表其实是当前登录用户与所有聊天对象的消息集合, 这样获取后端数据是正确的, 因为这些聊天消息数据是当前用户在与其它不同聊天对象的聊天页面中分别需要显示的; 但是与某个特定用户的聊天页面应该只显示聊天双方互相通信的消息, 而不是消息列表中的所有内容, 所以就需要一层过滤, 这层过滤的关键就是chatid这个字段, 鉴于chatid的生成条件, 只有特定的两个聊天对象(无论是from A to B 还是from B to A)拥有一个相同的chatid(AB), 也就是说所有满足chatid为’AB’的消息记录才应该显示在A与B或者B与A的聊天页面, 上例中利用当前登录用户的_id与当前chat页面聊天对象的_id通过getChatId方法生成了一个chatid(与在数据库chat集合中存储一条消息使用的chatid字段形成了对应关系), 通过它来过滤消息列表中的所有消息记录, 只有chatid相同的记录才会被当前chat页面显示, 而又因为相同chatid的消息中from与to属性是不同的, 所以就可以很好地实现1对1聊天页面的功能;
不过, 目前还存在一个问题就是, 服务器端广播发送的消息记录没有经过任何过滤, 也就是说如果当前应用的登录用户是A, 他会因为在socket对象上注册了’recvmsg’事件而接收并在redux的state.chat.chatmsg中存储与自己毫无关系的聊天消息(比如C发送给D的消息), 虽然通过上面提到的在Chat组件中设置的过滤机制可以拦截所有无关的消息记录, 但是这种分发与接收消息的方式显然存在大量前后端的无用通信与redux数据的多余更新(未读消息数量也会错误地增加), 需要进一步优化; 


修改chat.redux.js;
……
//reducer
export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST:
      return {...state, users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read && v.to==action.payload.userid).length}
    case MSG_RECV:
      const n = action.payload.msg.to == action.payload.userid?1:0
      return {...state, chatmsg:[...state.chatmsg, action.payload.msg], unread:state.unread+n}
    case LISTENER_SET:
      return {...state, listenerset:true}
    // case MSG_READ:

    default:
      return state
  }
}
……
//action creator
function msgList(msgs, users, userid){
  return {type:MSG_LIST, payload:{msgs,users,userid}}
}
function msgRecv(msg, userid){
  return {type:MSG_RECV, payload:{msg, userid}}
}
export function listenerSet(){
  return {type:LISTENER_SET}
}

export function recvMsg(){
  return (dispatch,getState)=>{
    socket.on('recvmsg', function(data){
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}
……
export function getMsgList(){
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status==200 && res.data.code==0){
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}


上例中, 主要解决的问题是: 目前在应用中无论是当前登录用户发送给其他用户的消息, 还是其他用户发送给当前用户的消息都会算在应用的未读消息中, 所以这里需要在MSG_LIST和MSG_RECV这两种action被派发时在reducer中结合当前登录用户的_id来做判断, 如果是其他用户发送给当前用户的消息(消息对象的to属性等于当前用户_id), 才记录在redux.chat的unread属性中;
所以, 这里在chat.redux.js模块中需要获取user.redux.js模块中的数据(其实就是redux的state中不同属性下存储的数据), 解决办法是: react-redux的connect方法所支持的dispatch action相关的函数除了可以传入第一个参数:store.dispatch, 还可以传入第二个参数: store.getState, 这样在某个子redux模块中就可以通过redux整体的state对象获取其它子redux模块中的数据了;  


(13)实现发送emoji表情的功能;

emoji属于一种Unicode编码的字符集,  比较智能的编辑器可以直接显示emoji表情, 在一些比较现代的编程语言比如:swift中, emoji甚至可以被当作变量名;

![](./dev_memo_img/123.png)


修改chat.js;

import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, listenerSet} from '../../redux/chat.redux'
import {getChatId} from '../../util'

@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg, listenerSet}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text:'',
      showEmoji:false
    }
  }
  componentDidMount(){
    this.props.getMsgList()
    if(!this.props.chat.listenerset){
      this.props.recvMsg()
      this.props.listenerSet()
    }
  }
  //修正antd-mobile的Grid组件Carousel的问题
  fixCarousel(){
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text:''})
  }
  render(){

    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤔 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢 😭'
      .split(' ').filter(v=>v).map(v=>({text:v}))

    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users

    if(!users[userid]){
      return null
    }

    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid == chatid)
    return (
      <div id='chat-page'>
        <NavBar 
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>

        {chatmsgs.map(v=>{
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from == userid?(
            <List key={v._id}>
              <Item
                thumb={avatar}
              >{v.content}</Item>
            </List>
          ):(
            <List key={v._id}>
              <Item 
                extra={<img src={avatar}/>}
                className='chat-me'
              >{v.content}</Item>
            </List>
          )
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={[<span 
                    key='1'
                    style={{marginRight:15}}
                    onClick={()=>{
                      this.setState({showEmoji:!this.state.showEmoji})
                      this.fixCarousel()
                    }}
                  >😀</span>,
                  <span key='2' onClick={()=>this.handleSubmit()}>发送</span>
              ]}
            ></InputItem>
          </List>
          {this.state.showEmoji?
            <Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el=>{
              this.setState(
                {text:this.state.text+el.text}
              )
            }}
          />:null}
        </div>
      </div>
    )
  }
}

export default Chat


上例中以字符串的形式存储了一系列的emoji表情, 以空格隔开;
在Grid组件中以文本的形式来展示表情;

需要注意的是, 目前antd-mobile中Grid组件的Carousel(轮播)功能存在一定的bug, 需要使用官方给出的修正方法进行改进, fixCarousel函数就是用来修复这个bug的; 可以发现, fixCarousel函数被放在了onClick事件的回调函数中:
  onClick={()=>{
    this.setState({showEmoji:!this.state.showEmoji})
    this.fixCarousel()
  }}
当this.setState方法执行完毕后会同时在任务队列中添加一个update Chat组件的任务, 然后主线程继续执行this.fixCarousel方法, 并且也在任务队列中添加了:
window.dispatchEvent(new Event('resize')) 这样一个在window对象上派发一个resize事件的任务, 于是主线程执行完毕, 开始执行任务队列中的执行函数(将执行函数放到主线程执行), 首先就会去执行update Chat组件相关内容, 包括重新执行Chat组件的render方法, react 虚拟dom树对比, 将对比结果更新到html页面中, 然后这一轮的主线程也执行完毕了, 接着就会继续从任务队列中取得接下去的执行函数内容(window.dispatchEvent(new Event('resize’)))放到主线程执行...

参考:
https://emojipedia.org/ (表情库)
https://segmentfault.com/a/1190000007594620?utm_source=tuicool&utm_medium=referral (对emoji编码的讲解)


补充:
上例中, 需要给InputItem组件传递一个extra属性, 这个属性可以接收一个jsx元素, 那么下面的两种写法是等同的:

<1>
              extra={[<span 
                    key='1'
                    style={{marginRight:15}}
                    onClick={()=>{
                      this.setState({showEmoji:!this.state.showEmoji})
                      this.fixCarousel()
                    }}
                  >😀</span>,
                  <span key='2' onClick={()=>this.handleSubmit()}>发送</span>
              ]}

<2>
              extra={
                <div>
                  <span
                    style={{marginRight:15}}
                    onClick={()=>{
                      this.setState({showEmoji:!this.state.showEmoji})
                      this.fixCarousel()
                    }}
                  >😀</span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>
              }


需要注意的是, 在第2种写法中如果不给<span>元素添加key属性不会报错; 但是如果不使用<div>元素包裹两个<span>元素就会报错:
Adjacent JSX elements must be wrapped in an enclosing tag


修改index.css;
……
#chat-page .am-grid-icon{
  display:none;
}
#chat-page .am-grid-text{
  margin-top: 0;
}
……

上例对Grid组件中的emoji文本创建了一些css格式, 由于Grid组件的每个栅格默认由icon和text两个元素组成, 这里只用到了text, 所以需要隐藏icon;

![](./dev_memo_img/124.png)

![](./dev_memo_img/125.png)



11.聊天列表(msg页面)的实现;

(1)构建msg页面;

修改dashboard.js;
……
import Msg from '../../component/msg/msg'
……
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component: Msg,
      },
……


在component/msg中新建msg.js;

import React from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'

@connect(
  state=>state
)
class Msg extends React.Component{

  getLast(arr){
    return arr[arr.length-1]
  }

  render(){
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id

    //按照聊天会话(chatid)分组
    const msgGroup={}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })

    const chatList = Object.values(msgGroup)

    return  (
      <div>
          {
            chatList.map(v=>{
              const lastItem = this.getLast(v)
              const targetId = lastItem.from==userid?lastItem.to:lastItem.from
              
              return (
                <List key={lastItem._id}>
                  <Item
                    thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                  > 
                    {lastItem.content}
                    <Brief>{this.props.chat.users[targetId].name}</Brief>
                  </Item>
                </List>
              )
            })
          }
      </div>
    )
  }
}

export default Msg


上例中的getLast方法用来获取当前用户与某人的所有聊天记录中的最后一条; 由于目前前端获取到的state.chat.chatmsg中的消息都是默认按照在数据库中创建的先后顺序排列的, 所以越靠后的消息就是越新的消息, 如果有需要的话也可以手动根据消息的create_time(数值越大越新)属性来排列它们; 

需要注意的是, 在数据库手动删除user集合中某个已注册用户记录的同时不要忘了将与此用户相关的所有聊天记录在chat集合中删除, 不然上例中可能会发生在聊天信息中获取的targetId不存在于this.props.chat.users中, 也就是说this.props.chat.users[targetId]是undefined, 那么就会报错: Cannot read property 'name' of undefined;

当前存在的相关bug:
<1>.当用户跳转到msg页面后根据目前应用设计架构是不会更新redux的state.chat.users对象的, 那么如果在用户使用应用期间某个新用户注册了账号并且向当前用户发送了一条消息, 那么当前用户应用的redux中的state.chat.chatmsg数组是会实时更新的, 此时如果用户来在msg页面由于this.props.chat.users中不存在这个新注册用户的_id, 于是会报上面一样的错误;
解决办法就是在服务器端监听到’sendmsg’事件后不仅将新建的消息全局发送给客户端, 同时将当前数据库中最新的所有用户的相关信息发送过去, 那么在客户端监听到服务器端发送的’recvmsg’事件后就可以同时将新消息和最新的users对象更新到redux的state.chat中, 从而让msg页面可以正确地实时更新新注册用户发来的消息;

修改server/server.js;
……
const User = model.getModel('user')
……
io.on('connection', function(socket){
  socket.on('sendmsg', function(data){
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content:msg}, function(err, doc){      
      if(!err){
        User.find({}, function(e,userdoc){
          let users = {}
          if(!e){
            userdoc.forEach(v=>{
              users[v._id] = {name:v.user, avatar:v.avatar}
            })
            delete doc._doc.__v
            let data = {doc:doc._doc, users}
            io.emit('recvmsg', Object.assign({},data))
          }
        })
      }
    })
  })
})
……


修改redux/chat.redux.js;
……
    case MSG_RECV:
      const n = action.payload.msg.to == action.payload.userid?1:0
      return {...state, chatmsg:[...state.chatmsg, action.payload.msg], users:action.payload.users, unread:state.unread+n}
……
function msgRecv(msg, users, userid){
  return {type:MSG_RECV, payload:{msg, users, userid}}
}
……
export function recvMsg(){
  return (dispatch,getState)=>{
    socket.on('recvmsg', function(data){
      const userid = getState().user._id
      dispatch(msgRecv(data.doc, data.users, userid))
    })
  }
}
……

<2>由于state.chat.chatmsg中通过在socket对象上监听’recvmsg’事件收到的最新消息没有经过任何过滤(无论是服务器端广播消息时, 还是前端接收后添加到redux的state.chat.chatmsg数组中时), 也就是说当前用户的chatmsg数组中会存储与其毫无关系的消息(from/to属性都不是当前用户的_id), 在Msg组件遍历渲染消息列表是也是直接使用了这个chatmsg数组, 这就会导致用户消息列表中显示其他用户互相聊天的最新消息, 修复的办法有两种:

(1)在前端接收到’recvmsg’事件发送过来的消息后进行过滤再放入state.chat.chatmsg数组;
解决办法是: 修改chat.redux.js;
……
export function recvMsg(){
  return (dispatch,getState)=>{
    socket.on('recvmsg', function(data){
      const userid = getState().user._id
      if(data.doc.from==userid || data.doc.to==userid)
        dispatch(msgRecv(data.doc, data.users, userid))
    })
  }
}
……

(2)在后端接收到'sendmsg’事件发来的消息后, 不再通过io.emit这种方式来全局广播发送这条最新消息, 而是向与这条消息相关的指定socket对象发送这条消息;
由于当应用被打开时, 就已经建立了与服务器的连接, 而之后前端将会使用同一个socket向服务器接收/发送消息, 但是前端用户的角色是不固定的(用户可以在不刷新页面的情况下登出一个账号然后登陆另一个账号), 那么就需要在用户每次登陆被验证通过时向服务器端发送一条消息, 让其更新对此socket对象的标识(_id), 前端可以通过在每次类型为’AUTH_SUCCESS’的action被dispatch时同时向服务器端发送一个更新当前连接socket对象标识(_id)的消息, 由于应用的socket对象唯一, 并且处于chat.redux.js模块中, 所以可以在这个模块中export一个专门利用其socket对象向后端发送更新用户身份表示的请求事件;
对于服务器端来说, 要做到向指定的socket对象发送消息而不是全局广播, 就需要维护一个socket对象池, 每次有新的socket对象连接到服务器时就将这个socket对象放入连接池(客户端断开websocket连接后销毁这个socket对象), 并且为每个socket对象维护一个身份标识(_id/null), 当服务器端每次接收到新的消息时, 根据消息的from和to属性来判断向哪些socket对象发送这条消息, 其实就是查找socket对象池中哪些socket对象的_id标识与这条消息的from或者to属性相符, 只要与其中一个属性相等就向这个socket发送这条消息, 这点和在chat集合中通过: {'$or':[{from:user},{to:user}]} 条件查找消息记录的原理相同; 
这样就可以保证客户端的recvMsg方法接收到的最新消息一定是与当前应用登录用户有关的; 

很显然第二种修复方式虽然更加繁琐, 但是总体上减少了很多前后端不必要的websocket通信;

另外, 使用这种方式后还能顺带优化一个问题: 服务器端会查找当前所有用户信息并返回给客户端让其更新redux中state.chat.users对象, 但是就客户端而言, 这个users对象中并不需要数据库全部用户的信息, 其实只需要与当前登录用户身份不同的所有用户的信息即可, 因为这个应用的设计思路是只有不同身份的用户才能进行互动, 那么在服务器端有两处需要优化:

server/user.js;
……
Router.get('/getmsglist', function(req,res){
  const user = req.cookies.userid

  User.find({}, function(e,userdoc){
    let users = {}
    if(!e){
      userdoc.forEach(v=>{
        users[v._id] = {name:v.user, avatar:v.avatar}
      })
    }

    Chat.find({'$or':[{from:user},{to:user}]}, _filter, function(err, doc){
      if(!err){
        return res.json({code:0, msgs:doc, users:users})
      }
    })
  })
})
……


server/server.js;
……
io.on('connection', function(socket){
  socket.on('sendmsg', function(data){
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content:msg}, function(err, doc){
      if(!err){
        User.find({}, function(e,userdoc){
          let users = {}
          if(!e){
            userdoc.forEach(v=>{
              users[v._id] = {name:v.user, avatar:v.avatar}
            })
            delete doc._doc.__v
            let data = {doc:doc._doc, users}
            io.emit('recvmsg', Object.assign({},data))
          }
        })
      }
    })
  })
})
……

很显然, 上例中的两处都可以根据当前应用登录用户的_id来查找到其type属性, 然后以当前这个type值的另一种取值作为查找条件查找数据库user集合中的所有用户信息并返回给客户端, 让其更新redux的state.chat.users对象;

![](./dev_memo_img/126.png)


补充:
1.对于之前应用的功能来说, 在Dashboard组件中使用getMsgList方法其实只用到了它更新state.chat.chatmsg和state.chat.unread这个功能, 而获取后端用户信息并更新到redux的state.chat.user对象这个功能其实并没有实际作用(唯一需要state.chat.user信息的Chat组件自己会去获取), 但是在新增了Msg组件后, Dashboard组件中绑定的这个功能变为必须的了, 因为msg页面需要state.chat.user对象中的信息来渲染页面;
而对于Chat组件来说, componentDidMount中绑定的getMsgList方法的上述两个功能都是必须的, 因为它既要使用state.chat.user中数据来渲染页面中聊天双方的信息, 又需要保证如果用户是直接从chat页面打开应用(或者在chat页面刷新了页面), 然后从chat页面回到加载Dashboard组件相关的页面时不会缺失redux中state.chat.chatmsg和state.chat.unread的数据, 因为在加载Dashboard组件时state.chat.listenerset已经是true了, 不会再执行绑定在Dashboard组件中componentDidMount钩子函数中的getMsgList方法了; 
2.对于基于react-redux的应用在store对象被更新后, 应用中的那些使用了connect方法封装的组件如何update的推测;
就以此项目中Dashboard组件, Boss组件和UserCard组件为例(它们依次存在父子层级关系), 其中Dashboard组件和Boss组件都使用了connect方法封装, 那么在boss页面加载后, 这三个组件被依次render, 然后从内向外执行componentDidMount钩子函数, 也就是说当页面完成渲染后, Boss组件的componentDidMount函数先执行, 并且改变了一次store对象, 此时redux会在任务队列中放入一个执行函数, 它会依次执行之前在store上subscribe的所有回调函数, 而react-redux会在每个被connect方法封装组件的componentDidMount钩子函数中在store上注册组件的forceUpdate方法(可以参考Redux笔记中的相关内容), 接着在主线程中Dashboard组件的componentDidMount函数被执行了, 它也会改变一次store对象, 同样一个执行函数被redux放入任务队列, 至此主线程结束, 接着, 任务队列中刚才被redux放入的执行函数会被按顺序放入主线程运行, 对于每一个执行函数而言, 它将会依次执行之前react-redux通过connect方法在store上subscribe的所有回调函数, 但是这些回调函数是经过react-redux优化的: 首先,如果此次对store对象的改变在深度对比后结果是与上一个状态相同, 那么就不会触发组件的forceUpdate方法(这一点还有待核实); 其次, 并非是所有被connect方法封装的组件都会被update, 只有处于最外层的组件会被forceUpdate, 也就是说, react-redux会检查在store上subscribe的回调函数中将要被forceUpdate的组件, 如果这个组件的祖先中存在着被connect封装的组件就忽略这次forceUpdate(可能是通过react的虚拟dom树来进行检查), 只有当检查到没有其他祖先组件是被connect封装过的组件时才会去forceUpdate这个组件, 这样就避免了由于被connect封装的组件存在层级关系而重复update相同组件的情况; 也就是说, 这种情况下当store被更新, 那么只有Dashboard组件会因此被forceUpdate, Boss组件虽然也被connect封装, 但是它只会做为Dashboard组件的子组件被update...


(2)在msg页面的消息列表中显示未读消息数量, 并且保证列表中未读消息数量总和等于消息图标上显示的未读消息;

修改msg.js;
……
import {List, Badge} from 'antd-mobile'
……
return  (
      <div>
          {
            chatList.map(v=>{
              const lastItem = this.getLast(v)
              const targetId = lastItem.from==userid?lastItem.to:lastItem.from
              const unreadNum = v.filter(v=>
                !v.read&&v.to==userid
              ).length

              return (
                <List key={lastItem._id}>
                  <Item
                    extra={<Badge text={unreadNum}></Badge>}
                    thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                  > 
                    {lastItem.content}
                    <Brief>{this.props.chat.users[targetId].name}</Brief>
                  </Item>
                </List>
              )
            })
          }
      </div>
    )
......

![](./dev_memo_img/127.png)


更多关于antd-mobile中的内容可以参考:
https://mobile.ant.design/components/badge/


(3)消息列表按照最新消息排序(最新收到的消息排在消息列表的最上面);

修改msg.js;
……
    //根据每个聊天会话数组中最后一条聊天记录的create_time属性进行从大到小排列(最后返回的是正数)
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
……


(4)添加点击msg页面消息列表跳转到与对应用户聊天的chat页面的功能;

修改msg.js;
……
            return (
                <List key={lastItem._id}>
                  <Item
                    extra={<Badge text={unreadNum}></Badge>}
                    thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                    arrow='horizontal'
                    onClick={()=>{
                      this.props.history.push(`/chat/${targetId}`)
                    }}
                  > 
                    {lastItem.content}
                    <Brief>{this.props.chat.users[targetId].name}</Brief>
                  </Item>
                </List>
              )
……

需要注意的是, 上例中在<Item>组件上设置了onClick方法, 但是这个onClick并非react原生支持的点击事件, 也就是说, 点击Item组件相关的元素并不会触发onClick方法, 这里只是将onClick最为一个属性传递到了Item组件中, 它可以通过this.props.onClick来获取; 只有在一个非自定义组件的原生jsx元素(如: <span></span>)上定义的onClick方法才可以直接被react管理; 

![](./dev_memo_img/128.png)


12.进一步完善应用;

(1)消息已读状态的设置;

当前应用中所有从数据库获取的消息的read属性都是false, 所以只要是其他用户发送给当前用户的消息都将作为未读消息处理, 这里会完善这个问题;

修改chat.js;
……
import {getMsgList, sendMsg, recvMsg, listenerSet, readMsg} from '../../redux/chat.redux'
……
@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg, listenerSet, readMsg}
)
……
  componentDidMount(){
    this.props.getMsgList()
    if(!this.props.chat.listenerset){
      this.props.recvMsg()
      this.props.listenerSet()
    }
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
……

上例中, 在Chat组件的componentDidMount钩子函数中绑定了一个readMsg方法, 并将当前聊天对象的_id传入, 之后会在数据库中将所有from属性为这个_id, to属性为当前登录用户_id的所有消息的read属性都置为true, 然后更新应用中redux的state.chat.chatmsg和state.chat.unread, 从而可以更新消息图标上的未读消息数量和消息列表中聊天会话的未读消息数量;


修改chat.redux.js;
……
export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST:
      return {...state, users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read && v.to==action.payload.userid).length}
    case MSG_RECV:
      const n = action.payload.msg.to == action.payload.userid?1:0
      return {...state, chatmsg:[...state.chatmsg, action.payload.msg], users:action.payload.users, unread:state.unread+n}
    case LISTENER_SET:
      return {...state, listenerset:true}
    case MSG_READ:
      const {from, num} = action.payload
      return {
        ...state, 
        chatmsg:state.chatmsg.map(v=>({...v, read:from==v.from?true:v.read})), 
        unread: state.unread-num
      }
    default:
      return state
  }
}
……
function msgRead({from,num}){
  return {type:MSG_READ, payload:{from,num}}
}
……
export function readMsg(from){
  return dispatch=>{
    axios.post('/user/readmsg',{from})
      .then(res=>{
        if(res.status==200 && res.data.code==0){
          dispatch(msgRead({from,num:res.data.num}))
        }
      })
  }
}
……

由于从chat页面返回到Dashboard组件相关页面后Dashboard组件不会再通过getMsgList方法获取一次最新的chatmsg和unread属性, 所以需要通过readMsg方法中从后端返回的num属性(数据库中此次所有被更新了read属性的消息的数量)来更新redux中state.chat.unread; 
并且readMsg方法还会同时将state.chat.chatmsg中所有from属性等于聊天对象_id的聊天记录的read属性置为true, 这样当用户从chat页面返回到msg页面后就会在消息列表中正确显示未读消息数量了; 

不过目前存在一个问题, 就是这个更新未读消息信息的readMsg方法只绑定在了Chat组件的componentDidMount钩子函数上, 那么如果当用户停留在chat页面, 并且接收到了此次会话中聊天对象发送来的新消息时, 由于Chat组件只会被update而不会再次执行componentDidMount函数, 所以就无法同步消息已读的信息到服务器端以及前端的redux中了, 解决方法是将readMsg方法直接绑定在组件的componentWillUnmount函数中:
  componentWillUnmount(){
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }

当然还有另一种更加实时更新已读消息信息的方式就是在前端socket对象每次接收到’recvmsg’事件时都做一次判断, 如果用户当前处于与某个用户的聊天页面, 并且这条更新的消息的from/to属性也满足聊天双方的信息就执行一次readMsg方法;

补充:
在react-router2中存在着一些路由的钩子函数(可以参考React-router2笔记中: 11.路由的钩子; 相关内容), 如: onEnter/onLeave, 但是在react-router4中已经没有这样的钩子函数了, 因为react-router4将每一个路由都视为一个组件, 所以当用户进入/离开某个路由时, 直接使用此路由component的componentDidMount/componentWillUnmount就可以达到类似的效果;


修改server/user.js;
……
Router.post('/readmsg', function(req,res){
  const userid = req.cookies.userid
  const {from} = req.body
  Chat.update(
    {from, to:userid},
    {'$set':{read:true}},
    {'multi':true},
    function(err,doc){
      if(!err){
        return res.json({code:0, num:doc.nModified})
      }
      return res.json({code:1, msg:'error'})
    }
  )
})
……

上例中, 通过mongoose的update方法更新了数据库中的若干条记录后, 返回的doc对象的格式是类似:
{n:1, nModified:0, ok:1}

这样的形式, n表示此次update涉及到了多少条记录, nModified代表具体有几条记录被实际更新了, ok:1代表此次update方法执行成功, 没有发生错误;

需要注意的是, mongoose的update方法默认只会找到第一条符合查找条件的信息并进行更新, 如果需要全局查找并更新, 需要传入第三个参数对象: {'multi':true};


用户boss收到用户genius发来的两条消息:

![](./dev_memo_img/129.png)

用户boss打开消息列表中与genius的会话, 来到chat页面:

![](./dev_memo_img/130.png)

用户boss回到消息列表, 未读消息数量被更新:

![](./dev_memo_img/131.png)


目前应用中还存在一个缺陷, 那就是在server/model.js中指定的 new mongoose.Schema 新建集合格式的设置中对chat集合create_time字段的默认值指定为:
'create_time': {'type':Number, 'default': new Date().getTime()}

其实, 这个new Date().getTime()可以被单纯地视为一个字符串, 也就是说在一次server.js服务器加载后, 所有通过此服务器对数据库添加的chat集合记录的create_time都是相同的, 因为在create chat集合记录时并没有传入create_time这个字段, 所以所有被新建的集合记录都将使用同一个默认值; 

解决办法就是让服务器在每次创建一条新的消息记录到数据库时手动添加以当前时间戳为值的create_time属性:

修改server/server.js;
……
Chat.create({chatid, from, to, content:msg, create_time:new Date().getTime()}, function(err, doc){
……


(2)在消息列表中添加最后回复时间功能;

修改msg.js;
……
  //将Date对象转换为如: 2018-04-25 12:00:00 这样格式的字符串
  formatDateTime(date) {  
                let y = date.getFullYear();  
                let m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                let d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                let h = date.getHours();  
                h=h < 10 ? ('0' + h) : h;  
                let minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;  
                let second=date.getSeconds();  
                second=second < 10 ? ('0' + second) : second;  
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
    } 
……
                <List key={lastItem._id}>
                  <Item
                    extra={<Badge text={unreadNum}></Badge>}
                    thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                    arrow='horizontal'
                    onClick={()=>{
                      this.props.history.push(`/chat/${targetId}`)
                    }}
                  > 
                    {lastItem.content}
                    <Brief>{this.props.chat.users[targetId].name}</Brief>
                    <Brief>🕘{this.formatDateTime(new Date(lastItem.create_time))}</Brief>
                  </Item>
                </List>
……

上例中利用消息列表中每个会话的最后一条消息的create_time这个字段来生成一个指定格式的最后回复时间字符串;

关于new Date()格式处理可以参考:
https://blog.csdn.net/qq_39759115/article/details/78893853


![](./dev_memo_img/132.png)


(3)增加当用户在完善信息页面未选择头像就提交时的报错信息;

当前在bossinof/geniusinfo页面中, 如果用户未选择头像就点击提交, 那么用户所填写的信息还是会被发送到服务器端更新数据库, 然后更新前端redux的state.user中相关信息的, 但是由于缺失avatar属性, getRedirectPath方法会让state.user.redirectTo仍旧指向bossinof/geniusinfo, 也就是说用户点击提交后会留在bossinof/geniusinfo页面, 并且没有任何提示, 这种情况下用户显然会非常confusing, 解决方法就是在用户点击提交按钮并执行update时对提交的数据做检查, 如果没有包含avatar属性, 那么就通过errorMsg方法在redux上发布一条显示error msg的action, 并且不会提交任何数据到服务器端, 此时只要用户选择了任何头像, 那么在AvatarSelector组件的相关onClick方法中就会通过errorMsg方法在redux上发布一条清空error msg的action; 

修改user.redux.js;
……
export function errorMsg(msg){
  return {msg, type:ERROR_MSG}
}
……
export function update(data){
  
  return dispatch=>{
    if(!data.avatar)
      dispatch(errorMsg('请先选择头像再提交'))
    else
      axios.post('/user/update',data)
        .then(res=>{
            if(res.status==200&&res.data.code===0){
              dispatch(authSuccess(res.data.data))
            }else{
              dispatch(errorMsg(res.data.msg))
            }
        })
  }
}
……


修改geniusinfo.js/bossinfo.js;
……
import {update, errorMsg} from '../../redux/user.redux'
……
@connect(
  state=>state.user,
  {update, errorMsg}
)
……
        <AvatarSelector
          errorMsg={this.props.errorMsg}
          selectAvatar={(imgname)=>{
            this.props.handleChange('avatar',imgname)}}
        ></AvatarSelector> 
……


修改avatar-selector.js;
……
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
……

![](./dev_memo_img/133.png)

![](./dev_memo_img/134.png)


(4)修复用户在注册但未完成信息完善(选择头像)时直接访问其它需要登录权限的页面时(‘/me’, ‘/chat’等)可能会报错的问题:
Uncaught Error: Cannot find module './undefined.png'.

因为此时在页面中渲染用户头像的功能会require一个根本不存在的图片地址:’…/undefined.png’; 


解决办法:

其实对于一个已经注册但是还未完善头像信息的用户来说, 他除了能够访问bossinfo/geniusinfo页面来继续完善信息外理论上不能进入任何其它需要用户登录权限的页面, 下面来对这些页面进行逐一分析:

对于boss/genius页面来说, 由于当前未完善头像信息的用户不会在这个页面中获取自己的头像(但是可以发起聊天, 这个问题会在下面提到的限制其进入chat页面功能中解决), 所以不会有问题, 而对于其它用户在来到boss/genius页面时由于Boss/Genius组件(其实是它们的子组件:UserCard)本身存在逻辑, 如果待渲染的用户avatar属性不存在, 那么就不会在页面中渲染这个用户的UserCard, 也就避免了报错;

对于chat页面来说, 如果一个头像信息未完善的用户发送了一条消息给其它用户, 那么无论是当前用户还是接收了这条消息的用户的msg页面都会发生渲染头像相关的错误, 所以应该禁止一个没有头像信息的用户来到chat页面;

对于msg页面而言, 由于其他用户在他们的boss/genius页面(牛人/boss列表)中不会显示这些没有头像信息用户的card, 所以也无法发起聊天, 又由于上一条中已经说明了需要禁止一个没有头像信息的用户来到chat页面发起聊天, 所以其他用户的msg页面中也不会出现因为要显示这类用户的头像而发生错误的情况;

对于me页面来说, 目前肯定会因为当前用户没有设置头像而报错, 最好的解决办法(也能与之后将要添加的个人信息页面修改信息功能产生配合)是允许这类用户来到’/me’页面, 但是将用户头像部分显示为一张专门为未设置头像用户默认显示的图片;

根据上面几条内容进行总结: 
只要限制了未设置头像用户进入chat页面的功能, 并且改进me页面的头像显示, 就能解决上面提到的问题;
实现这个修复的关键就在于redux的state.user.redirectTo属性, 因为接下来需要在用户访问chat页面后对其是否已经完善了头像信息做一个检查, 如果有头像信息就可以进入chat页面, 如果没有头像信息就跳转到相关的信息完善页面(使用redirectTo属性来判断); 
对于一个已登录用户来说, 如果它有头像信息, 那么他在redux中保存的redirectTo属性就应该是boss/genius, 如果没有头像信息, 那么这个属性就应该是bossinfo/geniusinfo, 但是目前应用只有在发起一个type为: AUTH_SUCCESS 的action时才会去更新redirectTo属性, 而在最关键的AuthRoute的组件中由于在验证了用户登录信息后发出的是一个type为LOAD_DATA的action(LOAD_DATA与AUTH_SUCCESS在reducer中唯一的区别就是前者不会去更新state.user.redirectTo属性), 所以我们直接在AuthRoute的组件中使用AUTH_SUCCESS来代替LOAD_DATA, 使得AuthRoute组件在验证完用户权限后也能相应更新redirectTo属性:

修改user.redux.js;

删除与LOAD_DATA和loadData相关内容;
……
export function authSuccess(obj){
  const {pwd, __v, ...data} = obj
  return {type:AUTH_SUCCESS, payload:data}
}


修改component/authroute.js;
……
import {authSuccess} from '../../redux/user.redux'
import {connect} from 'react-redux'

@withRouter
@connect(
  null,
  {authSuccess}
)
……
    axios.get('/user/info')
      .then(res=>{
        if(res.status==200&&res.data.code==0){
            this.props.authSuccess(res.data.data)
        }else{
            this.props.history.push('/login')
        }
      })
……


修改chat.js;
……
import {Redirect} from 'react-router-dom'
……
    return (
      
      <div id='chat-page'>
        {redirect&&redirect.indexOf('info')!=-1?<Redirect to={redirect}/>:null}
……


通过上面的优化, 还顺带解决了之前的一个问题: 一个boss或者genius身份的用户可以任意交叉访问’/bossinfo’或’/geniusinfo’, 现在会根据用户的身份以及是否已经完善了头像来限制对’/bossinfo’或’/geniusinfo’页面的访问; 但是任何用户对’boss’或’genius’页面任意交叉访问的问题还存在, 解决方法是在Boss和Genius组件中同样添加redirect相关的判断条件;


修改genius.js;
……
import {Redirect} from 'react-router-dom'
……
@connect(
  state=>state,
  {getUserList}
)
class Genius extends React.Component{
  componentDidMount(){
    this.props.getUserList('boss')
  }
  render(){
    const redirect = this.props.user.redirectTo
    return (
      <div>
        {redirect&&redirect.indexOf('genius')==-1?<Redirect to={'/boss'}/>:null}
        <UserCard userlist={this.props.chatuser.userlist}/>
      </div>
    )
  }
}
……


修改boss.js;
……
import {Redirect} from 'react-router-dom'
……
class Boss extends React.Component{
  componentDidMount(){
    this.props.getUserList('genius')
  }
  render(){
    const redirect = this.props.user.redirectTo
    return (
      <div>
        {redirect&&redirect.indexOf('boss')==-1?<Redirect to={'/genius'}/>:null}
        <UserCard userlist={this.props.chatuser.userlist}/>
      </div>
    )
  }
}
……

经过这一系列优化后, 现在的访问规则是: 
如果一个完善了头像信息的boss用户直接访问bossinfo页面, 那么将会被跳转到boss页面, 如果他试图访问geniusinfo页面, 那么也会被跳转到boss页面; 如果他试图访问genius页面, 那么他还是会被跳转到boss页面(对于genius用户的对应规则是一样的);
如果一个未完善头像信息的boss用户直接访问bossinfo页面, 那么他是可以访问的, 如果他试图访问geniusinfo页面, 那么他会被跳转到bossinfo页面; 如果他试图访问genius页面, 那么他会被跳转到boss页面(对于genius用户对应规则是一样的);

也就是说一个未完善头像信息的用户是可以根据其身份访问boss/genius页面的, 不会被跳转到完善信息页面;
而一个已经完善了头像信息的用户无法访问对应其身份的完善信息页面, 会被直接跳转到相应boss/genius页面;


(5)为未完善头像信息的用户在个人中心显示一张default的头像图片;

在component/img中添加一张名为default.png的图片;


修改user.js;
……
render(){
    const srcImg = this.props.avatar?`../img/${this.props.avatar}.png`:'../img/default.png'
    return this.props.user ? (
      <div>
        <Result
          img={<img src={require(srcImg)} style={{width:50}} alt='' />}
          title={this.props.user}
          message={this.props.type=='boss' ? this.props.company:null}
        />
……

上例中, 设计思路是正确的, 但是页面会报错:
Uncaught Error: Cannot find module "."

这显然是由于require(srcImg)根本没有找到相关模块造成的, 也就是说srcImg无法被require获取;
这可能是因为webpack的Babel对这种情况下使用require方法有一定的限制(这里的require并非nodejs环境中commonjs的模块获取方法, 而是webpack自行创建的一个用来获取/转换静态资源路径的方法), 只能使用静态的纯字符串或者模板字符串, 而变量或者是字符串与变量的拼接是无法被正确读取的(这个机制还需要进一步核实);

所以上例只能改为:
……
    let userImg = this.props.avatar?require(`../img/${this.props.avatar}.png`):require('../img/default.png')
    
    return this.props.user ? (
      <div>
        <Result
          img={<img src={userImg} style={{width:50}} alt='' />}
          title={this.props.user}
          message={this.props.type=='boss' ? this.props.company:null}
        />
……

未完善头像信息用户直接来到’/me’页面:

![](./dev_memo_img/135.png)


(6)个人信息页面中添加跳转到完善信息页面以供用户修改个人信息的功能;

想要实现这个功能, 首先需要改变目前头像已完善用户来到bossinfo/geniusinfo页面时会被跳转到boss/genius页面的这一机制, 也就是说, 无论用户头像信息是否完善都应该可以随时访问相关的用户信息完善页面; 
同时还需要将之前的一个机制优化一下: 对于一个boss身份的头像信息完善的用户而言, 当他直接访问geniusinfo页面时应该被跳转到bossinfo页面(机制与目前已经实现的:当一个头像信息不完善的boss用户访问genius页面后会被跳转到boss页面这一点类似), 而目前会跳转到boss页面, 同理, 对于一个genius身份的头像信息完善的用户, 当他直接访问bossinfo页面时应该被跳转到geniusinfo页面;

修改geniusinfo.js;
……
    return (
      <div>
        {redirect&&redirect!==path&&redirect!=='/genius'&&redirect!=='/boss'?
          <Redirect to={this.props.redirectTo}/>
          :(redirect=='/boss'?<Redirect to='/bossinfo' />:null)
        }

        <NavBar mode="dark">牛人完善信息页面</NavBar>
……


修改bossinfo.js;
……
    return (
      <div>
        {redirect&&redirect!==path&&redirect!=='/boss'&&redirect!=='/genius'?
          <Redirect to={this.props.redirectTo}/>
          :(redirect=='/genius'?<Redirect to='/geniusinfo'/>:null)
        }
        
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
……


然后需要修改的一点就是, 目前在信息完善页面完成提交后(update方法执行)会使用user.redux.js中的authSuccess这个action creator方法来更新redux中用户相关的信息, 但是它同时会将state.user.redirectTo这个属性更新为’/boss’或者’/genius’, 然后页面被重新渲染, 由于上面更改后的路由规则, 用户将会停留在当前的信息完善页面; 
解决方法就是为update方法新建一个对应的action creator, 并且要保证它会把state.user.redirectTo更新为一个非’/boss’或者’/genius’的值; 
这里将这个redirectTo设计为’/me’, 目的就是为了让用户在完善自己的信息之后能够立刻在个人信息中心页面查看更新后的个人信息, 并且可以立刻选择再次修改个人信息;

修改user.redux.js;
……
const UPDATE_DATA = 'UPDATE_DATA'
……
    case UPDATE_DATA:
      return {...state, redirectTo:'/me', ...action.payload}
……
export function updateUserInfo(updatedInfo){
  return {type:UPDATE_DATA, payload:updatedInfo}
}
……
export function update(data){
  
  return dispatch=>{
    if(!data.avatar)
      dispatch(errorMsg('请先选择头像再提交'))
    else
      axios.post('/user/update',data)
        .then(res=>{
            if(res.status==200&&res.data.code===0){
              dispatch(updateUserInfo(res.data.data))
            }else{
              dispatch(errorMsg(res.data.msg))
            }
        })
  }
}
……


修改user.js;
……
import {logoutSubmit, authSuccess} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {logoutSubmit, authSuccess}
)
class User extends React.Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
  }
  componentWillUnmount(){
    this.props.authSuccess({type:this.props.type, avatar:this.props.avatar})
  }
  updateInfo(){
    const alert = Modal.alert
        alert('提示', '是否前往修改个人信息页面?', [
          { text: '算了' },
          { text: '前往', onPress: () => {
            const targetPath = this.props.type=='boss'?'/bossinfo':'/geniusinfo'
            this.props.authSuccess({type:this.props.type, avatar:this.props.avatar})
    this.props.history.push(targetPath)
          }},
        ])
  }
……
        <WhiteSpace></WhiteSpace>
        <List>
          <List.Item onClick = {this.updateInfo}>修改个人信息</List.Item>
        </List>
        <List>
          <List.Item onClick = {this.logout}>退出登录</List.Item>
        </List>
……

上例中, 在’/me’页面添加了一个修改个人信息的按钮, 点击前往后将首先使用user.redux.js中的authSuccess方法将redux中state.user.redirectTo属性从’/me’改回之前验证登录后的状态, 接着就跳转到相应的用户完善信息页面, 由于已经更新了state.user.redirectTo的值, 所以在render了geniusinfo/bossinfo页面后不会由于路由判断直接又返回’/me’页面; 
需要注意的是, 在User组件中还使用了componentWillUnmount钩子函数来执行authSuccess方法以更新redux中的state.user.redirectTo属性, 但是它在这里的作用并不是为了修正当用户的state.user.redirectTo属性已经为’/me’后又点击修改个人信息而来到用户完善信息页面但是被路由条件直接跳转回了’/me’页面这个问题, 因为componentWillUnmount钩子函数发生在页面路由跳转, 然后根据路由所有相关组件都被加载(执行它们的render方法), 更新了虚拟dom树, 虚拟树进行对比并重新渲染html页面后, 而在bossinfo/geniusinfo组件重新render时就已经会因为当前state.user.redirectTo属性为’/me’而重新跳转回用户个人信息页面(<Redirect>组件在render方法中一旦加载就会立刻进行react路由的跳转, 进而整个应用重新根据路由进行组件更新), 所以必须在执行this.props.history.push(targetPath)之前就去更新state.user.redirectTo属性(而更新redux中数据引发的update所有被connect封装的组件发生在当前主线程中所有任务执行完毕后, 也就是这一轮html页面更新后);
其实这里在User组件的componentWillUnmount钩子函数中使用authSuccess的作用是为了当用户从’/me’页面跳转到msg页面或者跳转到boss/genius后, 将当前用户的state.user.redirectTo属性恢复到之前验证登录后的状态以方便后面的操作, 而这里之所以可以等此轮html页面更新后再执行更新redux数据的操作的原因是: 首先, msg页面本身就没有根据路由跳转的判断逻辑, 其次, 在boss/genius页面的路由跳转判断中将会添加与’/me’相关的条件从而使得用户能够正常访问页面而不会跳转回’/me’页面:

修改boss.js;
……
{redirect&&redirect.indexOf('boss')==-1&&redirect.indexOf('me')==-1?<Redirect to={'/genius'}/>:null}
……


修改genius.js;
……
{redirect&&redirect.indexOf('genius')==-1&&redirect.indexOf('me')==-1?<Redirect to={'/boss'}/>:null}
……

![](./dev_memo_img/136.png)

![](./dev_memo_img/137.png)


接下去需要进一步完善的方面就是, 当前从个人中心页面点击修改个人信息按钮并跳转到对应的geniusinfo/bossinfo后页面中所有信息都是空的, 就如同新注册用户第一次来到这个页面时一样, 这里需要将用户之前已经提交的最新内容默认显示在完善信息页面中;

修改component/hoc-form/hoc-form.js;
……
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
……

上例中为高阶组件方法hocForm添加了一个能让被封装组件一次性将初始状态更新到高阶组件的state中的方法; 并且为这个组件设置了一个默认为false的标识符hasInit, 当initState方法执行过一遍后就将其置true, 因为initState方法是在其子组件的componentWillReceiveProps函数中执行的, 如果不根据标志判断每次initState方法被调用时都执行一遍setState就会形成死循环;


修改bossinfo.js;
……
@connect(
  state=>state.user,
  {update, errorMsg}
)
@hocForm
class BossInfo extends React.Component{
  constructor(props){
    super(props)
    // this.state = {
    //  title:'',
    //  company:'',
    //  money:'',
    //  desc:''
    // }

    //初始化高阶组件的state
    if(this.props.user){
      const iState = {avatar:this.props.avatar, title:this.props.title, company:this.props.company, money:this.props.money, desc:this.props.desc}
      this.props.initState(iState)
    }
  }
  componentWillReceiveProps(newProps){
    //初始化高阶组件的state
    if(!newProps.state.hasInit){
      const iState = {avatar:newProps.avatar, title:newProps.title, company:newProps.company, money:newProps.money, desc:newProps.desc}
      this.props.initState(iState)
    }
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo

    return (
      <div>
        {redirect&&redirect!==path&&redirect!=='/boss'&&redirect!=='/genius'?
          <Redirect to={this.props.redirectTo}/>
          :(redirect=='/genius'?<Redirect to='/geniusinfo'/>:null)
        }

        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
        <AvatarSelector
          errorMsg={this.props.errorMsg}
          initAvatar = {this.props.state.avatar}
          selectAvatar={(imgname)=>{
            this.props.handleChange('avatar', imgname)
          }}
        ></AvatarSelector> 
        <InputItem onChange={(v)=>this.props.handleChange('title',v)} value={this.props.state.title}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v)=>this.props.handleChange('company',v)} value={this.props.state.company}>
          公司名称
        </InputItem>
        <InputItem onChange={(v)=>this.props.handleChange('money',v)} value={this.props.state.money}>
          职位薪资
        </InputItem>
        <TextareaItem 
          onChange={(v)=>this.props.handleChange('desc',v)}
          rows={3}
          autoHeight
          title='职位要求'
          value={this.props.state.desc}
        >
        </TextareaItem>
        <Button 
          onClick={()=>{
            this.props.update(this.props.state)
          }}
          type='primary'>提交</Button>
      </div>
    )
  }

}
……


修改geniusinfo.js;
……
@connect(
  state=>state.user,
  {update, errorMsg}
)
@hocForm
class GeniusInfo extends React.Component{
  constructor(props){
    super(props)
    // this.state = {
    //  title:'',
    //  desc:''
    // }

    //初始化高阶组件的state
    if(this.props.user){
      const iState = {avatar:this.props.avatar, title:this.props.title, desc:this.props.desc}
      this.props.initState(iState)
    }
  }
  componentWillReceiveProps(newProps){
    //初始化高阶组件的state
    if(!newProps.state.hasInit){
      const iState = {avatar:newProps.avatar, title:newProps.title, desc:newProps.desc}
      this.props.initState(iState)
    }
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo

    return (
      <div>
        {redirect&&redirect!==path&&redirect!=='/genius'&&redirect!=='/boss'?
          <Redirect to={this.props.redirectTo}/>
          :(redirect=='/boss'?<Redirect to='/bossinfo' />:null)
        }

        <NavBar mode="dark">牛人完善信息页面</NavBar>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
        <AvatarSelector
          errorMsg={this.props.errorMsg}
          initAvatar = {this.props.state.avatar}
          selectAvatar={(imgname)=>{
            this.props.handleChange('avatar',imgname)}}
        ></AvatarSelector> 
        <InputItem onChange={(v)=>this.props.handleChange('title',v)} value={this.props.state.title}>
          求职岗位
        </InputItem>
        <TextareaItem 
          onChange={(v)=>this.props.handleChange('desc',v)}
          rows={3}
          autoHeight
          title='个人简介'
          value={this.props.state.desc}
        >
        </TextareaItem>
        <Button 
          onClick={()=>{
            this.props.update(this.props.state)
          }}
          type='primary'>提交</Button>
      </div>
    )
  }

}
……


上例中可以发现, 在geniusinfo和bossinfo组件的constructor方法和componentWillReceiveProps方法中都有使用initState来初始化高阶组件的state的方法, 其实它们分别在两种情况下作用:

<1>用户直接访问geniusinfo/bossinfo页面, 此时高阶组件以及geniusinfo和bossinfo组件的constructor方法中其实获取不到任何有效的props属性, 因为AuthRoute组件在componentDidMount方法执行时才会去获取并更新登录用户信息到redux中, 那么也就是说当redux被更新后, 高阶组件将被update, 重新执行render方法, 从而将redux中更新的用户信息依靠:
    render(){
      return <Comp handleChange={this.handleChange} initState={this.initState} state={this.state} {...this.props}></Comp>
    }

传递给子组件bossinfo/geniusinfo, 接着就会触发这两个组件的componentWillReceiveProps(这里选择使用这个钩子函数是为了保证只在高阶组件更新后引发的子组件更新中来使用initState方法更新高阶组件的state, 而不会在子组件本身因为某些原因被update时使用initState方法), 在componentWillReceiveProps方法中此时已经可以通过传入参数newProps来获取默认应该显示在信息完善页面中的用户信息了, 接着就将这些信息更新到高阶组件的state中以保持高阶组件state中各种用户信息属性与bossinfo/geniusinfo组件中对应输入框内容的统一性; 而又由于之前在高阶组件在设置了hasInit标识符, 所以这里不会发生死循环的情况;
显然在通过initState方法将初始用户信息更新到高阶组件的state后会引发高阶组件以及其子组件的一次更新, 这次更新中就会将子组件的this.props.state中对应的用户属性依次做为用户完善信息页面中各个输入框的value属性, 这样就保持了输入/输出端数据的统一, 之后提交的数据就不会有问题了;
对于AvatarSelector组件, 这里传入了一个initAvatar属性, 为了让它能够显示一个初始的用户头像:

修改avatar-selector.js;
……
  componentWillReceiveProps(nextProp){
    if(nextProp.initAvatar)
      this.setState({text:nextProp.initAvatar,icon:require(`../img/${nextProp.initAvatar}.png`)})
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
……

需要注意的是, 这里在AvatarSelector组件的componentWillReceiveProps钩子函数中使用setState方法来放入初始头像, 这点非常关键, 因为componentWillReceiveProps方法是唯一能够在其内部更改当前组件state而不会引发死循环的生命周期方法;


很显然, 这上面所介绍的这种访问用户完善信息页面的方式中, 在geniusinfo和bossinfo组件的constructor方法里无须使用initState方法来更新高阶组件state, 如果使用了反而会扰乱对其更新的效果, 因为constructor中根本拿不到任何有效信息, 执行的initState更新的都是空值, 所以这里使用了this.props.user是否存在这个判断条件来屏蔽了它的执行;


<2>当用户通过个人中心页面点击修改个人信息而跳转到bossinfo/geniusinfo时, 用户的所有信息早已在redux中存在了, 而且此时通过路由跳转引发的组件重新加载只会触发bossinfo/geniusinfo的constructor方法, 并不会触发componentWillReceiveProps函数(因为在加载过程中没有任何组件的state或者redux发生更新),
所以就需要在constructor方法中使用initState将redux中最新的用户信息更新到高阶组件的state中, 从而根据这些用户的初始信息重新渲染页面, 达到输入和输出端内容的统一性; 
很显然, 在这种情况下constructor中的this.props.user判断条件将会通过, 同时componentWillReceiveProps函数中的判断条件: !newProps.state.hasInit将不会通过(因为高阶组件的hasInit已经在constructor中的initState执行时被置true), 所以不会在其中再次执行initState方法;



(7)用户在chat页面聊天时, 可能在输入框输入了一些内容但是并未发送, 此时如果离开chat页面后再返回, 之前输入但是没有发送的内容就不存在了, 这里将添加用户聊天消息草稿保存的功能(保存时长为本次应用的生命周期);

修改chat.redux.js;
……
//保存用户在聊天窗口未发送的消息
const MSG_SAVE = 'MSG_SAVE'
const initState = {
  chatmsg:[],
  unread:0,
  users:{},
  listenerset:false,
  chatdraft:{}
}
……
    case MSG_SAVE:
      const {to, chatDraft} = action.payload
      return {...state, chatdraft:{...state.chatdraft, [to]:chatDraft}}
……
export function saveDraftMsg(to, chatDraft){
  return {type:MSG_SAVE, payload:{to, chatDraft}}
}
……


修改chat.js;
……
import {getMsgList, sendMsg, recvMsg, listenerSet, readMsg, saveDraftMsg} from '../../redux/chat.redux'
……
@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg, listenerSet, readMsg, saveDraftMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text:'',
      showEmoji:false
    }
    const msgDraft = this.props.chat.chatdraft[this.props.match.params.user]
    if(msgDraft)
      this.state.text = msgDraft
  }
……
  componentWillUnmount(){
    const to = this.props.match.params.user
    this.props.readMsg(to)
    //聊天输入框未发送消息草稿保存
    const chatDraft = this.state.text
    this.props.saveDraftMsg(to, chatDraft)
  }
……


上例中, 在chat.redux.js中添加了用来保存用户草稿消息的action creator方法: saveDraftMsg, 在redux的state.chat中新建了一个chatdraft对象属性, 用来以key/value的形式保存当前用户与其他聊天用户的草稿消息; 当saveDraftMsg被执行时一个type为MSG_SAVE的action被发出, 通过reducer方法后state.chat.chatdraft中的相关键值对被更新;
在chat.js中, 当Chat组件的componentWillUnmount函数执行时(用户离开chat页面时)会将当前页面中消息输入框中的内容通过saveDraftMsg方法更新到redux的state.chat.chatdraft对象中, 之后当用户再进入chat页面后(通过其他页面跳转, 而非直接访问chat页面或刷新chat页面), 其constructor方法会执行, 又由于当前redux的信息已经都是最新的了, 所以可以直接将redux中state.chat.chatdraft对象里key为当前聊天用户_id的草稿消息取出更新到组件初始的state.text中, 于是chat组件的render执行, 在页面中渲染后输入框中会默认显示当前用户之前还未发送给聊天对象的草稿消息;

很显然, 目前这项保存用户草稿消息的功能只在当前应用执行阶段有效, 也就是说当用户重启应用(刷新页面)后由于redux中内容都会清空, 所以不会再保存之前的草稿消息, 如果想要让草稿消息持久化, 那就需要改进当前设计:
在saveDraftMsg方法中需要将草稿相关信息(聊天会话chatid和草稿消息内容)发送到服务器并保存到数据库中, 那么数据库的chat集合需要新建立一个字段专门用来保存草稿消息, 当草稿消息在数据库保存完毕后再更新前端redux中state.chat.chatdraft对象;
而在用户来到chat页面时(这里就包括了用户直接访问chat页面或者在chat页面刷新的情况), 不能仅仅使用在constructor方法中设置初始的state.text值的方式来在消息输入框中显示草稿消息了, 而是需要在componentWillReceiveProps钩子函数中判断当: this.props.chat.chatdraft[this.props.match.params.user]存在, 并且当前this.state.text中不存在消息(为了防止已经在constructor中获取了最新的草稿消息并且更新了state的情况)时再去通过this.setState方法更新state.text的值, 然后页面会被重新渲染并且显示最新的草稿消息;
在Chat组件的handleSubmit方法中需要使用: this.props.saveDraftMsg(to,’’)方法将草稿消息置空, 这是考虑到如果用户在发送了消息之后直接关闭应用, 或者重启应用(刷新页面), 此时Chat组件的componentWillUnmount方法是不会再执行的, 也就是说用户之前的草稿消息虽然已经被发送应该清空了, 但是这一清空的步骤并没有被同步到数据库中, 所以之后当用户重新来到chat页面后仍旧会看到输入框中有上一次保存的草稿消息; 

用户genius来到与用户boss的聊天页面并在输入框输入一些内容:

![](./dev_memo_img/138.png)

返回上一个页面:

![](./dev_memo_img/139.png)

重新进入与用户boss的聊天页面, 发现输入框中已经存在之前未发送的消息草稿:

![](./dev_memo_img/140.png)






Redux+React Router+Node.js全栈开发笔记 (三);


……


13.React进阶;

(1)直接写在js中的jsx代码会被Babel通过React.createElement转换为一个ReactElement;

![](./dev_memo_img/141.png)

![](./dev_memo_img/142.png)

也就是说每一个jsx元素都存在一个ReactElement对象来描述它;


(2)react的setState()方法存在队列的机制, 也就是说setState()方法对状态的更新是异步的, 在同一线程中对某个组件state的多次更新最终会被react合并成一次对这个组件生命周期的update:
当组件的this.setState()执行后将一个检查这个组件state变化的异步任务放入事件队列(在此次主线程中多次对这个组件执行setState()方法只会添加一次异步任务), 之后主线程结束, 任务队列中检查这个组件state变化的执行函数被放入主线程执行, 它会去依次执行组件的: shouldComponentUpdate, componentWillUpdate等方法, 需要注意的是, 当componentWillUpdate开始执行时this.state还未被更新, 新的state将作为其第二个参数传入, 当componentWillUpdate方法执行完成后才会将this.state更新, 然后执行render方法…;

相比之下, dispatch(action)对redux的store中内容的更新是同步的, 并且会同步将所有在store上subscribe的组件的处理事件依次执行; 
假设某个组件在store上使用subscribe注册了自己的forceUpdate方法, 当redux的store被更新后, 在store上subscribe的组件处理函数立刻会被遍历出来依次执行, 其中就包括对这个组件的forceUpdate操作,也就是说当这个组件的处理函数被遍历到并执行后, 它会被强制更新, 走它组件更新的生命周期函数, 并最后更新html页面, 这一系列操作(从dispatch(action)被执行到最后html页面更新)都是同步的; 
假设在上面说的这种情况下当这个组件被forceUpdate方法强制更新, 在重新执行render方法时加载并实例化了一个新的子组件, 那么此时会同步执行这个子组件的一系列生命周期方法(如: render方法), 然后继续完成父组件的render方法之后的内容, 直到最后html页面被更新, 如果子组件存在componentDidMount钩子函数, 那么在html页面更新过程中一旦这个子组件被添加到了页面中后就会立刻同步执行componentDidMount钩子函数的内容, 然后继续更新html页面中剩下的部分, 更新完成后这一轮主线程任务才算告一段落, 也就是说, 上述的所有操作也都是同步的;

但是需要特别注意的是, react-redux虽然是完全建立在redux机制上的, 但是它对那些由它管理的, 在store上subscribe的组件有自己的处理方式; 之前提到当store中state值被更新后, redux会同步将所有在store上subscribe的组件的处理事件依次执行, 这点是redux的处理机制, 无法改变, 但是react-redux为其封装组件在store上通过subscribe方法绑定执行函数时会先判断是否需要更新这个组件(主要是判断此组建是否存在同样被redux-react管理的父组件, 如果有就跳过对这个组件的forceUpdate, 这样就可以只对最外层的受管理组件执行forceUpdate, 避免了在一次store的state更新中重复update相同组件的情况), 如果需要更新就会将组件的forceUpdate放在任务队列中, 以异步的形式更新组件; 这种设计思路类似上面提到的react的setState()方法的队列机制, 不同的是dispatch方法对store的state值的更新是实时同步的, 并非异步的; 
react-redux这样设计的好处是, 避免了组件在还未被mount到html之前, 用户在constructor中更新了redux的state而造成的报错: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.
并且能够让用户在componentWillMount中更新redux的state并且在组件被添加到html页面后对所有相关组件进行一次更新; 


关于react的mounted和mounting的概念;

在react中mounted的组件就是那些已经被放入html中, 也就是已经通过了componentDidMount钩子函数的组件;
而mounting这个状态指组件处于componentWillMount和componentDidMount函数之间的状态, 其实就是说明了componentWillMount是属于mounting这个状态的, 在其中可以调用组件的setState, replaceState, or forceUpdate方法;

其实, react允许用户在组件的除了constructor之外的所有其它钩子函数中使用forceUpdate()方法或者setState()方法来更新组件(这里的允许只是不报错, 而用户还需要自己避免在组件更新相关的钩子函数/render方法中使用forceUpdate/setState而造成的死循环, 当然用户可以在这类函数中先判断新/旧state状态再决定是否需要使用forceUpdate/setState); 
而如果用户在constructor中使用forceUpdate/setState就会报错:
Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.

而对于componentWillMount这个钩子函数react做了特殊的处理: 如果在这个函数中用户使用了setState/replaceState/forceUpdate方法, 组件不会被同步/异步更新, 并且在componentWillMount函数执行完后(注意不是在setState/replaceState/forceUpdate方法执行完后)就将当前组件的state更新为replaceState/setState中的传入的state(一般情况下是在componentWillUpdate执行完后更新的);

例子1:

class Logo extends React.Component{
  constructor(){
    super()
    this.state = {test:1}
  }
  componentWillMount(){
    this.setState({test:2})
    console.log(this.state.test) //1
    console.log('will mount')
  }
  componentDidMount(){
    console.log('did mount')
  }
  componentWillUpdate(){
    console.log('will update!')
  }
  componentDidUpdate(){
    console.log('did update!')
  }
  render(){
    console.log(this.state.test) //2
    return null
  }
}

上例中组件加载后在控制台的输出为:

1
will mount
2
did mount


例子2:
使用react-redux在组件的constructor和componentWillMount方法中更新redux的state;

@connect(
  state=>state,
  {test}
)
class Logo extends React.Component{
  constructor(props){
    super(props)
    this.state = {test:1}
    this.props.test()  //这里是一个引入的redux的mapDispatchToProps方法, 它会异步对组件执行forceUpdate; 所以不会报错;
  }
  componentWillMount(){
    console.log(this.state.test)  //1
    //this.props.test()  如果将redux的mapDispatchToProps方法在这里执行, 最后控制台输出相同;
    console.log('will mount')
  }
  componentDidMount(){
    console.log('did mount')
  }
  componentWillUpdate(){
    console.log('will update!')
  }
  componentDidUpdate(){
    console.log('did update!')
  }
  render(){
    console.log(this.state.test)  //1
    return (
      <div className="logo-container">
        <img src={logoImg} alt=""/>
      </div>
    )
  }
}

上例中组件加载后在控制台的输出为:

1
will mount
1
did mount
will update!
1
did update!

所以react-redux的异步更新组件机制能够很好的与react配合使用, 还能避免报错;


补充
1.setState和replaceState区别;

参考:
https://blog.csdn.net/u013510838/article/details/59486772


(3)对redux的createStore函数的简单实现;

export function createStore(reducer, iniState){

  let currentState = iniState?iniState:{}
  let currentListeners = []

  function getState(){
    return currentState
  }

  function subscribe(listener){
    currentListeners.push(listener)
  }

  function dispatch(action){
    currentState = reducer(currentState, action)
    currentListeners.forEach(v=>v())
    return action
  }

  if(!iniState)
    dispatch({type:'@@redux/INIT'})

  return {getState, subscribe, dispatch}
}

关于createStore方法的第二个和第三个参数的作用, 可以参考Redux笔记中: 
'11.Store 的实现；' 和 ’16.中间件的用法;’ 相关内容;


(4)对react-redux的Provider组件的简单实现;

import PropTypes from 'prop-types'

export class Provider extends React.Component{
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext(){
    return {store:this.store}
  }
  constructor(props, context){
    super(props, context)
    this.store = props.store
  }
  render(){
    return this.props.children
  }
}


(5)对react-redux的connect方法的简单实现;

import PropTypes from 'prop-types'

function bindActionCreator1(creator, dispatch){
  return (...args)=> dispatch(creator(...args)) 
}

function bindActionCreator2(creator, dispatch, getState){
  return (...args)=> creator(...args)(dispatch, getState) 
}

function bindActionCreators(creators, dispatch, getState){
  //let bound = {}
  //Object.keys(creators).forEach(v=>{
  //   let creator = creators[v]
     //根据connect方法的机制, creator可以是一个返回对象的函数, 也可以是一个返回函数的函数, 这里需要分情况
  //   if(typeof creator() == 'function'){
  //    bound[v] = bindActionCreator2(creator, dispatch, getState)
  //   }else{
  //    bound[v] = bindActionCreator1(creator, dispatch)
  //   }
  //})
  //return bound

  //上面的代码可以使用下面的reduce方法来改造替换
  return Object.keys(creators).reduce((bound, creatorName)=>{
     //根据connect方法的机制, creator可以是一个返回对象的函数, 也可以是一个返回函数的函数, 这里需要分情况
     let creator = creators[creatorName]
     if(typeof creator() == 'function'){
      bound[creatorName] = bindActionCreator2(creator, dispatch, getState)
     }else{
      bound[creatorName] = bindActionCreator1(creator, dispatch)
     }
     return bound
  },{})
  
}

export const connect = (mapStateToProps=state=>state, mapDispatchToProps={})=>(wrapComponent)=>{
  return class ConnectComponent extends React.Component{

    static contextTypes = {
      store:PropTypes.object
    }

    constructor(props, context){
      super(props, context)
      this.unsubscribe = null
    }

    componentDidMount(){
      this.unsubscribe = store.subscribe(()=>this.forceUpdate())
    }

    componentWillUnmount(){
      this.unsubscribe()
    }

    render(){
      const {store} = this.context
      const stateProps = mapStateToProps(store.getState())
      const dispatchPops = bindActionCreators(mapDispatchToProps, store.dispatch, store.getState)

      return <wrapComponent {...this.props} {...stateProps} {...dispatchPops}></wrapComponent>
    }
  }
}


(6)redux的applyMiddleware方法的简单实现;

由于applyMiddleware方法需要做为参数传入createStore方法中, 这里需要改造createStore方法;

export function createStore(reducer, iniState, enhancer){
  
  if(typeof iniState == 'function'){
    enhancer = iniState
    iniState = undefined
  }

  if(enhancer){
    return enhancer(createStore)(reducer,iniState)
  }

  let currentState = iniState?iniState:{}
  let currentListeners = []

  function getState(){
    return currentState
  }

  function subscribe(listener){
    currentListeners.push(listener)
    return function(){
      currentListeners.splice(currentListeners.indexOf(listener),1)
    }
  }

  function dispatch(action){
    currentState = reducer(currentState, action)
    currentListeners.forEach(v=>v())
    return action
  }

  if(!iniState)
    dispatch({type:'@@redux/INIT'})

  return {getState, subscribe, dispatch}
}

上例中, 一开始对参数iniState的判断是为了确保当用户只传入两个参数, 但是第二个参数其实是传入了一个enhancer(相当于跳过了iniState参数的传入)的情况下能够正确执行函数;
需要注意的是, 如果在严格模式下无法更改函数传入的参数变量, 那么可以在一开始为每个参数创建一个临时变量来保存变更后的参数值, 之后对函数参数的使用都改为使用对应的临时参数变量;


applyMiddleware方法的简单实现:

export applyMiddleware(middlewares)=>(createStore)=>{
  return (...args)=>{
    const store = createStore(...args)
    let dispatch = store.dispatch

    let chain = []
    const midApi = {
       getState:store.getState,
       dispatch:(...args)=>dispatch(...args)
    }

    chain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

关于Redux的原生方法applyMiddleware的源码的简写形式, 还可以参考Redux笔记中: ’17. applyMiddleware();’ 相关内容;


(7)thunk中间件的简单实现;

const thunk = ({dispatch,getState})=>next=>action=>{
  //action是函数的情况, 将dispatch和getState做为参数传入这个函数
  if(typeof action=='function'){
    return action(dispatch, getState)
  }
  //如果action不是函数, 则将action传入下一个中间件生成的dispatch方法
  return next(action)
}


(8)多个中间件的合并机制;

为了更好理解当applyMiddleware方法合并了多个中间件后, 它们是如何链式地处理传入的action对象的, 这里将compose方法执行的效果拆分来观察:

首先, store.dispatch将被传入chain数组中的最后一个函数, 也就是相当于执行了: middleware1(midApi)(store.dispatch), 执行后返回的其实是以下这个函数:
action=>{
  if(typeof action=='function'){
    return action(dispatch, getState)
  }
  return store.dispatch(action)
}

这里需要特别注意的是, 在applyMiddleware中之所以使用: dispatch:(...args)=>dispatch(...args) 这样的方式来将dispatch方法传入每个middleware中保存, 是因为由于在当前applyMiddleware方法中设置了 let dispatch = store.dispatch, 如果使用dispatch: dispatch来赋值, 那就相当于直接把store.dispatch这个原生的dispatch方法保存在了每个middleware中(因为dispatch变量保存的只是一个指向store.dispatch的地址); 而使用dispatch:(...args)=>dispatch(...args) 这样的方式相当于将一个新的匿名函数保存在每个middleware中, 而这个新的函数在每次被执行时会去所在作用域(也就是applyMiddleware函数中)找一个名为dispatch的函数变量并执行, 也就是说匿名函数中的dispatch指向的是其所在作用域中的变量dispatch, 至于这个dispatch变量的值是什么由获取它时决定, 所以上例中: return action(dispatch, getState) 这条语句拿到的dispatch是已经被所有中间件改造过的最新的dispatch方法: dispatch = compose(...chain)(store.dispatch); 

而next是函数middleware1(midApi)()执行时传入的参数, 当然就这里而言传入的是store.dispatch, 是一个初始的未经过变更的dispatch方法(也正因为如此, 它会被做为compose方法返回函数的入口参数, 因为一个不满足所有中间件改造条件的action对象最终应该被原生的dispatch方法来处理)

然后上面的这个返回函数将被做为chain中倒数第二个middleware的next参数传入:

middleware2(midApi)(
  action=>{
    if(typeof action=='function'){
      return action(dispatch, getState)
    }
    return next(action)
  }
)

上面返回的仍旧是一个类似:
action=>{
  if(action......){
    return ......(如果有需要的话, 这里可以随时使用之前存储的dispatch和getState方法)
  }
  return next(action)
}

这样的dispatch方法, 但是这里的next指代的方法已经不是store.dispatch了, 而是之前middleware1返回的改造后的dispatch方法:
action=>{
  if(typeof action=='function'){
    return action(dispatch, getState)
  }
  return store.dispatch(action)
}

也就是说, 当一个action传入经过这两个middleware改造后的dispatch方法时首先将会检查是否满足middleware2改造的dispatch方法中的条件, 如果满足就执行相应操作派发这个action, 如果不满足指定条件就去将action传入middleware1改造后的dispatch方法进行判断, 如果满足条件就执行相应操作, 不满足就直接使用初始的store.dispatch来派发这个action;

需要特别注意的是, 上例中如果传入的acton对象满足了中间件的判断条件, 那么会执行action(dispatch, getState), 而这里的dispatch其实将会调用经过所有中间件改造的最新的dispatch方法, 也就是说之后被传入此dispatch方法的action对象将会重新走一遍经过各个中间件判断的流程, 只有当所有中间件的判断条件都不满足时才能够被原生的dispatch方法派发出去;

进一步说, 通过compose方法最终返回的dispatch方法的机制是:
假设chain中按顺序存放了[middleware1(midApi),middleware2(midApi),middleware3(midApi)...], 那么经过compose(...chain)(store.dispatch)处理后返回一个最终的dispatch方法, 这个方法接收一个action时会先检查它是否满足middleware1返回的改造后的dispatch方法中的指定条件, 如果满足就执行相应内容并将action重新传入改造后的最新dispatch方法进行一轮中间件的过滤(有点类似递归对action进行操作, 因为一个action很可能在被某个middleware处理之后, 又满足了其它middleware的处理条件, 如: 类型为数组的action被某个middleware处理后其中每个元素都被当成新的action来dispatch, 而这些新的action又同时是函数而不是对象, 所以需要thunk中间的处理, 这种情况下就需要将经过处理后的action重新放入经过中间件改造的dispatch方法中再次被每个middleware过滤处理直到它被传递到thunk中间件的dispatch方法后才能被正确处理, 这也同时说明了applyMiddleware方法中的多个middleware参数的传入顺序并不重要), 如果不满足就将action对象传递给middleware2返回的改造后的dispatch方法, 如果还是不满足这个dispatch方法中的指定条件, 就将action继续传递给middleware3返回的改造后的dispatch方法......

其实简单来说中间件改造后的dispatch方法相比原生方法只是多了一层判断条件, 根据传入action的不同情况来做一些定制的处理, 在同时存在多个中间件时如果当前中间件不适用于处理此次传入的action对象, 就会将它传递给下一个中间件改造的dispatch方法, 最终如果所有中间件都去不处理传入的action对象时就会使用最初始的原生dispatch方法来派发action;

这也就说明了next参数存在的重要性, 因为这些中间件需要会链式地保存下一个中间件改造的dispatch方法以便在自身无法处理传入的action时将其交给下一个中间件处理;

<step 1> action 
—> 
<step 2> action=>{ middleware1依靠之前存储的dispatch和getState函数处理并将处理后的action重新传入改造后的dispatch方法进行<step 1> / 如果无法处理就执行 next(action) 进行<step 3>}  
—> 
<step 3> 前一个中间件中的next函数 : action=>{ middleware2依靠之前存储的dispatch和getState函数处理并将处理后的action重新传入改造后的dispatch方法进行<step 1> / 如果无法处理就执行 next(action) 进行<step 4>}
—> 
<step 4> 前一个中间件中的next函数 : action=>{ middleware3依靠之前存储的dispatch和getState函数处理并将处理后的action重新传入改造后的dispatch方法进行<step 1> / 如果无法处理就执行 next(action) 进行<step 5>}
—> 
<step 5> …
—> 
<step final> 最后一个中间件中的next函数 : store.dispatch(action)

上面所介绍的这种中间件的处理方式其实结合了: 闭包, 柯里化(currying), compose函数这些特性, 其中比较关键的是在中间件生成改造后的dispatch方法这一过程中采用的柯里化特性; 
在一个middleware函数最终返回改造后的dispatch方法之前先要通过柯里化和闭包特性来获取并保存足够多的有用信息, 所以先要求传入{dispatch,getState}对象以保存中间件改造后的最新dispatch, 原生getState方法(提前返回), 再要求传入next函数保存, 以便之后链式传递action对象, 最后才返回一个接受action对象的dispatch方法(延迟计算), 也就是说, currying的提前返回和延迟计算这两个特性都在此处实现了一定效果;


补充:
1.其实不难发现, 之前在研究react-redux的connect方法原理的时候提到了它所接受的mapDispatchToProps参数可以有两种形式, 一种最终返回一个action对象, 另一种最终返回一个接收dispatch和getState为参数的函数, 这其实就与thunk中间件处理action对象的方式相同, 也就是说, react-redux的connect方法是自带thunk中间件处理机制的, 可以根据mapDispatchToProps参数的不同情况来选择如何派发action对象; 

2.柯里化（Currying）,又称部分求值(Partial Evaluation), 是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数的新函数的技术; 

柯里化的作用:

<1>参数复用;

例子:
function plus(num) {
        var _args = [];
        var _adder = function(num) {
            _args.push(num)
            return _adder;
        };

        _adder.toString = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }

        return _adder(num);
}

plus(1)(2)(3).toString() //6;


<2>提前返回;

例子:
var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();

上例中, 初始addEvent的执行其实值实现了部分的应用（只有一次的if...else if...判定），而剩余的参数应用都是其返回函数实现的，典型的柯里化; 


<3>延迟计算;

ES5中的bind方法, 用来改变Function执行时候的上下文(函数主体本身不执行, 与call/apply直接执行并改变不同), 本质上就是延迟执行;

参考:
http://www.zhangxinxu.com/wordpress/2013/02/js-currying/


(9)定制一个中间件: arrThunk;

const arrayThunk = ({dispatch,getState})=>next=>action=>{
  if(Array.isArray(action)){
    return action.forEach(v=>dispatch(v))
  }
  reutrn next(action)
}

export default arrayThunk

需要注意的是, 上例中满足中间件判断条件时的处理语句不能写成: return action.forEach(v=>next(v)), 因为如果传入next方法的action是一个以函数为元素的数组, 而处理函数action的thunk中间件又在arrThunk之前传入了applyMiddleware方法, 那么就会出现最终使用原生的store.dispatch方法处理函数类型的action的情况, 显然会发生问题;



13.React性能优化;

(1)单组件的性能优化;

class Test extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      num:0,
      title:’react’,
      age:28
    }
    //this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.setState({num:this.state.num+1})
  }
  render(){
    return (
      <div>
        <h2>App, state has changed {this.state.num}</h2>
        <button onClick={this.handleClick}>btn1</button>
        <button onClick={this.handleClick.bind(this)}>btn2</button>
        <button onClick={()=>this.handleClick()}>btn3</button>
        <p style={{color:'red'}} name={{one:song}}></p>
        <Demo title={…this.state}></Demo>
        <Demo title={this.state.title} age={this.state.age}></Demo>
      </div>
    )
  }
}

上例中, <button onClick={this.handleClick.bind(this)}>btn2</button>这种绑定点击事件处理函数的方法会造成每次组件render都会重新执行一次bind(this)方法, 从而每次都生成一个新的函数;
<button onClick={()=>this.handleClick()}>btn3</button>这种方式会造成每次组件render都会生成一个新的匿名函数, 不仅影响性能, 并且还有内存泄漏的问题;
所以最好的方式是在组件的constructor中使用: this.handleClick = this.handleClick.bind(this) 这样的方式将this对象绑定在点击事件处理函数上, 之后在render方法中直接使用: <button onClick={this.handleClick}>btn1</button> 绑定方法即可;

其次, 上例中的: <p style={{color:'red'}} name={{one:song}}></p> 这样传递参数的方式显然也存在性能问题, 因为同样会在每次render时创建新的对象{color:'red'} 和 {one:song}, 改进方法同样可以是将这两个对象定义在constructor中, 如:
this.color = {color:’red’}
this.name = {one:song}
……
<p style={this.color} name={this.name}></p>

上例中: <Demo title={…this.state}></Demo> 这样传递多余属性的形式也是不推荐的, 并且Test组件的state很可能会在之后被扩展, 无效属性的传递可能会不可预计; 所以改为按需传递: <Demo title={this.state.title} age={this.state.age}></Demo> 会更好;


(2)使用shouldComponentUpdate钩子函数优化组件;

安装react-addons-perf模块并相应配置后, 报错: 
Uncaught Error: Cannot find module "react-dom/lib/ReactPerf"

![](./dev_memo_img/143.png)


错误原因是:

![](./dev_memo_img/144.png)


参考:
https://stackoverflow.com/questions/46578145/module-not-found-cant-resolve-react-dom-lib-reactperf-in-node-modules-reac

也就是说, React 16开始就不支持 react-addons-perf这个插件了;


所以需要改用Chrome浏览器自带的performance监测工具:

![](./dev_memo_img/145.png)


实际操作后发现, 目前在Chrome浏览器Developer tools的performance选项已经支持对react 16的监测了, 也就是说不添加?react_perf参数也能达到同样的效果;

![](./dev_memo_img/146.png)

补充:
1.查看模块的当前版本号;
使用 npm view 模块名 version 命令来查看该模块在远程仓库的版本号;
使用 npm list 模块名 version 命令来查看模块在当前库中安装的版本号;

![](./dev_memo_img/147.png)


Debugging React performance with React 16 and Chrome Devtools, 可以参考:
https://building.calibreapp.com/debugging-react-performance-with-react-16-and-chrome-devtools-c90698a522ad


例子:
class Test extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      num:0,
      title:''
    }
    this.handleNum = this.handleNum.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
  }
  handleNum(){
    this.setState({num:this.state.num+1})
  }
  handleTitle(){
    this.setState({title:this.state.title+'!'})
  }
  render(){

    return (
      <div>
        <h2>App, state has changed {this.state.num}</h2>
        <button onClick={this.handleNum}>btn1</button>
        <button onClick={this.handleTitle}>btn2</button>
        <Demo title={this.state.title}></Demo>
      </div>
    )
  }
}

class Demo extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.title == this.props.title){
      return false
    }
    return true
  }
  render(){
    return (
      <h2>{this.props.title}</h2>
    )
  }
}

上例中, 当点击btn1按钮时, 由于只改变了Test组件的state, 而没有影响到Demo组件需要render的内容, 所以Demo组件设置的shouldComponentUpdate函数阻止了它将要进行的更新行为; 如果点击btn2按钮, 那么由于传入Demo组件的props.title会发生改变从而影响它render的内容, 所以shouldComponentUpdate函数返回true, 就是让其继续执行更新相关的一系列生命周期方法;

之后会介绍react 16提供的PureComponent组件, 它将会默认重写组件的shouldComponentUpdate方法来判断当前组件是否需要被更新(浅对比当前state/props和待更新的state/props);


(3)immutable.js;


js中对象深度比较的方法:

function compare(origin, target) {
    if (typeof target === 'object')    {
        if (typeof origin !== 'object') return false
        for (let key of Object.keys(target))
            if (!compare(origin[key], target[key])) return false
        return true
    } else return origin === target
}

其实上面这个方法是存在错误的, 因为当target对象的属性个数少于origin对象的属性个数, target对象拥有的所有属性都同时被origin对象拥有, 并且这两个对象中的这些属性都相等, 那么这个方法会返回true, 其实这两个对象属性个数本身就是不同的, 如:
let a = {x:1, y:2}
let b = {x:1, y:2, z:3}
compare(b,a) //true


对上面的方法进行改造:

function compare(origin, target) {
    if (typeof target === 'object' && typeof origin === 'object')    {
  if(Object.keys(target).length !== Object.keys(origin).length) 
    return false
        for (let key of Object.keys(target))
            if (!compare(origin[key], target[key])) return false
        return true
    }else{
  return origin === target
    }
}

但是像上面这种深层递归对比的复杂度较高, 就性能上来说react是不能接受的, 也就是说, 如果不做任何对比直接去更新组件所消耗的性能可能与这种深层递归对比后再判断是否需要更新组件差不多, react考虑到这个原因所以建议使用者在react内部只做浅层比较; 
PureComponent组件创建了默认的shouldComponentUpdate行为, 这个默认的shouldComponentUpdate行为会一一比较props和state中所有的属性, 只有当其中任意一项发生改变时才会进行重绘;

PureComponent的作用及一些使用陷阱, 可以参考:
https://www.jianshu.com/p/33cda0dc316a


安装immutable.js;

npm install immutable —save


引入并使用immutable.js;

例子:
  import {Map,is} from 'immutable'

    let obj = Map({
      name:'song',
      course:Map({name:'song'})
    })

    let obj1 = obj.set('name', 'song1')
    console.log(obj.name) //undefined
    console.log(obj.course) //undefined
    console.log(obj.get('course')) //Map{...}
    console.log(obj.get('course') == obj1.get('course')) //true
    console.log(is(obj.get('course'),obj1.get('course'))) //true
    console.log(obj==obj1) //false

    obj.name = 'song'
    console.log(obj.name) //song
    console.log(obj1.name) //undefined
    console.log(obj1.get('name')) //song1
    console.log(obj1.get('name') == obj.get('name')) //false
    console.log(obj.name == obj.get('name')) //true
    console.log(is(obj.name,obj.get('name'))) //true

    obj1.name2 = 'song3'
    console.log(obj1.get('name2')) //undefined
    let obj2 = obj.set('name','song1')
    console.log(is(obj1,obj2)) //true

    let obj3 = Map({
      name:'song',
      course:Map({name:'song'})
    })
    console.log(is(obj,obj3)) //true
    console.log(is({a:1},{a:1})) //false
    console.log(is(Map({}),Map({}))) //true

    //setIn,updateIn,getIn,clear
    console.log(obj.getIn(['course','name'])) //song
    console.log(obj.get('course').get('name')) //song
    let objx1 = obj.get('course').set('name','songsong')
    let objx2 = obj.getIn(['course']).set('name','songsong')
    let objy = obj.setIn(['course','name'],'songsong')
    let objz = obj.updateIn(['course','name'],v=>'songsong')
    console.log(is(objx1,objx2)) //true
    console.log(is(objx1,objy)) //false
    console.log(is(objy,objz)) //true
    let objx3 = objx1.clear()
    console.log(is(objx1,objx3)) //false
    let objx4 = Map()
    console.log(is(objx4,objx3)) //true


上例中可以发现immutable.js的机制:

对于赋值操作(set), 只有在immutable对象(被immutable.js封装的对象)上使用immutable.js的相关API才能存储一个被immutable.js认可属性值(当然由于immutable机制, 这个赋值操作返回一个新的immutable对象, 赋值其实是在这个新对象上完成的, 已经被创建的immutable对象是无法被改变的), 直接使用obj.xxx=xxx 这样的方式虽然会在这个immutable对象上设置一个名为xxx的属性(这个属性与使用immutablejs的set等赋值方法设置的同名属性是分离的, 各自存在的, 不会互相影响), 但是这个属性不会参与任何与immutable.js API有关的操作;

对于取值操作(get), 只有在被immutable.js封装的对象上使用immutable.js的相关API才能在immutable对象中取到一个被immutable.js认可的属性值, 而直接在一个immutable对象上使用类似: obj.xxx=xxx这种方式设置的属性无法被immutable.js的相关API获取, 会返回undefined; 同样使用obj.xxx这样的方式也无法取到一个被immutable.js认可的属性值, 返回undefined;

对于对比操作(is), 由于immutable.js采用了对比immutable对象数据结构的hashcode来比较两个immutable对象的方式, 所以效率非常高, 并且只要是属性结构与属性值相同的immutable对象, 无论声明多少个, 它们使用is方法对比的结果一定是相等的, 而使用’==’对比的结果一定是不相等的; 
使用obj.xxx=xxx这种方式在immutable对象上设置的属性会被is方法直接忽略;

如果使用is方法比较两个非immutable.js封装的对象(或者一个是immutable对象, 另一个不是), 那么就相当于使用’===’来对比它们;


关于setIn,updateIn,getIn方法, 需要注意的是:

obj.get('course').set('name','songsong')
obj.getIn(['course']).set('name','songsong')

这两个操作返回的是一个新的immutable对象, 它们的结构对应的是obj中的course对象而不是obj对象, 如果想要对一个immutable对象的深层对象属性进行更新同时想要返回这个immutable对象本身结构的一个新immutable对象就需要使用setIn或者updateIn方法;


immutable.js优点:

<1>减少内存使用; 
因为immutable.js只为此次变更相关的所有属性开辟新的内存空间, 在对新生成的immutable对象中的这些新创建属性的访问会去这块内存中取值, 其它无关属性将仍旧复用之前immutable对象中对应的值, 所以并不会深拷贝这些属性到新的immutable对象, 而是直接指向之前已经保存的属性;

Immutable 使用了 Structural Sharing（结构共享）, 即如果对象树中一个节点发生变化, 只修改这个节点和受它影响的所有祖先节点, 其它节点则进行共享:

![](./dev_memo_img/148.png)


上例的整个节点树可以视为一个immutable对象, 其中根节点是immutable对象本身, 子节点代表其下的属性, 而属性本身可以是引用类型的(也可以是普通类型的值), 所以可以通过指定自己的属性延伸出其它分支:

immutable1: 
{
  x1:{
    y1:1, y2:2, y3:3
  },
  x2:{
    y1:{
      z1:1
    }
  }
}

如果更新上例中的immutable1.x2.y1属性:

immutable1.setIn([‘x2’,’y1’],Map({z1:1}))

那么immutable1到immutable2对象的变更详情为下图所示:

![](./dev_memo_img/149.png)

可以发现, 其实只有immutable2的x2分支中的y1节点发生了变更(为其重新赋值了一个Map({z1:1})对象), 但是连带需要改变的是它所有的父节点(这里的改变指的是内存空间地址发生了改变, 因为需要为这些节点新创建内存空间); 
也就是说, 变更后的immutable2对象:

Map({x1:指向immutable1对象对应结构中的内容, x2:Map{(
    y1:Map({z1:1})
  )}
})

其中immutable2.x1属性中的所有内容都复用了immutable1中的相应内容, 无须创建新的内存空间, 获取时将直接访问immutable1中保存的x1属性相关内容;


<2>并发安全, 无须担心某个被操作数据同时也在被其他用户修改(多个用户其实各自都在修改对原始数据深拷贝获得的自己独有的数据), 但是由于JS目前还是单线程的, 所以暂时没有享受到这个特性带来的优势
<3>降低项目复杂度, 因为避免了对mutable对象的误操作而带来的连锁反应, 并且无须自行在每次更新一个对象时先深拷贝这个对象
<4>便于比较复杂数据, 定制shouldComponentUpdate更方便, immutable使用数据结构的hash值来进行对比, 所以复杂度很低; 
<5>时间旅行功能
<6>函数式编程, 由于其不可变性, 对纯函数的支持较好(函数式编程要求不能更改传入参数本身, 只能读取这个参数, 并且返回相应的固定输出)


react配合immutable.js使用;

React建议把this.state设置为immutable的(防止发生误操作直接在this.state上修改), 因此修改前需要做一个deepCopy, 比较麻烦:

import '_' from 'lodash';

const Component = React.createClass({
  getInitialState() {
    return {
      data: { times: 0 }
    }
  },
  handleAdd() {
    let data = _.cloneDeep(this.state.data);
    data.times = data.times + 1;
    this.setState({ data: data });
    // 如果上面不做 cloneDeep，而将let data赋值为this.state.data, 那么下面打印的结果会是已经加 1 后的值;
    console.log(this.state.data.times); 
  }
}


使用 Immutable 后: 

  getInitialState() {
    return {
      data: Map({ times: 0 })
    }
  },
  handleAdd() {
    this.setState({ data: this.state.data.update('times', v => v + 1) });
    // 这时的 times 并不会改变
    console.log(this.state.data.get('times'));
  }

对于react而言(其setState方法的执行一定会在之后触发一系列组件更新相关的生命周期函数, 这里经过测试发现react并不会去比较通过setState方法变更后组件的state与之前组件的state有何不同), 由于在生命周期函数: shouldComponentUpdate等方法中需要传入组件的state即将被更新为的值(nextState), 所以相当于react需要同时保存新/旧两份state值, 只有在componentWillUpdate执行完毕后更新后的state值才会被赋值到当前的state上(当然此时最新的props属性也会被更新到当前的this.props中), 这也就说明了为什么react需要使用setState方法来更新组件的state, 而不是直接在state上修改, 当然更多的原因还和其异步更新state的机制有关;  
那么immutable.js配合react来使用首先是为了防止用户在setState阶段发生误操作直接对this.state进行修改, 其次在shouldComponentUpdate方法中可以使用immutable.js特有的高性能深层对比方法来比较新/旧两个state对象(不过先要保证这两个state对象是被immutablejs封装过得);

不过现在存在的react配合immutable.js使用的问题是: 
根据之前对immutable.js使用机制的研究, 如果将react的state都设置为immutable对象, 那么首先要保证应用中所有对this.state的取值都要使用相关的immutable.js的API, 其次, 由于react的setState方法本身存在这样一个机制: 如果使用setState方法传递的对象中仅仅包含当前组件state中某个或某些属性的更新, 甚至是当前组件state中还没有指定的属性, 那么react就会选择性的只更新setState方法中传递的对象中的那些属性而保留所有当前已经存在的其它属性, 相当于使用了类似: Object.assign({},this.state,newState) 这样的方式来构造组件的新state, 那么问题就是如果react组件的state对象现在都改为了immutable对象, 那么这一操作它如何来实现呢?


redux配合immutable.js使用;

redux中沿用了flux的设计(但是它简化了Flux中多个Store的概念, 只存在一个 Store), 需要为每一次state状态的改变保存一份历史记录(这样的设计思路可以很好的实现历史数据变更的记录和检查, 时间旅行等功能, 并且也是实现在chrome浏览器控制台中使用支持redux的插件来监控每一次state变化的基础), 所以需要用户遵循immutable的方式来完成state的更新: 每一次更新state不会去更改当前的state本身, 而是生成一个包含了变更后属性的新state对象, 也就是说每一次dispatch(action)将action传入reducer方法后都将返回一个新的state对象做为当前redux的state, 而不能直接在当前的state对象上做修改, 因为每次传入reducer方法的第一个参数是当前的state对象(或者是state对象中的某个指定分支属性, 它同样也是一个对象), 为了保持每次的state改变而生成的历史记录都是唯一的, 并且新state的产生不会影响旧的state的内容, 那就不能对当前传入的这个state对象进行操作, 而又因为state中存储的属性很可能是引用类型的, 如果用户不小心修改了引用类型属性中的值, 那么将造成连锁反应, 也就是之前所有保存的state历史记录中相关属性中的值都同时变更了, 所以在reducer方法(纯函数)中需要做的是不对传入当前state做任何修改, 只读取其中需要的值来创建一个新state的快照并返回, 很显然在这种情况下为了不让用户发生误操作改变当前state对象, 可以配合immutablejs使用: 将reducer中返回的新state对象设置为immutable对象, 这样的话, 传入reducer方法中的当前state对象也是immutable对象, 就不会发生之前提到的误操作了; 

由于redux本身不会在reducer方法执行并返回新state对象后来对比新/旧state对象, 也就是说, 只要是subscribe在store对象上的执行函数一定会立刻执行, 一般情况下这些执行函数都是用来update组件的, 而又因为无论是在组件的shouldComponentUpdate还是componentWillUpdate方法中都无法取得redux的state对象变更前的历史记录(只能获取当前最新的redux的state, 因为reducer方法执行后redux的state就立刻被更新了), 所以就需要在这个传入store.subscribe方法的执行函数中来判断组件是否需要被更新(相当于起到了shouldComponentUpdate的作用), 最好的做法(有可能也是react-redux所采用的做法, 有待核实)就是当组件在store上绑定subscribe方法时使用类似:

componentDidMount(){
  let lastState = this.context.store.getState()
  this.unsubscribe = this.context.store.subscribe(
    ()=>{
      const currentState = this.context.store.getState()
      const result = … //此处深度比较lastState和currentState;
      if(!result){
        lastState = currentState
         this.forceUpdate()
      }
    }
  )
}

这样的方式来实现某个监听redux中state变化的组件在深层对比了新/旧state(当然可以只对比state中某个与当前组件render相关的属性)的变化后决定是否需要update这个组件;
很显然, 如果使用了immutablejs配合redux使用, 那么这里在componentDidMount方法中获取到的redux的state都应该是immutable对象, 于是使用immutable.js的is方法就能更高效的完成深度比较了; 


参考:

immutable.js解析(重要):
https://github.com/camsong/blog/issues/3

immutable.js常用API简介:
https://segmentfault.com/a/1190000010676878

关于immutable.js的官方资料可以参考:
http://facebook.github.io/immutable-js/docs/#/Map (官方API)
https://github.com/facebook/immutable-js/ (官方Github)

另外, 由于immutable.js本身比较庞大, 如果想要使用只包含核心功能的轻量级库(seamless-immutable), 参考:
https://github.com/rtfeldman/seamless-immutable (官方Github)


(4)使用reselect优化redux选择器;

selector是一个简单的Redux库;
selector提供一个函数createSelector(接受一个input-selectors和一个计算函数作为参数)来创建一个记忆selectors; 如果传入selectors的state发生改变造成input-selector的值发生改变, selectors会依据input-selector返回值做参数调用计算函数, 计算函数返回一个计算结果并在缓存中记录; 如果input-selector返回的结果和之前记录过的相同,那么就会直接返回记录中的对应数据, 省去了对计算函数的调用; 


安装reselect;

$npm install reselect --save


使用reselect;

例子1:

import { createSelector } from 'reselect'

const numSelector = createSelector(
  state=>state.test.num,
   //第一个函数的返回值是第二个函数的参数
  num=>({num:num*2})
)

@connect(
  state=>numSelector(state),
  {……}
)

上例中使用createSelector方法生成了一个新的selectors函数, 使用这个函数将当前react-redux的mapStateToProps函数返回的state进行封装后就能返回经过一系列自定义复杂计算后的最终希望组件通过this.props属性获取的值, 并且这个计算结果会被加入缓存, 也就是说如果下次这个selectors函数发现接收到的state.test.num已经被记录过, 就会立刻返回缓存的结果, 不再使用计算函数;


例子2:

import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector( 
  [ getVisibilityFilter, getTodos ], 
  (visibilityFilter, todos) => { 
    switch (visibilityFilter) { 
      case 'SHOW_ALL': 
        return todos 
      case 'SHOW_COMPLETED': 
        return todos.filter(t => t.completed) 
      case 'SHOW_ACTIVE': 
        return todos.filter(t => !t.completed)
 } } )

上例中, createSelector函数的第一个参数传入了数组, 那么它的第二个参数函数将会接收若干个数组函数元素的返回结果作为它的参数, 如果state.todos或state.visibilityFilter发生变化就会重新通过计算函数返回最终的值, 如果是发生在state其他部分的变化就不会重新计算而直接获取之前缓存的值; 

所以总的来说, reselect主要就是用来缓存: 从redux获得的最新state中的指定属性通过复杂计算获得的组件渲染页面需要用到的最终数据这一过程中产生的所有不同输入/输出结果的, 对于那些需要使用来回反复变化的state中数据的组件来说能够减少性能消耗, 提升响应速度;
不过需要注意的是, reselect到底是如何判断输入的内容(input-selector中返回的内容)是否已经在缓存中了呢, 它是用深层对比的方式来进行查找吗? 那如果redux使用了immutable.js的支持, 那么输入的内容很可能是一个immutable对象, 那它又如何来对比呢? 这点有待核实; 

参考:
https://github.com/reactjs/reselect (官方github)
https://www.jianshu.com/p/6e38c66366cd (重要)


(5)React中对元素设置key属性时的注意点;

例子:
……
this.state={
  users:[‘hello’,’world’,’!!!’]
}
……
<ul>
  {this.state.users.map((v,i)=><li key={i}>{v}</li>)}
</ul>

上例中这种将数组索引值设置为生成元素的key值其实作用仅仅是消除了控制台的警告, 并没有提高react virtual dom对比和更新的效率, 原因是:
如果在一次setState方法中state的users属性被更新为了: users:[‘test’,‘hello’,’world’,’!!!’], 那么虚拟树对比这些<li>元素时就会出现这样的情况:

之前的virtual dom:

<li key=0>hello</li>
<li key=1>world</li>
<li key=2>!!!</li>


更新后的virtual dom:

<li key=0>test</li>
<li key=1>hello</li>
<li key=2>world</li>
<li key=3>!!!</li>

react会默认将key相等的元素进行对比(如果没有key或没有相等的key属性就只能逐个按对应顺序对比: 第一个和第一个对比, 第二个和第二个对比…), 检查出的相同元素越多, 最终对dom元素的操作就越少(其实react对比virtual dom的算法还是比较复杂的, 但是只要能够让最终在html页面上的dom操作降低, 复杂对比计算还是值得的, 因为在html上操作dom非常耗费资源), 上例中这种情况由于每次对比相同key的元素结果都不同(通过key属性比较virtual dom主要是为了减少在同级中插入,删除或移动元素这种变化带来的dom操作, 如果没有这类变化, 那么效率就相当于是横向逐一对比), 所以最终会重新将所有<li>元素更新一遍, 而如果上例改为:
 ……
<ul>
  {this.state.users.map((v,i)=><li key={v}>{v}</li>)}
</ul>

由于state.users数组中每个元素的内容都不相同, 所以用它作为<li>元素的key属性能使每个<li>元素具有唯一性, 这种情况下虚拟树对比这些<li>元素就会是这种情况:

之前的virtual dom:

<li key=‘hello’>hello</li>
<li key=‘world’>world</li>
<li key=‘!!!’>!!!</li>


更新后的virtual dom:

<li key=‘test’>test</li>
<li key=‘hello’>hello</li>
<li key=‘world’>world</li>
<li key=‘!!!’>!!!</li>

当react对比key相同的<li>元素后发现它们都是相同的, 而只有key为’test’的元素是新增插入的, 所以最终对元素的操作就只有一项: 在key为’hello’的<li>元素前插入一个: <li key=‘test’>test</li> 元素, 这样在react更新html页面时的效率就提高了;


对react virtual dom对比算法的推测:

使用key属性的最大优势是可以定位指定元素改变前后处于这个层级元素中的具体位置(以这个位置作为参照就能很方便地新增/删除/移动元素了), 并且可以根据key属性来对应更新元素;

假设在同一层级中存在100个元素, 这里分别来推测react根据key属性处理新增/删除/移动元素的对比算法, 以此也能比较其与不使用key属性的算法最终在html页面上对dom的操作有多大差异;


<1>存在新增元素的情况;

旧virtual dom:

<li key=1>1</li>
……
<li key=100>100</li>


新virtual dom:

<li key=0>0</li>
<li key=1>1</li>
……
<li key=100>100!!!</li>

这种情况下react会将旧virtual dom中与新virtual dom中key属性相同的元素进行对比, 对比后记录所有需要被更新的元素, 比如: <li key=100>这个元素的内容需要从100变为100!!!, 这个更新操作将在dom元素的排序操作后(如果有排序操作的话, 这里的排序操作就是指对dom的新增, 删除和移动)根据key属性定位更新;
然后检查新virtual dom中还未被对比过的元素, 上例中是<li key=0>0</li>, 然这些后根据它与之前已经对比过key属性的元素的相对位置, 以这些元素为参照制定html中对dom元素的操作: 上例中是新建一个<li key=0>0</li>元素, 并将其插入<li key=1>1</li>元素之前, 最后修改<li key=100>100</li>元素的内容100->100!!!; 

那如果这个virtual dom的更新过程中没有key属性的协助, 那么react将会按照顺序逐个对比新/旧virtual dom中每一个元素:
<li>1</li>  —>  <li>0</li>
<li>2</li>  —>  <li>1</li>
……
<li>100</li>  —>  <li>99</li>
                      —>  <li>100!!!</li>

那么最后在html上的dom操作有101个步骤; 显然要比使用了key属性的对比算法最终制定的dom操作要冗余太多;


<2>存在删除元素的情况;

旧virtual dom:

<li key=1>1</li>
……
<li key=100>100</li>


新virtual dom:

<li key=2>2</li>
……
<li key=100>100!!!</li>

这种情况下react还是先根据key属性来比较元素, 然后会发现新virtual dom中不存在key=1的元素, 于是就会标记<li key=1>1</li>为需要被删除的元素, 然后继续对比其它的元素… 那么最后通过对比算法react制定的dom操作将会是: 删除<li key=1>1</li>元素, 然后修改<li key=100>100</li>元素的内容100->100!!!;

那如果这个virtual dom的更新过程中没有key属性的协助, 那么react将会按照顺序逐个对比新/旧virtual dom中每一个元素:
<li>1</li>  —>  <li>2</li>
……
<li>99</li>  —>  <li>100!!!</li>
<li>100</li>  —> 

那么最后在html上的dom操作有100个步骤; 显然要比使用了key属性的对比算法最终制定的dom操作要冗余太多;


<3>这里补充: 如果存在相同key属性元素时的对比算法;
如果在同一层级元素中存在key属性相同的元素(虽然这种设计方式本身就是错误的, 但是react肯定不会因为这个问题而影响最终的元素更新结果), react是如何来处理对比算法和最终更新dom元素的呢?

react在第一次在新/旧virtual dom上找到对应的key属性元素后其实会做一个标记, 表示这个元素已经被对比过了, 之后如果又遇到查找相同key属性元素的情况, 就会跳过被标记的元素去找下一个满足key属性值的元素来进行对比, 并做另一个标记......, 如:

旧virtual dom:

<li key=1>1</li>
<li key=1>2</li>
<li key=1>3</li>
……


新virtual dom:

<li key=1>2</li>
<li key=0>0</li>
<li key=1>1</li>
……

上例中, 当react查找到新virtual dom中第一个key=1属性对应的元素时会同时标记新/旧virtual dom中这个元素的key属性为, 如: key=‘1-1’, 之后再去查找key=1属性的元素时就会跳过这个key=‘1-1’的元素来查找下一个key=1的元素并标记为key=‘1-2’, 如果在新virtual dom中查找不到其它key=1的元素就标记这个旧virtual dom中的元素为待删除......, 那么最后对比算法得出的dom操作将会是:
在key=‘1-1’和key=‘1-2’的元素之间新增一个<li key=0>0</li>元素, 然后删除<li key=1>3</li>元素, 最后修改key=‘1-1’和key=‘1-2’元素中的内容; 不过需要注意的是, 最终在html上操作dom时不会将原本的key值改变为标记的值, 如: key=1不会更新为key=‘1-1’; 


<4>存在元素移动的情况(原有元素变化了自己在这个层级中的位置);

旧virtual dom:

<li key=1>1</li>
……
<li key=100>100</li>


新virtual dom:

<li key=100>100!!!</li>
……
<li key=1>1</li>

这种情况下react会先通过对比来记录是否有key属性相同的元素需要在最后更新(这里就是key=100的元素), 然后根据新/旧所有元素key属性的排列顺序进行对比计算(这种情况下的算法非常复杂, 这里就不像上面推测单纯的新增/删除元素的算法一样来做深究了), 如:

1
…
100

变为:

100
…
1

这种情况下react在计算后将会采用某一种算法来制定最终在html上的dom操作(之所以算法复杂是因为它能保证最终的dom操作步骤是最少的);


也可能是相邻元素顺序的变化, 如:

……
19
20
……

变为:

……
20
19
……

这种情况下react在计算后显然会采用比上一种情况更精简的步骤来在html上操作dom元素(因为只需移动其中一个元素即可);


当然还包括了结合之前所提到的多种情况(新增/删除)下的复杂情况下的对比算法, 如:

1
2
3
4
5

变为:

5
3
2
1
0

上例中不但有相邻和非相邻元素位置的变换, 还存在新增和删除元素的情况, 那么react当然也会利用它的复杂算法来计算出最终在html上需要执行的dom操作, 不过需要注意的是, 无论最终的dom操作如何复杂, 理论上其步骤不会超过没有key属性支持情况下需要的步骤(逐一更新dom元素), 但是在对比计算的过程中(制定dom元素操作步骤的计算)其复杂度很可能高于没有key属性支持的情况的, 不过由于通过JS操作dom是最占资源的行为, 所以只要能够令dom操作最简化, 之前的对比计算的消耗可以忽略不计;


(6)服务器端渲染SSR(Server Side Render);

传统的服务器渲染技术有: JAVA使用的JSP, PHP使用的Smarty, 包括之前在Nodejs+Express项目中使用的EJS这个JS模板引擎;  

Server Side Render的最直接的优势就是: 减少首屏加载的时间, 对SEO友好;

关于ReactDOMServer对象提供的在服务端渲染组件的方法:
* renderToString()
* renderToStaticMarkup()
* renderToNodeStream()
* renderToStaticNodeStream()

上面的方法都属于React同构API, 其中前两个是React16之前提供的方法, 后两个是React16提供的新方法, 其性能更好; 

关于ReactDOMServer对象提供的API可以参考:
http://www.css88.com/react/docs/react-dom-server.html 


对于SSR可以这么理解, 当客户端收到SSR后的HTML页面会直接显示在浏览器中(前端首屏加载时HTML页面中id=‘root’的元素是空的), 然后同样会加载build后的js和css文件, 而为了之后能够让react继续支持其单页面应用的所有操作, 这里需要满足两个重要的条件:
<1>服务器端必须同时传递给前端当前页面对应的virtual dom并保存在内存中;
<2>如果使用redux的话, 那么需要在createStore中传入一个对应当前应用状态的初始state值;

因为当前端渲染了直接从server端拿到的html页面后仍旧会根据当前路由去执行一遍react代码(和前端首屏加载时的流程一致), 那么在这个加载过程中就会需要对比当前已存在的virtual dom(如果当前不存在virtual dom则会按照所有组件都是新建的流程最后重新在html中添加一遍应用组件, 这显然是不行的), 当对比之后发现没有需要更改的内容, 则不会再去重新操作html页面中的dom元素, 不过要做到对比结果相同那就要满足redux的store初始值与当前页面的状态一致, 所以需要满足上述这两点要求;
不过还需要注意的是, 由于这种SSR加载方式不会执行原本绑定在组件componentDidMount函数中的内容(这点有待核实, 因为如果后端不执行componentDidMount函数, 那么就无法拿到最新的redux中的数据), 也不会去绑定react管理的onClick等需要页面DOMContentLoaded事件触发后才能绑定的用户交互事件执行函数, 所以需要在客户端使用ReactDOM.hydrate()方法来’注水’, 手动在组件上添加这些执行函数, 这就需要在这些使用了react管理的onClick等事件绑定函数和componentDidMount函数的组件对应的html元素中指定类似: data-reactid这样的属性, 使得前端能够直接获取到需要’注水’的元素; 而在上面介绍的四个ReactDOMServer对象提供的API中, 带有’Static’字段的方法都不会自动为react元素指定data-reactid这样的属性, 虽然这样可以节省额外字节, 但是也让react应用失去了交互性, 所以只在把React作为一个简单的静态页面生成器时才会使用; 

还有两个与上面提到的SSR这种加载方式是否会在后端执行componentDidMount函数中的内容相关的问题:
<1>由于前/后端渲染时所创建的socket对象不同, 那么在SSR后前端需要重新绑定发送消息时对前端socket对象的操作:socket.emit('sendmsg', {from, to, msg}), 包括在Dashboard和Chat模块的componentDidMount函数中的socket.on('recvmsg', function(data){……})也需要重新绑定, 但是如果SSR中执行了组件的componentDidMount函数, 那么也就是说redux的state.chat.listenerset已经被置true了, 那么在前端再次执行Dashboard和Chat模块的componentDidMount函数时就不会去绑定socket.on('recvmsg', function(data){……})了;
<2>如果SSR会执行组件的componentDidMount函数, 那么也就会传递最新的redux的state给前端, 对于前端来说虽然拿到了最新的state, 但是如果想继续监听来自redux的state的改变就必须重新执行一遍所有componentDidMount函数, 因为react-redux是在componentDidMount函数中使用store.subscribe()来绑定redux的state变化时的处理函数的, 而又由于前端的store对象与SSR的store对象不同, 所以必须重新绑定一遍;


14.react项目相关的内容;

(1)eslint代码规范;

当在localhost:3000上运行webpack-dev-server装载的项目时, 可以发现在nodejs控制台中会打印许多warning信息(这些信息也会在前端浏览器加载应用后显示在console中), 如:

![](./dev_memo_img/150.png)

这是因为在项目的package.json中设置了:
……
  "eslintConfig": {
    "extends": "react-app"
  },
……

而config/webpack.config.dev.js中指定了eslint-loader相关配置:
……
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
……

所以会去取读取package.json中的eslintConfig配置;


那么, 如果我不需要eslint提醒我关于将’==‘改为’===‘和将’!=’改为’!==’的warning, 我希望在应用中可以有非严格的比较, 那么就需要在package.json中进行额外配置:
……
  "eslintConfig": {
    "extends": "react-app",
    "rules":{
      "eqeqeq":["off"]
    }
  },
……

上例中, 对eslintConfig做了额外配置, 在react-app这个类型下关闭了对’eqeqeq’这类规则的检查, 其中”off”代表关闭, 也可以设置为”warning”(默认)或者”error”;
修改后重启webpack-dev-server, 发现控制台已经不会在打印’eqeqeq’相关warning了;


如果这里想要对JS中’;’的使用创建新的ESLint规则, 如:
……
  "eslintConfig": {
    "extends": "react-app",
    "rules":{
      "eqeqeq":["off"],
      "semi":["warn","never"]
    }
  },
……

上例中, 设置了对分号使用的规则, 要求任何情况下都不能出现(‘never’, 相对于’always’), 一旦出现就会打印warning;

于是就会检查出应用中所有设置了分号的地方:

![](./dev_memo_img/151.png)

ESLint官网规则参考:
http://eslint.cn/docs/4.0.0/rules/


补充:
上例中存在一个eslint的warning信息: Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby

aria-label, aria-labelledby 和 role属性, 都是HTML5针对html tag增加的属性，一般是为不方便的人士提供的功能，比如屏幕阅读器;

role的作用是描述一个非标准的tag的实际作用; 比如用div做button，那么设置div 的 role="button"，辅助工具就可以认出这实际上是个button;
这里提到的aria-*是一种特殊的属性, aria的意思是Accessible Rich Internet Application，aria-*的作用就是描述这个它所在标签在可视化的情境中的具体信息; 

需要注意的是, aria-*只有加在可被tab到的元素上，读屏才会读出其中的内容, 如:
<span tabindex="0″ aria-label="标签提示内容">可被tab的span标签</span>  


当想要的aria-label文本在其他元素中做为内容存在时, 可以将该元素的id做为aria-labelledby属性的值, 在标签被tab时就直接去读取对应id元素中的内容, 如:
……
<div role="form" aria-labelledby="form-title">  
<span id="form-title">使用手机号码注册</span>  
<form>……</form>  
</div>  
……

上例中, 当来到该区域时, 浏览器不仅会读出"表单区”, 也会读出"使用手机号码注册”;

需要注意的是, 如果一个元素同时存在aria-labelledby和aria-label这两个属性，读屏软件会优先读出aria-labelledby的内容; 

关于HTML5中的aria-*与role属性的使用, 可以参考:
https://blog.csdn.net/dearcode/article/details/52218689 (重要)


关于tabindex属性;

一些元素默认就是focusable, 并且能被键盘focus; 所谓focusable指的是元素可以被鼠标或者JS focus，在Chrome浏览器下表现为会有outline发光效果，IE浏览器下是虚框，同时能够响应focus事件, 如: input, button等元素, 可以将它们的tabindex默认视为0;
当一个元素设置tabindex属性值为-1的时候, 元素会变得focusable，但是却不能被键盘focus;
tabindex="0"和tabindex="-1"的唯一区别就是键盘也能focus，索引的顺序没有任何的变化;  

tabindex属性的键盘索引顺序其实是从数值1开始的，不是0; 1索引顺序是最靠前的; 也就是说哪怕你在页面的最底部、文档流的最后一个元素设置了tabindex="1"，当按下Tab键的时候，首先focus就是这最后一个元素;

tabindex属性值的最大值不能超过32767, 索引顺序由1开始从小到大排列, 顺序为0的排在最后, 如果索引值相同, 那么会根据DOM元素在文档中的位置决定的，越靠前越外层的元素索引顺序更高;

关于HTML tabindex属性与键盘无障碍访问web网页, 可以参考:
http://www.zhangxinxu.com/wordpress/2017/05/html-tabindex/ (重要)


(2)使用async函数优化异步代码;

使用ES7的async+await可以以更优雅的, 同步的方式编写异步代码, 这里将chat.redux.js中的readMsg方法中原先使用Promise的部分用async函数来改写:
……
export function readMsg(from){
  return dispatch=>{
    axios.post('/user/readmsg',{from})
      .then(res=>{
        if(res.status==200 && res.data.code==0){
          dispatch(msgRead({from,num:res.data.num}))
        }
      })
  }
}
……

改为

……
export function readMsg(from){
  return async dispatch=>{
    const res = await axios.post('/user/readmsg',{from})
    if(res.status==200 && res.data.code==0){
      dispatch(msgRead({from,num:res.data.num}))
    }
  }
}
……


(3)ReactCSSTransitionGroup组件的使用; 

传统的页面动画解决方案分为:
使用CSS3 提供的新API 来实现;
使用JS操作DOM来实现;

React提供了一个ReactCSSTransitionGroup组件来封装需要被动画效果渲染的子组件, 实现在子组件被mount/unmount时为其添加相关css, 并且可以指定组件mount到HTLM页面后的一段时间后自动删除相关CSS样式, 甚至可以推迟组件被移除HTML页面的时间来保证为其添加的CSS效果显示完毕; 
react-addons-css-transition-group这个库是受到了angularjs的ng-animate库的启发而创建的;


ReactCSSTransitionGroup组件使用的例子:

js;
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5 with npm
……
return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
  );
……

css;

.example-enter {
  opacity: 0.01;
}

.example-enter.example-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}

.example-leave {
  opacity: 1;
}

.example-leave.example-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}

上例中, ReactCSSTransitionGroup组件的transitionName="example”属性决定了为其子组件添加CSS class的名称, 当然用户要保证在css文件中也要遵循这个规则来设计样式; 
ReactCSSTransitionGroup组件的transitionEnterTimeout={500}属性指定了当其子组件被正常mount到html页面的多少时间后删除指定在这个子组件上的相关css class;
ReactCSSTransitionGroup组件的transitionLeaveTimeout={300}属性决定了在子组件被从HTML页面中移除前需要等待的时间(也就是延迟多长时间再执行unmount操作), 这样就能让此次添加到这个子组件上的css效果生效后再移除组件;

需要注意的是: 
You must provide the key attribute for all children of ReactCSSTransitionGroup, even when only rendering a single item. This is how React will determine which children have entered, left, or stayed;

这是由于ReactTransitionGroup会利用ReactCSSTransitionGroupChild给每个children加一层封装, 如:

![](./dev_memo_img/152.png)


而React来判断一个组件的状态是新增/更新/移除是通过为render方法中每一个出现的子组件设置一个类似react-id的独一无二的标识(处于判断条件之内的, 或者重复出现的子组件都将获得不同的标识, 也就是说react会检查render方法中声明过的所有组件并添加标识)用来在组件下一次更新时对比前后两次render方法输出内容的不同来判断各个子组件的新增/更新/移除状态;

如果子组件是父组件通过this.props.children的形式添加到render方法中的, 那么react仍旧是通过上面的这种对比react-id的形式来进行判断的, 因为在声明父组件的this.props.children时, 如:
<Father>
  <Son1></Son1>
  <Son2></Son2>
</Father>

其实已经为Son1和Son2添加了独一无二的react-id了, 之后在通过this.props.children传入父组件的render方法时就可以通过上面提到方式对比前后两次render方法输出内容的不同从而判断各个子组件的新增/更新/移除状态;

但是如果在render方法中使用了遍历或者传入了数组, 那么就需要开发者手动为每个子组件添加key值来让react判断前后两次render结果中子组件的新增/更新/移除状态了, 因为此时react是无法确定render方法中具体声明了哪些组件的, 所以也无法为它们添加react-id, 也就是说react推荐的在render中遍历或者传入数组时为每个组件设置独一无二的key属性不仅仅是为了之后的virtual dom对比后对html进行dom操作时增加效率, 并且也可以保证在父组件更新时那些通过遍历或者数组的形式声明在父组件render方法中的子组件能够被react识别正确的新增/更新/移除状态;

而在ReactCSSTransitionGroup组件中, 由于它需要通过遍历的形式对this.props.children中的每个子组件封装一层ReactCSSTransitionGroupChild组件, 所以就需要用户提供key属性, 以便将key属性对应添加到ReactCSSTransitionGroupChild组件上方便react之后的对比;
之后, 当有子元素添加或删除的时候，其实是通过ReactCSSTransitionGroupChild组件钩子函数来控制其中子组件的样式显示, 这样就不需要ReactCSSTransitionGroup直接去修改传入的子组件的生命周期函数了, 并且由于ReactCSSTransitionGroupChild组件会利用传入子组件的key值来标记自己, 所以每次ReactCSSTransitionGroup组件更新时React就能很方便地区分哪些组件是属于新增/删除/原本就存在的;

![](./dev_memo_img/153.png)


从上面ReactCSSTransitionGroupChild组件可以看出, 它自定义了三种钩子函数, 会分别在ReactCSSTransitionGroup组件新建和更新时在它的componentDidMount, componentWillUnmount中被调用; 其中的transition方法属于dom操作, 它将按需求添加/删除对应元素的className;

![](./dev_memo_img/154.png)

从上面的transition方法中可以看出, 它的作用主要就是对指定dom元素进行className的添加/删除, 其中:

ReactAddonsDOMDependencies.getReactDOM().findDOMNode(this);

这条语句的目的是为了获取这个react jsx对象在html中对应的元素, 真实项目中的使用方法如下:

import ReactDOM from 'react-dom'
ReactDOM.findDOMNode(this)

所以只要能够获取子组件在html中对应的元素, 那么就可以控制它的样式和显示动画效果了;


不过很显然上面的例子只是针对子组件enter时, 也就是新增子组件时在componentDidMount钩子函数中设置的方法, 而当组件被移除时的方法完全不同:

<1>对于新增子组件而言, ReactCSSTransitionGroup组件会在其ReactCSSTransitionGroupChild组件的componentDidUpdate函数中为元素添加动画效果相关的class: example-enter, 然后在下一个tick添加另一个class: example-enter-active, 接着使用setTimeout函数(延迟时间由transitionEnterTimeout决定)延迟删除元素中动画效果相关className; 
<2>对于待移除组件而言, ReactCSSTransitionGroupChild组件会在其componentWillUnmount函数中为元素先添加example-leave属性, 然后再添加动画效果相关的后续css类(example-leave-active), 接着设置阻塞主线程执行的sleep方法让其停留指定时间(transitionLeaveTimeout指定的值)再继续执行删除DOM的操作从而能让组件能够将动画效果显示完成后再被真正移除; 不过需要注意的是, 这样设置会出现所有待移除组件的动画效果逐个展示而非一同展示的情况;

具体的实现方法可以参考:
https://ivweb.io/topic/586099050e2a26d26bb1c029(ReactTransitionGroup 动画原理, 重要)
https://reactjs.org/docs/animation.html(官方)


补充:
1.JS中实现阻塞线程的sleep方法;

function sleep(numberMillis) { 
  var now = new Date(); 
  var exitTime = now.getTime() + numberMillis; 
  while (true) { 
    now = new Date(); 
    if (now.getTime() > exitTime) 
      return; 
  } 
}

参考:
http://www.jb51.net/article/52105.htm

2.关于使用JS给元素添加样式类的问题;

如果使用JS直接给元素添加class name, 如:

css;

.esna-enter {
  opacity:0;
}
.esna-enter.esna-enter-active {
  opacity:1;
  transition: opacity 0.5s ease
}

js;

$('.banner-bottom').addClass('esna-enter');
$('.banner-bottom’).attr(‘class’);  //banner-bottom esna-enter
$('.banner-bottom').addClass('esna-enter-active');

上例中, 虽然第二条语句就可以取到页面中.banner-bottom元素的class name, 说明addClass方法确实是实时地将页面中元素的class元素更新了, 但是由于两次addClass操作之间没有页面的重绘和回流(也就是页面不会去根据更新的class name去匹配css中的对应内容重新渲染元素从而改变元素的样式状态), 这就会造成当页面根据元素class属性进行重新渲染时相当于直接跳过了元素的: class= ‘banner-bottom esna-enter’这个状态, 而是直接取读取了元素的: class= ‘banner-bottom esna-enter esna-enter-active’这个状态, 那么当然会让浏览器认为这个元素上并没有opacity的变化(假设这个元素原型的opacity就是1), 所以也不会触发transition属性指定的动画效果;

解决方法可以是在下一个tick中再为元素添加第二个样式类, 如:

$('.banner-bottom').addClass('esna-enter');
setTimeout(
  function(){
    $('.banner-bottom').addClass('esna-enter-active');
  }
,0)


使用ReactCSSTransitionGroup来对msg页面中消息列表添加淡入的动画效果;

安装react-addons-css-transition-group依赖库;

$ npm install react-addons-css-transition-group —save


修改msg.js;
……
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
……
return  (
      <ReactCSSTransitionGroup
        transitionName="esna"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
      >
          {
            chatList.map(v=>{
              const lastItem = this.getLast(v)
              const targetId = lastItem.from==userid?lastItem.to:lastItem.from
              const unreadNum = v.filter(v=>
                !v.read&&v.to==userid
              ).length

              return (
                <List key={lastItem.chatid}>
                  <Item
                    extra={<Badge text={unreadNum}></Badge>}
                    thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                    arrow='horizontal'
                    onClick={()=>{
                      this.props.history.push(`/chat/${targetId}`)
                    }}
                  > 
                    {lastItem.content}
                    <Brief>{this.props.chat.users[targetId].name}</Brief>
                    <Brief><span role='img' aria-label='emoji'>🕘</span>{this.formatDateTime(new Date(lastItem.create_time))}</Brief>
                  </Item>
                </List>
              )
            })
          }
      </ReactCSSTransitionGroup>
    )
……

上例中需要注意的是, 由于这里通过遍历的形式来生成一系列的<List>组件, 所以需要为其添加key属性(其实由于使用了ReactCSSTransitionGroup组件, 无论这里存在多少个子元素都需要指定key属性), 但是之前使用了{lastItem._id}来指定这个key值, 问题是每次同一个<List>组件更新时这个key值都是不同的, 因为每条消息的_id都是独一无二的, 这就会导致react在使用对比算法处理这一系列<List>组件时会将此次需要被更新的<List>组件认为是一个新增的组件, 所以最终对html的dom操作将会是: 先添加一个被认为是此次新增<List>组件, 然后移除之前存在的这个<List>组件, 这也会导致在页面中短时间内会同时出现新/旧两个<List>组件元素的情况(因为动画效果设置了延时删除), 所以这里将遍历<List>组件的key属性改为: {lastItem.chatid}, 因为对于同一个聊天会话来说所有聊天记录的chatid属性都是相同的, 并且列表中所有聊天会话对应的chatid是不会重复的; 


修改index.css;
……
/*for ReactCSSTransitionGroup*/
.esna-enter {
  opacity: 0.01;
}

.esna-enter.esna-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}

.esna-leave {
  opacity: 1;
}

.esna-leave.esna-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}


不过需要注意的是, 默认情况下ReactCSSTransitionGroup组件只会在自身update的时候才会对子组件执行生命周期的设置操作(在ReactCSSTransitionGroup组件自身将要被移除的情况下是无法为其子组件设置任何动画效果的), 当首次加载时并不会去做设置, 所以上例中当应用已经加载的情况下, 用户在navlinkbar中来回点击的msg和其他图标来在msg页面与其它页面之间切换时, msg页面的消息列表并不会显示淡入的css效果, 解决办法就是通过设置:
transitionAppear={true}
transitionAppearTimeout={500}

这两个属性来让ReactCSSTransitionGroup组件在首次加载时也对其子元素的生命周期函数进行设置; 其实transitionAppearTimeout就相当于transitionEnterTimeout属性;
当然, 同样需要添加对应的css样式设置;

修改msg.js;
……
      <ReactCSSTransitionGroup
        transitionName="esna"
        transitionAppear={true}
            transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
      >
……


修改index.css;
……

.esna-appear {
  opacity: 0.01;
}

.esna-appear.esna-appear-active {
  opacity: 1;
  transition: opacity .5s ease-in;
}


(4)react动画解决方案: Ant motion;

安装QueueAnim进出场动画组件库:

$ npm install rc-queue-anim --save


修改chat.js;
……
import QueueAnim from 'rc-queue-anim'
……
        <QueueAnim type='scale' delay={100}>
          {chatmsgs.map(v=>{
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from == userid?(
              <List key={v._id}>
                <Item
                  thumb={avatar}
                >{v.content}</Item>
              </List>
            ):(
              <List key={v._id}>
                <Item 
                  extra={<img src={avatar} alt=''/>}
                  className='chat-me'
                >{v.content}</Item>
              </List>
            )
          })}
        </QueueAnim>
……

上例中, QueueAnim组件的type属性指定了每个直接子元素出入场的动画样式; 

需要注意的是, 这里以及下面将要提到的子元素特指类似上面在介绍ReactCSSTransitionGroup组件时提到的ReactCSSTransitionGroupChild封装组件(原理类似);

QueueAnim组件在首次加载时存在一个特别的机制, 这点与ReactCSSTransitionGroup组件不同, 当QueueAnim组件本身被加载时它不会在其render方法中render被传入的子组件, 而是将加载新增的子组件这一个步骤放在它被加入了html之后, 也就是componentDidMount中, 并且设置为在下一个tick中执行(父组件componentDidMount了之后的下一个tick, 子组件开始执行render一系列的生命周期函数), 这样设计的原因可能是考虑到了首次加载QueueAnim组件时其子组件内的信息很可能还没有获取到(redux处于初始状态), 而由于应用对全局数据的获取大部分是设置在各个组件的componentDidMount中的, 所以这里将加载新增子组件放在QueueAnim组件加载完成后(也代表了应用中组件的一轮装载完成)的下一个tick执行可以一定程度地保证当子组件在被渲染到html页面并添加了动画样式的这段时间内是有数据的;

对于需要’入场’效果的子组件而言, 多个子元素会按所在位置的顺序根据type样式’先后入场’, 其实QueueAnim会先为每一个’入场’的子元素的componentDidMount函数中为子组件先添加一个初始的css类(一般这个css类中指定了组件的opacity为一个近乎透明的值), 然后再为子组件添加一个延迟时间根据子组件所处顺序来递增的setTimeout函数, 第一个子组件无须设置setTimeout函数, 除非QueueAnim函数中指定了deplay属性, 保存延迟时间的变量可以声明在父组件的constructor中, 每次有子元素执行了componentDidMount就累加一次单位延迟时间, 这样下一个执行componentDidMount方法的新增组件就能获取到相应的延迟, 每次父组件更新就将这个变量置为0, setTimeout返回函数中将为这个组件指定与type属性效果相关的css样式(使用类似transition这样的css功能), 所以当子元素的componentDidMount方法依次执行后就会在页面上有’先后入场’的效果; 

而对于需要’出场’效果的子组件, 实现机制与之前介绍的ReactCSSTransitionGroup组件在处理将要被移除的子组件的componentWillUnmount函数的方法类似, 这里需要依次’出场’的效果, 所以在componentWillUnmount中为每个子组件添加了指定className(实现一个与type属性相关的出场效果)后使用阻塞相同时间的sleep方法使得每一个子组件在展示完自己的出场效果后再真正被从HTML页面中移除;

delay指定了所有子元素出入场延迟的时间, 其实就是在每个入场子组件的componentDidMount方法中(包括第一个’进场’的子组件)在原有setTimeout设置的延迟时间上统一都加上这个delay的值; 
对于出场延迟来说, 其实就是在第一个需要出场的子组件(判断组件是否为第一个出场的标识变量可以使用类似上面提到的保存延迟时间的变量的指定方法声明在父组件的constructor中, 每次父组件更新要置回0)的componentWillUnmount方法中在添加出场css效果之前先使用sleep()阻塞方法延迟delay数值的时间;

与ReactCSSTransitionGroup类似, 上面所描述的’进出场’效果只有在QueueAnim组件首次被加载或者被update时才会为其子组件添加, 当其自身被移除时不会为子组件添加任何动态效果; 并且QueueAnim组件中的每个子标签也都必须指定key属性, 如果未设置 key 将不执行动画;


那么如果这里需要在每次用户点击navlinkbar中的图标后跳转到不同的页面时为页面添加一个转场(进出场)切换的效果, 最简单地设计思路是:

修改dashboard.js;
……
import QueueAnim from 'rc-queue-anim'
……
    return (
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
        <div style={{marginTop:45}}>
        <QueueAnim type='scaleX'>
          <Switch key='1'>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}/>
            ))}
          </Switch>
        </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
……

但是上面这种对QueueAnim组件的使用方法无法正确生成动画效果, 原因是QueueAnim组件是通过改造其直接子元素的新增/移除生命周期函数来实现动画效果的, 但是上面这种设计的问题是, QueueAnim的直接子组件是Switch组件, 它除了页面第一次加载时是属于新增的组件, 其它情况下会一直属于被update的组件, 那么显然不满足我们需要的页面跳转时的动画效果, 解决方法是改造dashboard.js中的render函数:

修改dashboard.js;
……
    const page = navList.find(v=>v.path == pathname)

    return (
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
        <div style={{marginTop:45}}>
        <QueueAnim type='scaleX'>
            <Route key={page.path} path={page.path} component={page.component}/>
        </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
……


参考:
https://motion.ant.design/ (官网)
https://motion.ant.design/api/queue-anim (进出场动画相关API)
https://motion.ant.design/edit/#t%3Dnav_0_0%2Ccontent_0_0%2Ccontent_2_0%2Ccontent_3_0%2Ccontent_4_0%2Cfooter_0_0 (动效模板, 支持自定义选择多个带有动效的模板组件然后自动整合生成一个完整的页面应用的功能)


(5)在msg页面添加删除聊天会话记录的功能;

使用antd-mobile的SwipeAction组件实现在msg页面消息列表中的某条聊天会话记录上向左滑动后(只支持Touch事件)出现删除/取消选项, 当用户点击删除后就会将这条聊天会话记录从列表中删除(同时将会话中所有收到的消息置为已读), 之后用户再来到msg页面时只要被删除会话中没有新的消息产生(无论是用户发送的还是用户收到的), 这条会话记录就不会出现在列表中; 
实现这个功能的关键就是为被删除会话记录中的最后一条消息添加一个removed标记, 这样在msg页面渲染会话列表时就可以通过某条会话记录的最后一条消息来判断是否应该显示这一条会话记录了; 也就是说一旦被删除的聊天会话中收到了新的消息或者用户发送了新消息那么msg页面的聊天会话列表中又会重新显示这一条会话记录了;
不过目前在项目中暂时没有将删除会话记录而生成的removed标记更新到数据库中, 也就是说目前删除的会话只会在本地被标记, 下一次更新redux中state.chat.chatmsg或者重启应用时被删除会话记录就会重新显示在msg页面列表中;

修改chat.redux.js;
……
//删除msg页面中的某条聊天会话记录
const MSG_REMOVE = 'MSG_REMOVE'
……
    case MSG_REMOVE:
      return {...state, chatmsg:[...state.chatmsg.map(v=>{
                if(v._id == action.payload.lastMsgId){
                  v.removed = true
                }
                return v
              })
            ]
          } 
……
//这里暂时不将删除聊天会话记录的标记更新到数据库中, 也就是说目前删除的会话只会记录在本地, 下一次更新redux中state.chat.chatmsg或者重启应用时被删除记录就会被覆盖
export function removeMsg(lastMsgId){
  return {type:MSG_REMOVE, payload:{lastMsgId}}
}
……

需要注意的是, 上例中reducer函数在action.type为MSG_REMOVE时返回的最新的state对象时并没有使用immutable对象的形式来处理chatmsg数组中的对象元素(导致所有对比新/旧redux的state的地方都会出现不准确的问题), 所以需要使用immutable.js来改进;


修改msg.js;
……
import {List, Badge, SwipeAction} from 'antd-mobile'
import {removeMsg, readMsg} from '../../redux/chat.redux'

@connect(
  state=>state,
  {removeMsg, readMsg}
)
class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  //给被删除聊天会话的最后一条消息添加一个标志, 之后渲染msg页面时如果某个会话的最后一条消息的标志为已删除就不显示这个会话;
  //并且在用户删除某项聊天会话时将其中所有对方发来的消息置为已读
  handleDeleteMsg(from, lastMsgId){
    this.props.removeMsg(lastMsgId)
    this.props.readMsg(from)
  }
……
chatList.map(v=>{
              const lastItem = this.getLast(v)
              const targetId = lastItem.from==userid?lastItem.to:lastItem.from
              const unreadNum = v.filter(v=>
                !v.read&&v.to==userid
              ).length

              return lastItem.removed?null:
                (
                <List key={lastItem.chatid}>
                  <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                          {
                            text: '取消',
                            style: { backgroundColor: '#ddd', color: 'white' },
                          },
                          {
                            text: '删除',
                            onPress: ()=>{this.handleDeleteMsg(targetId,lastItem._id)},
                            style: { backgroundColor: '#F4333C', color: 'white' },
                          },
                      ]}
                  >
                    <Item
                      extra={<Badge text={unreadNum}></Badge>}
                      thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                      arrow='horizontal'
                      onClick={()=>{
                        this.props.history.push(`/chat/${targetId}`)
                      }}
                    > 
                      {lastItem.content}
                      <Brief>{this.props.chat.users[targetId].name}</Brief>
                      <Brief><span role='img' aria-label='emoji'>🕘</span>{this.formatDateTime(new Date(lastItem.create_time))}</Brief>
                    </Item>
                  </SwipeAction>
                </List>
              )
            })
……


SwipeAction组件的默认规则:
<1>结合手势操作, 从屏幕一侧唤出操作, 一次只可滑动一行列表
<2>点击任意按钮之外处或往回滑动该列表可隐藏操作

更多关于antd-mobile中SwipeAction(滑动操作组件)相关内容, 可以参考:
https://mobile.ant.design/components/swipe-action-cn/


![](./dev_memo_img/155.png)

![](./dev_memo_img/156.png)

![](./dev_memo_img/157.png)

![](./dev_memo_img/158.png)

![](./dev_memo_img/159.png)



将应用的聊天会话删除功能实现持久化, 以删除者_id做为删除标识的值保存在数据库中;

将一条消息置为removed:true并更新到数据库中存在一个新的问题, 那就是这条消息对于聊天双方此时都是属于被删除状态, 也就是说, 当此次会话没有被更新的情况下, 在双方的聊天会话列表中都不会显示与对方的这条会话记录了, 这显然是不合理的, 只有主动删除的用户才需要在msg页面的会话记录列表中过滤掉这条记录;


修改server/user.js;
……
Router.post('/removemsg', function(req,res){
  const {lastMsgId, removedBy} = req.body
  Chat.findByIdAndUpdate(lastMsgId, {'removed':removedBy}, function(err, doc){
    if(!err){
      return res.json({code:0})
    }
  })
})
……

修改server/model.js;
……
  chat:{
    'chatid': {'type':String, 'require':true},
    'from':{'type':String, 'require': true},
    'to':{'type':String, 'require': true},
    'read':{'type':Boolean, 'default':false},
    'content':{'type':String, 'require':true, 'default':''},
    'create_time': {'type':Number, 'default': new Date().getTime()},
    'removed': {'type':String, 'default':''}
  }
……

修改chat.redux.js;
……
    case MSG_REMOVE:
      //需要注意的是这里返回redux的更新state对象时并没有使用immutable对象的形式来处理chatmsg数组中的对象元素(导致所有对比新/旧redux的state的地方都会出现不准确的问题), 所以需要使用immutable.js来改进
      return {...state, chatmsg:[...state.chatmsg.map(v=>{
                if(v._id == action.payload.lastMsgId){
                  v.removed = action.payload.removedBy
                }
                return v
              })
            ]
          } 
……
function msgRemoved(lastMsgId, removedBy){
  return {type:MSG_REMOVE, payload:{lastMsgId, removedBy}}
}
……
export function removeMsg(lastMsgId, removedBy){
  return async dispatch=>{
    const res = await axios.post('/user/removemsg',{lastMsgId, removedBy})
    if(res.status=200 && res.data.code==0){
      dispatch(msgRemoved(lastMsgId, removedBy))
    }
  }
}
……


msg.js;
……
return lastItem.removed == userid?null:
……
onPress: ()=>{this.handleDeleteMsg(targetId,lastItem._id,userid)},
……

上例中将原本的removed标识默认的boolean类型改为了字符串类型, 用来标识执行这次删除操作的用户_id, 如果消息没有被删除就是空字符串, 之后在生成msg页面的聊天会话列表时会判断如果某个会话中最后一条消息的removed标识为当前登录用户, 那么就不显示这条会话记录;


不过目前还存在一个问题:
如果两个用户同时删除了某条会话记录, 并且此条会话中又没有任何更新的话, 先删除会话的用户仍旧会在msg页面的会话记录列表中显示这条记录, 因为最后一条消息的removed属性被替换为了后删除对应会话用户的_id了, 解决办法就是为removed属性新增一个’both’状态, 来代表某条会话记录被双方同时删除了;


修改server/user.js;
……
Router.post('/removemsg', function(req,res){
  const {lastMsgId, removedBy} = req.body

  Chat.findOne({'_id':lastMsgId},function(err,doc){
    if(err) return res.json({code:1})
    if(!doc.removed){
      Chat.findByIdAndUpdate(lastMsgId, {'removed':removedBy}, function(err, doc){
        if(!err){
          return res.json({code:0,removed:removedBy})
        }
      })
    }else{
      Chat.findByIdAndUpdate(lastMsgId, {'removed':'both'}, function(err, doc){
        if(!err){
          return res.json({code:0,removed:'both'})
        }
      })
    }
  })
})
……


修改msg.js;
……
return (lastItem.removed == userid || lastItem.removed == 'both')?null:
……

上例中, 当用户删除了某条会话记录后, 服务器端会将对应消息的removed标识更新为删除这条会话的用户_id, 如果发现removed标识已经存在内容而不是默认值空字符串, 则将其统一更新为’both’字符串, 代表消息对应的会话记录被聊天双方同时删除了, 之后在msg页面渲染会话列表时会进行判断, 如果会话最后一条消息的removed属性为’both’, 则也需要过滤掉这条会话记录;


(6)修改应用的3个bug;

<1>来到用户的个人中心页面’/me’后, 点击’退出登录’按钮后会跳转到’/geniusinfo’页面, 而应该跳转到’/login’页面, 这是因为之前在设计当用户从完善信息页面提交信息后需要跳转到’/me’页面, 也就是说会将state.user.redirectTo更新为’/me’, 所以之后从个人中心页面点击’修改个人信息’按钮或者点击NavLinkBar导航图标离开当前页时需要将state.user.redirectTo重新更改为之前AUTH_SUCCESS后的状态以免被跳转回’/me’页面, 那么之前的做法是在user.js中用户点击’修改个人信息’按钮并跳转到相应个人完善信息页面之前, 和用户离开’/me’页面时, 也就是User模块的componentWillUnmount方法中利用authSuccess方法来更新当前state.user.redirectTo的值; 

这样的设计的问题是: 当用户点击’退出登录’按钮后会直接将state.user.redirectTo更新为’/login’, 这会让应用跳转到’/login’页面没有问题, 但是由于之前还在User组件的componentWillUnmount中再次使用authSuccess方法将state.user.redirectTo更新, 所以又立刻会跳转到’/geniusinfo’页面; 

解决方法就是删除上述提到的两处使用authSuccess方法的地方, 直接在User组件中设置componentDidMount:

修改component/user/user.js;
……
  componentDidMount(){
    this.props.authSuccess({type:this.props.type, avatar:this.props.avatar})
  }
……

<2>当用户通过注销回到login页面后点击注册按钮后无法跳转到register页面, 仍旧停留在login页面;

原因是: 通过注销回到login页面时应用的state.user.redirectTo为’/login’, 所以需要对Register模块的路由判断条件做修改;

修改register.js;
……
{this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo} />:null}
……

<3>在’/me’页面直接刷新页面会报以下错误:


![](./dev_memo_img/160.png)

但是同样的’/msg’,’/boss’,’/genius’页面就不会有问题, 在没有找到问题之前, 只能做了如下修改, 使得’/me’页面不会被rc-queue-anim组件封装改造;

修改dashboard.js;
……
    return (
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
        <div style={{marginTop:45}}>
        <QueueAnim type='scaleX'>
          {
            page.path == '/me'? <Route path={page.path} component={page.component}/>: <Route key={page.path} path={page.path} component={page.component}/>
          }
        </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )

……

上例中, 当QueueAnim的子组件为User时就不给它添加key属性, 这样QueueAnim组件就不会去封装改造这个子组件了;


后来发现了问题的原因:
不能在QueueAnim组件中返回null, 由于之前在user.js的render方法最后存在: this.props.redirectTo&&this.props.redirectTo=='/login'?<Redirect to={this.props.redirectTo} />:null 这样的语句, 而由于User组件第一次被加载时不存在this.props.user和this.props.redirectTo属性, 所以最后会返回null, 于是就会报上面的错误, 解决方法:

修改user.js;
……
this.props.redirectTo&&this.props.redirectTo=='/login'?<Redirect to={this.props.redirectTo} />:<div/>
……


(7)项目打包编译;

$ npm run build

![](./dev_memo_img/161.png)


webpack会将开发代码进行编译, 打包, 压缩, 最后生成一个build文件夹, 其中包括了所有项目打包后的文件(包括图片等静态文件), 可以直接deploy到生产环境;

查看在项目根目录下新生成的build文件夹结构;

![](./dev_memo_img/162.png)

补充:
1.在MAC终端上使用tree命令显示文件夹结构;

安装tree;
$ brew install tree

windows cmd中使用: sudo apt-get install tree

![](./dev_memo_img/163.png)


可以发现, 打包后的文件名中都带有hash值, 这是为了让上线的项目不会与之前项目的缓存冲突, 能够让用户第一时间获得更新后的内容;


目前项目使用了webpack-dev-server提供的3000端口的服务器来放置开发环境的项目, 那么项目打包后我们这里将它移至之前专门用来管理API接口的端口为9093的自建express服务器中, 这样也就不需要代理了, 因为不会出现跨域问题了;


(8)设置静态资源地址, 和服务器端地址过滤;

修改server/server.js;
……
const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use(function(req,res,next){
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})
console.log(path.resolve('build'))
app.use('/',express.static(path.resolve('build')))

server.listen(9093,function(){
  console.log('Node app start at port 9093')
})
……

上例中, 当进入项目的server目录执行node server后, 终端打印的path.resolve('build’)值为: 
/Users/jiusong/mygit/Employment-Social-Networking-App/esna/server/build

也就是说, path.resolve是以当前node启动线程所在路径做为参考来返回一个绝对路径的(并不会去查找路径, 仅仅是简单的拼接字符串), 那么由于目前build目处于项目的根目录下, 所以需要在项目根目录下启动server.js;

修改package.json;
……
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom",
    "server": "nodemon server/server.js"
  },
……

在项目根目录下执行:
$ npm run server

![](./dev_memo_img/164.png)


上例中server.js中获取到了build文件夹的绝对路径;


然后就可以通过9093端口来访问生产环境的项目了;

![](./dev_memo_img/165.png)


(9)项目上线;

<1>购买域名;
<2>DNS解析到服务器IP;
<3>安装配置Nginx (更多关于Nginx的内容可以参考: ‘Page Dev helper’ 笔记中: ’94.Apache/Nginx/Tomcat;’ 的相关内容);
<4>使用pm2来管理node进程;

(或者使用免费云服务器(heroku)来装载项目)



15.首屏服务器渲染;

(1)在node环境中使用babel-node来支持jsx;

$ npm install babel-cli --save


修改package.json;
……
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom",
    "server": "NODE_ENV=test nodemon --exec babel-node server/server.js",
    "server_bak": "nodemon server/server.js"
  },
……

需要注意的是, NODE_ENV不要忘记指定, 如果没有指定会报错:
Using `babel-preset-react-app` requires that you specify `NODE_ENV` or `BABEL_ENV` environment variables. Valid values are "development", "test", and "production".

重新执行npm run server, 此时在server/server.js中使用之前无法编译的ES6代码, 比如:

import express from ‘express’

就能正常运行了;


但是此时在server/server.js中仍旧不能执行jsx相关的代码, 解决方法是:

复制package.json中babel的配置:

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
      [
        "transform-decorators-legacy"
      ]
    ]
  },


在项目根目录下创建.babelrc文件:

{
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
      [
        "transform-decorators-legacy"
      ]
    ]
  }

显然babel-node是依靠.babelrc文件来读取babel配置的, 而webpack可以读取package.json中的babel参数;


(2)使用renderToString方法做服务器端渲染;

修改server.js;
……
import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
……
function App(){
  return <h2>test</h2>
}
console.log(renderToString(<App/>))

上例中在控制台显示:
<h2 data-reactroot="">test</h2>


可以参考前文中介绍的: ‘服务器端渲染SSR(Server Side Render)’;
https://reactjs.org/docs/react-dom-server.html (官网)


在container/app文件夹中新建app.js;

用来抽离index.js中ReactDom.render方法里<BrowserRouter>内的公共内容(而BrowserRouter组件在后端将被StaticRouter组件取代), 这些内容同时会被前/后端渲染用到;

app.js;

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

  render(){
    return (
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


修改index.js;

import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import App from './container/app/app'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)


修改server.js;

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'
const Chat = model.getModel('chat')
const User = model.getModel('user')
import path from 'path'
import React from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import App from '../src/container/app/app'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import reducers from '../src/reducer'

const app = express();
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
  socket.on('sendmsg', function(data){
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content:msg, create_time:new Date().getTime()}, function(err, doc){
      // console.log(doc)
      // console.log('///////////////')
      // console.log(Object.assign({},doc))
      // console.log('///////////////')
      // console.log(Object.assign({},doc._doc))
      
      if(!err){
        User.find({}, function(e,userdoc){
          let users = {}
          if(!e){
            userdoc.forEach(v=>{
              users[v._id] = {name:v.user, avatar:v.avatar}
            })
            delete doc._doc.__v
            let data = {doc:doc._doc, users}
            io.emit('recvmsg', Object.assign({},data))
          }
        })
      }
    })
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use(function(req,res,next){
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
    return next()
  }
  
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))

  let context = {}
  const markup = renderToString(
    (<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>)
  )

  return res.send(markup)
})
app.use('/',express.static(path.resolve('build')))

server.listen(9093,function(){
  console.log('Node app start at port 9093')
})

上例中将原本直接返回的index.html改为通过SSR渲染后的首屏页面字符串, 所以这里基本复制了index.js中的所有内容;


(3)添加css-modules-require-hook和asset-require-hook辅助库来让后端也能将css文件和图片作为模块引入;

上例在执行后会在后端控制台报错:

![](./dev_memo_img/166.png)

这是由于node环境中使用babel-node并不会像之前webpack那样处理以模块的形式直接引入css文件(当然引入图片模块也存在这样的问题, 之后会提到);
需要安装一个辅助库:

$ npm install css-modules-require-hook

根据官方文档的指示:

![](./dev_memo_img/167.png)

在server.js中引入csshook:

import csshook from 'css-modules-require-hook/preset'

需要注意的是, 这里引入的是一个钩子模块, 所以需要放在import App模块之前, 确保在对App相关依赖模块做编译之前csshook已经生效了;

并且新建一个cmrh.conf.js文件;

module.exports = {
  // Same scope name as in webpack build
  generateScopedName: '[name]__[local]___[hash:base64:5]',
}

参考:
https://github.com/css-modules/css-modules-require-hook (官方git)


上例在执行后仍旧会在后端控制台报错:

![](./dev_memo_img/168.png)

这就是因为在node环境中使用babel-node并不会像之前webpack那样可以处理对图片的直接import;

解决方法同样是需要依赖一个辅助库:

$ npm install asset-require-hook —save

根据官方文档的指示:

![](./dev_memo_img/169.png)

在server.js中引入assethook:

import assethook from 'asset-require-hook'
assethook(
  {extensions:['png']}
)


需要特别注意的是, 这里引入的assethook是对使用require方法添加的hook, 所以需要修改项目中使用import方法引入的图片, 如:

logo.js;
……
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
……

修改为:
……
class Logo extends React.Component{
  render(){
    return (
      <div className="logo-container">
        <img src={require('./job.png')} alt=""/>
      </div>
    )
  }
}
……

但是这里存在一个问题, 如果首屏渲染了login/register页面, 那么logo图片无法显示, 原因是其img的src为类似: 886c2c0ad64c17d8682384f7d1cb902c.png 这样的字符串, 这个问题之后会解决;

参考:
https://github.com/aribouius/asset-require-hook (官方git)


(4)完善首屏渲染的返回内容;

上面由后端渲染后生成的页面字符串内容被放在了markup变量中, 但是其实我们是需要将它放在index.html中的root节点内的, 所以这里拷贝build/index.html中的内容到server.js中;

修改server.js;
……
import staticPath from '../build/asset-manifest.json'
……
app.use(function(req,res,next){
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
    return next()
  }
  
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))

  let context = {}
  const markup = renderToString(
    (<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>)
  )

  const pageHtml = `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <title>React App</title>
                <link href="/${staticPath['main.css']}" rel="stylesheet">
              </head>
              <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">${markup}</div>
                <script type="text/javascript" src="/${staticPath['main.js']}"></script>
              </body>
            </html>`

  return res.send(pageHtml)
})
……

上例中, 通过直接引入asset-manifest.json文件中的内容来指定html页面中js/css文件的加载路径;
需要注意的是, 由于pageHtml这个变量中保存的字符串之间有换行的情况, 所以只能使用``来包裹, 如果使用一般的引号’,”就会报错;


(5)这里还可以利用首屏渲染在SEO方面的优势动态添加meta信息, 如:

修改server.js;
……
  const seoDescription = {
    '/msg':'esna聊天消息列表',
    '/boss':'esna查看牛人列表页面',
    '/genius':'esna查看genius列表页面',
    '/me':'esna查看个人信息页面',
    '/login':'esna登录页面',
    '/register':'esna注册页面'
  }
……
<meta name='description' content='${seoDescription[req.url]}'>
……



16.React16新特性;


(1)新的virtual dom核心算法Fiber, 渲染速度更快; 

(2)render方法可以直接返回数组和字符串而不需要在最外层包裹一个<div>;

(3)Portals组件, 让React可以渲染在其root dom之外的元素, 比如弹窗有一个全局的透明遮盖层, 这个设置遮盖层的元素最好是直接放在body下最外层的位置, 那么此时就可以使用Portals组件来实现;

(4)MIT协议, 变为完全开源了;

(5)错误处理机制, 为组件新增了一个生命周期函数: componentDidCatch, 如果组件在渲染时发生错误, 那么可以通过这个函数捕获错误;

目前如果直接访问项目的根目录或者其它不存在的路径, 如: localhost:9093 会报错:
Cannot read property 'title' of undefined

这是因为在dashboard.js中声明了: page = navList.find(v=>v.path == pathname), 而navList中显然没有保存’/‘或其他不存在的路径, 所以page为undefined...

先通过错误处理机制制定统一的错误页面:

在app文件夹中添加一张error.png图片;

修改app.js;
……
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

上例中在app.js这个应用的主入口中做了统一的错误处理;


修改index.css;
……
/*for error img*/
.error-container{
  display:block;
  margin:50px auto;
}

![](./dev_memo_img/170.png)


然后来修复这个问题:

修改dashboard.js;
……
    const page = navList.find(v=>v.path == pathname)

    return page?(
      <div>
        <NavBar className='fixed-header' mode='dark'>{page.title}</NavBar>
        <div style={{marginTop:45}}>
        <QueueAnim type='scaleX'>
            <Route key={page.path} path={page.path} component={page.component}/>
        </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    ):<Redirect to='/me'></Redirect>
……

修改后在用户访问一个应用不存在的路径时会被跳转到’/me’页面;


(6)服务器端渲染的新API(renderToNodeStream)能够直接渲染返回Node节点流, 提升3倍左右的效率; 
对于服务器端渲染的react项目, 还提供了一个hydrate方法来代替render;

这里使用renderToNodeStream代替renderToString来完成SSR;

修改server.js;
……
app.use(function(req,res,next){
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
    return next()
  }
  
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))

  let context = {}  
  const seoDescription = {
    '/msg':'esna聊天消息列表',
    '/boss':'esna查看牛人列表页面',
    '/genius':'esna查看genius列表页面',
    '/me':'esna查看个人信息页面',
    '/login':'esna登录页面',
    '/register':'esna注册页面'
  }

  res.write(`<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <title>React App</title>
                <link href="/${staticPath['main.css']}" rel="stylesheet">
                <meta name='description' content='${seoDescription[req.url]}'>
              </head>
              <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">`)

  const markupStream = renderToNodeStream(
    (<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>)
  )

  markupStream.pipe(res,{end:false})
  markupStream.on('end', ()=>{
    res.write(`</div>
                <script type="text/javascript" src="/${staticPath['main.js']}"></script>
              </body>
            </html>`
    )
    res.end()
  })
})
……

上例中使用了renderToNodeStream来将jsx元素解析为可读的字节流对象, 通过res.write()方法先将nodestream之前的静态html内容写入res, 然后使用res.pipe方法开始向res写入字节流(其第二个参数{end:false}告诉pipe方法当字节流写入完毕后不要关闭通道, 因为后面还有内容需要写入), 最后将nodestream之后的静态html内容写入res, 接着结束写入完成响应; 


修改index.js;
……
ReactDom.hydrate(
  (<Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
……

上例中将ReactDom.render方法改为了react16提供的ReactDom.hydrate, 对于使用SSR首屏渲染的应用来说, ReactDom.hydrate的效率更高;

hydrate()
Same as render(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer. React will attempt to attach event listeners to the existing markup

参考:
https://reactjs.org/docs/react-dom.html#hydrate



后续bug修复;

(1)目前在chat页面当消息过多时会出现:

![](./dev_memo_img/171.png)

![](./dev_memo_img/172.png)

上面有两个问题:
<1>消息输入栏没有固定在底部;
<2>顶部导航栏没有固定在顶部;

解决办法:

修改chat.js;
……
<NavBar 
          className='fixed-header'
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
        >
……

修改index.js;
……
.fixed-header.am-navbar{
  position: fixed;
  top:0;
  width:100%;
  z-index: 1;
}
……
.stick-footer{
  z-index: 10;
  position: fixed;
  bottom: 0;
  width: 100%;
}
……


![](./dev_memo_img/173.png)



(2)在dashboard相关页面(genius/boss/msg)有如下问题:

![](./dev_memo_img/174.png)

上面的问题是底部的NavLinkBar组件被覆盖了(因为当前设置了底部导航栏的z-index为-1);

解决方法:

修改navlinkbar.js;
……
    return (
      <div className='fixed-bottom'>
      <TabBar>
……


修改index.css.js;
……
.fixed-bottom{
  position: fixed;
  bottom:0;
  width:100%;
}
……

![](./dev_memo_img/175.png)

修改后发现还有一个底部列表信息显示不全的问题, 解决方法:

修改dashboard.js;
……
<div style={{marginTop:45, marginBottom: 50}}>
……

![](./dev_memo_img/176.png)


同样的, 在chat页面中消息列表也存在会被覆盖第一条和最后一条消息的情况(如果消息列表够长), 解决方法:

修改chat.js;
……
</NavBar>
        <QueueAnim style={{marginTop:45, marginBottom:45}} type='scale' delay={100}>
……


目前还存在一个问题待修复, 聊天页面中如果一条消息过长会被省略显示, 根据antd-mobile的文档, List.Item的wrap属性可以解决这个问题:

修改chat.js;
……
return v.from == userid?(
              <List key={v._id}>
                <Item
                  thumb={avatar}
                  wrap
                >{v.content}</Item>
              </List>
            ):(
              <List key={v._id}>
                <Item 
                  extra={<img src={avatar} alt=''/>}
                  className='chat-me'
                  wrap
                >{v.content}</Item>
              </List>
            )
……

![](./dev_memo_img/177.png)


但是由于不加空格的连续字符会被认定为一个字符串, 默认情况下不会换行, 所以会出现下面的情况(其实是由于使用了wrap属性的List.Item组件默认使用了word-break:normal/word-wrap:normal 这样的样式);

![](./dev_memo_img/178.png)

解决办法:

修改chat.js;
……
return v.from == userid?(
              <List key={v._id}>
                <Item
                  thumb={avatar}
                  wrap
                  style={{wordWrap:'break-word'}}
                >{v.content}</Item>
              </List>
            ):(
              <List key={v._id}>
                <Item 
                  extra={<img src={avatar} alt=''/>}
                  className='chat-me'
                  wrap
                  style={{wordWrap:'break-word'}}
                >{v.content}</Item>
              </List>
            )
……

![](./dev_memo_img/179.png)

上例中添加的样式不仅能够让连续的长字符串自动换行, 并且不会打断英文单词换行:

![](./dev_memo_img/180.png)


不过很显然还存在在一个问题, 那就是无论是用户接收到的消息还是主动发送的消息, 都希望文字左对齐, 解决方法:

修改index.css;
……
#chat-page .chat-me .am-list-content{
  padding-right: 15px;
  /*text-align: right;*/
}
……

![](./dev_memo_img/181.png)


关于word-break:break-all和word-wrap:break-word;可以参考’Page Dev helper’笔记中: ‘182.word-break:break-all和word-wrap:break-word;’相关内容;


(3)聊天页面对话记录框样式优化;

修改chat.js;
……
return v.from == userid?(
              <List key={v._id}>
                <Item
                  thumb={avatar}
                  className='chat-who'
                  wrap
                  style={{wordWrap:'break-word'}}
                >{v.content}</Item>
              </List>
            ):(
              <List key={v._id}>
                <Item 
                  extra={<img src={avatar} alt=''/>}
                  className='chat-me'
                  wrap
                  style={{wordWrap:'break-word'}}
                >{v.content}</Item>
              </List>
            )
……


修改index.css;
……
#chat-page .chat-me .am-list-content{
  margin: 10px 3% 10px 20%;
    padding: 7px 30px 7px 16px;
    background: mintcream;
  /*text-align: right;*/
}
#chat-page .chat-who .am-list-content{
  padding: 7px 30px 7px 20px;
  margin: 10px 20% 10px 1%;
  background: aliceblue;
}
……

![](./dev_memo_img/182.png)


(4)当用户在聊天页面收到新消息时应该将页面滚动条自动拉到最底处以便查看最新的消息, 当用户光标focus在输入框时也应该有这样的动作;

修改chat.js;
……
  componentDidUpdate(){
    setTimeout(()=>{
      document.documentElement.scrollTop = 10000 //for chrome
      document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
    },200)
  }
  whenFocusOnInput(){
    setTimeout(()=>{
      document.documentElement.scrollTop = 10000 //for chrome
      document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
    },0)
  }
……
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              onFocus = {
                v=>{
                this.whenFocusOnInput()
              }}
……


(5)login页面的错误信息在跳转到register页面后仍旧会保留的问题;

![](./dev_memo_img/183.png)


解决方法:

修改user.redux.js;
……
const CLEAN_MSG = 'CLEAN_MSG'
……
    case CLEAN_MSG:
      return {...state, msg:''}
……
export function cleanMsg(){
  return {type:CLEAN_MSG}
}
……


修改login.js;
……
  register(){
    this.props.history.push('/register')
    this.props.cleanMsg()
  }
……

上例中新增了一个用来清除redux的state.user.msg内容的方法;



将项目部署到heroku云服务器上;

(1)在master上创建一个online branch用来放部署到heroku云服务器的内容;


(2)修改server.js;
……
  // 监听端口，启动程序
  const port = process.env.PORT
  app.listen(port, function () {
    console.log(`Node app listening on port ${port}`)
  })


(3)修改package.json;
……
  "scripts": {
    "start_bak": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom",
    "server": "NODE_ENV=test nodemon --exec babel-node server/server.js",
    "server_bak": "nodemon server/server.js",
    "start": "NODE_ENV=production pm2 start server/server.js --name 'esna'",
    "heroku": "NODE_ENV=production babel-node server/server.js"
  },
……


(4)在mLab中创建一个新的数据库:songjiuchongesna;

![](./dev_memo_img/184.png)

https://mlab.com/databases/songjiuchongesna


在users一栏中创建当前数据库的用户名/密码:

![](./dev_memo_img/185.png)

mongo ds111430.mlab.com:11430/songjiuchongesna -u jiusong -p 123456


修改server/model.js;
……
const DB_URL = process.env.MONGOLAB_URI || 'mongodb://jiusong:123456@ds111430.mlab.com:11430/songjiuchongesna'
……


设置heroku的MONGOLAB_URI参数:
$ heroku config:set MONGOLAB_URI=mongodb://jiusong:123456@ds111430.mlab.com:11430/songjiuchongesna


(5)更改客户端对socket.io-client的使用方式;

修改chat.redux.js;
……
import io from 'socket.io-client'
let socket
……
export function recvMsg(){
  return (dispatch,getState)=>{
    if(!socket){
      socket = io()
    }
    socket.on('recvmsg', function(data){
      const userid = getState().user._id
      if(data.doc.from==userid || data.doc.to==userid)
        dispatch(msgRecv(data.doc, data.users, userid))
    })
  }
}

export function sendMsg({from, to, msg}){
  return dispatch=>{
    if(!socket){
      socket = io()
    }
    socket.emit('sendmsg', {from, to, msg})
  }
}
……

上例中, 客户端的socket没有传入任何地址参数, 因为默认使用同域地址;

需要注意的是, 上面之所以没有直接在开头使用const socket = io()指定socket对象, 而是在之后需要连接时再指定, 原因是如果直接在模块中指定socket=io()会报错:
if (null == uri) uri = loc.protocol + '//' + loc.host;
Cannot read property 'protocol' of undefined

报错的原因可能是在这种react项目中, socket.io-client需要在component mount了之后才能读取到浏览器相关数据然后连接服务器, 也就是说socket.io-client可能是需要页面加载完成(DOMContentLoaded)后或者说需要在任务队列的回调函数中(更接近浏览器的全局作用域)而不是在模块中执行才能正确读取到loc;

参考:
https://stackoverflow.com/questions/43740883/cannot-use-socketio-without-passing-server-uri-to-io-on-the-client-side


(6)更改server端对socket.io的使用方式;

修改server.js;
……
const app = express();

// 监听端口，启动程序
const port = process.env.PORT
const server = app.listen(port, function () {
    console.log(`Node app listening on port ${port}`)
})

const io = require('socket.io').listen(server)

io.on('connection', function(socket){
……

参考:
https://stackoverflow.com/questions/41943929/cannot-get-socket-io-eio-3transport-pollingt-ldmmkyz/41945228
https://stackoverflow.com/questions/27393705/socketio-get-http-localhost3000-socket-io-eio-3transport-pollingt-1418187


(7)在根目录下新建 Procfile 文件, 添加如下内容:
web: npm run heroku


(8)创建一个新的heroku库用来放esna项目;

$ heroku apps:create songjiuchongesna

![](./dev_memo_img/186.png)


(9)绑定heroku远程库;
$ git remote add heroku https://git.heroku.com/songjiuchongesna.git


(10)将本地分支online push到heroku 的master中:
$ git push heroku online:master

需要注意的是, 如果在项目根目录中(.git所在的文件夹)不存在package.json会报错:
Node.js: package.json not found in application root

解决方法是将package.json放在与.git同级的文件夹中;


补充:
1.之前使用的: NODE_ENV=test nodemon --exec babel-node server/server.js 是属于nodemon命令的用法, 直接使用node命令的用法是:
NODE_ENV=test babel-node server/server.js

2.如果babel-cli不是在global安装的话, 不会为babel-node自动配置环境变量, 所以如果在项目根目录下直接使用:
NODE_ENV=production babel-node server/server.js

会发生找不到命令的情况, 需要在项目根目录中使用类似:
NODE_ENV=production ./node_modules/babel-cli/bin/babel-node.js server/server.js
这样的命令;

但是如果是在package.json的scripts属性中配置了类似:
"heroku": "NODE_ENV=production babel-node server/server.js"
这样的命令, 那么就不存在全局环境变量的问题, 因为node会根据当前项目配置的环境变量自动查找babel-node命令对应的脚本内容;

3.heroku支持在package.json的scripts中指定babel-node命令(因为它会先安装package.json中的所有依赖包), 所以这里可以直接指定:
"heroku": "NODE_ENV=production babel-node server/server.js"

还有一种更好的做法是, 在本地先使用:
$ babel example.js --out-file compiled.js

将server.js先编译为可以被node命令直接执行的代码, 然后就无需通过babel-node命令来编译执行server.js了;

4.如果在.babelrc中配置:
"presets": [
      "react-app"
    ],

后使用babel-node命令执行server.js文件时还会报类似: 无法执行import语句这样的错误, 那么就需要安装: babel-preset-env

$ npm install babel-preset-env —save

然后修改.babelrc:
"presets": [
      "env",
      "react-app"
    ],
……



后续改进:

1.为了配合online branch中esna项目server.js文件中通过PORT变量来读取当前服务器监听端口的行为, 这里对package.json中的scripts属性进行修改:
……
  "scripts": {
    "start_bak": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom",
    "server": "PORT=9093 NODE_ENV=test nodemon --exec babel-node server/server.js",
    "server_bak": "nodemon server/server.js",
    "start": "PORT=9093 NODE_ENV=production pm2 start server/server.js --name 'esna'",
    "heroku": "NODE_ENV=production babel-node server/server.js"
  },
……

上例中通过在执行server.js文件时传入PORT=9093参数来正确设置服务器监听的端口:
const port = process.env.PORT
const server = app.listen(port, function () {
    console.log(`Node app listening on port ${port}`)
})


修改server/model.js;
……
const DB_URL = process.env.PORT==9093?'mongodb://127.0.0.1:27017/esna':(process.env.MONGOLAB_URI || 'mongodb://jiusong:123456@ds111430.mlab.com:11430/songjiuchongesna')
mongoose.connect(DB_URL)
……

由于目前本地连接mLab远程云数据库存在问题, 所以这里就将其改为访问本地数据库;

2.在移动设备中使用聊天页面输入框时会自动调出移动端默认的软键盘, 此时软键盘会覆盖页面底部的一些内容(包括fixed输入框), 并且使原本设置为fixed的header/footer位置固定失效; 

移动端业务开发，iOS 下经常会有 fixed 元素和输入框(input 元素)同时存在的情况;  但是 fixed 元素在有软键盘唤起的情况下，会出现许多莫名其妙的问题,
参考:
http://efe.baidu.com/blog/mobile-fixed-layout/?utm_source=tuicool&utm_medium=referral

根据上述的改进方法, 修改:

chat.js;
……
componentDidMount(){
    this.props.getMsgList()
    if(!this.props.chat.listenerset){
      this.props.recvMsg()
      this.props.listenerSet()
    }
    document.getElementsByClassName('fixed-header')[0].addEventListener('touchmove', function(e){e.preventDefault();}, false);
    document.getElementsByClassName('stick-footer')[0].addEventListener('touchmove', function(e){e.preventDefault();}, false);
    setTimeout(()=>{
      document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
    },1500)
  }
componentDidUpdate(){
    setTimeout(()=>{
      document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
    },100)
  }
whenFocusOnInput(){
    setTimeout(()=>{
      document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
    },0)
  }
……
<QueueAnim className='chatContent' type='scale' delay={100}>
……


index.css;
……
/*fix IOS fixed header/footer lose efficacy when input elements are used issue in chat page*/
.chatContent {
  /*绝对定位，进行内部滚动*/
  /*margin-top:45; 
  margin-bottom:45;*/
  width: 100%;
  position: absolute;
  top:45px;
  bottom:45px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
} 
……

上面的修改会让原本在chat页面整体上出现的纵向滚动条变为只在.chatContent元素中出现, 但是并没有修复移动端软键盘覆盖页面底部内容的问题, 并且虽然滚动条移到了.chatContent元素中, 在软键盘出现的情况下页面做为一个整体还是可以被纵向滚动, 所以fixed header/footer位置仍旧无法一直固定;

上面由于对.chatContent元素单独设置了overflow-y: scroll, 所以需要添加-webkit-overflow-scrolling: touch 属性才能让ios移动端设备保持滑动的’惯性’; 

-webkit-overflow-scrolling: auto  |  touch;  //这个属性控制元素在移动设备上是否使用滚动回弹效果;
auto： 普通滚动，当手指从触摸屏上移开，滚动立即停止
touch：滚动回弹效果，当手指从触摸屏上移开，内容会保持一段时间的滚动效果，继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文;

需要注意的是, 不存在单独的 overflow-scrolling 属性;

关于-webkit-overflow-scrolling属性与ios滚动的效果问题, 可以参考:
https://www.cnblogs.com/wuyinghong/p/7450041.html?utm_source=debugrun&utm_medium=referral
https://www.cnblogs.com/xiahj/p/8036419.html

很显然在不同的移动设备上, 软键盘弹出(大多数情况下与随之造成的屏幕resize有关)引发的与页面滚动条和fixed样式有关的问题没有一个统一的解决方案, 这里尝试使用iScroll.js来解决这个的问题;

安装iscroll:
$ npm install iscroll —save 
$ npm install react-iscroll —save 

参考:
https://github.com/cubiq/iscroll (iscroll官方github)
http://wiki.jikexueyuan.com/project/iscroll-5/gettingstart.html (中文API)
https://davidwalsh.name/iphone-scrollbars (css sets when use iscroll)
https://github.com/schovi/react-iscroll (react-iscroll 官方github)


由于在项目中使用了SSR, 所以如果直接在项目模块中使用:
import iScroll from 'iscroll'
import ReactIScroll from ‘react-iscroll’

会报错:
/Users/jiusong/mygit/Employment-Social-Networking-App/esna/node_modules/iscroll/build/iscroll.js:2091
})(window, document, Math);
ReferenceError: window is not defined

所以需要使用process对象来判断当前是否处于node环境中;
测试后发现, 无论是iscroll还是react-iscroll, 这两个第三方库都不能在此react项目中实现对.chatContent元素滚动条的单独设置, 但是这里仍旧在代码中保留了对这两个库的使用, 只作为一个参考, 另外对index.css的设置也还原为了不使用iscroll库时的状态;

这里顺便修复了一个功能:
之前在chat页面加载或者update后会将页面滚动条自动设置为滚动到最底端以便查看最新的消息, 但是由于对当前页面消息数量的不确定和QueueAnim这个动画组件对消息元素的延迟显示动画效果, 对设置滚动条的延迟时间也只能使用一个大致的固定值, 这里将修复这个问题, 会根据页面当前将要渲染的消息元素个数来决定设置滚动条的最终延迟时间;

修改chat.js;

import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getMsgList, sendMsg, recvMsg, listenerSet, readMsg, saveDraftMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import QueueAnim from 'rc-queue-anim'

//SSR中跳过对iScroll的设置, 因为会出现window not defined的错误;
const ReactIScroll = process?null:require('react-iscroll')
const iScroll = process?null:require('iscroll')

@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg, listenerSet, readMsg, saveDraftMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text:'',
      showEmoji:false
    }
    this.chatmsgsLength = 0 //此聊天页面中所有需要显示的聊天记录的条数, 用来计算重新调整页面滚动条的等待时间;
    this.alreadyUpdated = false
    const msgDraft = this.props.chat.chatdraft[this.props.match.params.user]
    if(msgDraft)
      this.state.text = msgDraft
  }
  componentDidMount(){
    this.props.getMsgList()
    if(!this.props.chat.listenerset){
      this.props.recvMsg()
      this.props.listenerSet()
    }
    setTimeout(()=>{
      if(document.getElementsByClassName('chatContent')[0])
        document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
    },this.chatmsgsLength*100)
  }
  componentWillUnmount(){
    const to = this.props.match.params.user
    this.props.readMsg(to)
    //聊天输入框未发送消息草稿保存
    const chatDraft = this.state.text
    this.props.saveDraftMsg(to, chatDraft)
  }
  componentDidUpdate(){
    //如果是首次带有聊天数据的update(this.chatmsgsLength>0), 那么要等待所有聊天消息显示完成后再调整滚动条, 如果是接收新消息的更新则等待时间固定;
    if(this.alreadyUpdated){
      setTimeout(()=>{
        if(document.getElementsByClassName('chatContent')[0])
          document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
      },200)
    }else if(this.chatmsgsLength>0){
      setTimeout(()=>{
        if(document.getElementsByClassName('chatContent')[0])
          document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
      },this.chatmsgsLength*100)
      this.alreadyUpdated = true
    }
  }
  whenFocusOnInput(){
    setTimeout(()=>{
      // document.documentElement.scrollTop = 10000 //for chrome
      // document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
      document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
    },0)
  }
  //修正antd-mobile的Grid组件Carousel的问题
  fixCarousel(){
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text:''})
  }
  render(){

    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤔 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢 😭'
      .split(' ').filter(v=>v).map(v=>({text:v}))

    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users

    if(!users[userid]){
      return null
    }

    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid == chatid)
    this.chatmsgsLength = chatmsgs.length
    const redirect = this.props.user.redirectTo
    return (
      
      <div id='chat-page'>
        {redirect&&redirect.indexOf('info')!=-1?<Redirect to={redirect}/>:null}
        <NavBar 
          className='fixed-header'
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {process?
          <QueueAnim className='chatContent' type='scale' delay={100}>
              {chatmsgs.map(v=>{
                const avatar = require(`../img/${users[v.from].avatar}.png`)
                return v.from == userid?(
                  <List key={v._id}>
                    <Item
                      thumb={avatar}
                      className='chat-who'
                      wrap
                      style={{wordWrap:'break-word'}}
                    >{v.content}</Item>
                  </List>
                ):(
                  <List key={v._id}>
                    <Item 
                      extra={<img src={avatar} alt=''/>}
                      className='chat-me'
                      wrap
                      style={{wordWrap:'break-word'}}
                    >{v.content}</Item>
                  </List>
                )
              })}
          </QueueAnim>:
          <ReactIScroll iScroll={iScroll}>
            <QueueAnim className='chatContent' type='scale' delay={100}>
                {chatmsgs.map(v=>{
                  const avatar = require(`../img/${users[v.from].avatar}.png`)
                  return v.from == userid?(
                    <List key={v._id}>
                      <Item
                        thumb={avatar}
                        className='chat-who'
                        wrap
                        style={{wordWrap:'break-word'}}
                      >{v.content}</Item>
                    </List>
                  ):(
                    <List key={v._id}>
                      <Item 
                        extra={<img src={avatar} alt=''/>}
                        className='chat-me'
                        wrap
                        style={{wordWrap:'break-word'}}
                      >{v.content}</Item>
                    </List>
                  )
                })}
            </QueueAnim>
          </ReactIScroll>
        }
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              onFocus = {
                v=>{
                this.whenFocusOnInput()
              }}
              extra={[<span 
                    key='1'
                    style={{marginRight:15}}
                    onClick={()=>{
                      this.setState({showEmoji:!this.state.showEmoji})
                      this.fixCarousel()
                    }}
                    role='img'
                    aria-label='emoji'
                  >😀</span>,
                  <span key='2' onClick={()=>this.handleSubmit()}>发送</span>
              ]}
            ></InputItem>
          </List>
          {this.state.showEmoji?
            <Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el=>{
              this.setState(
                {text:this.state.text+el.text}
              )
            }}
          />:null}
        </div>
      </div>
    )
  }
}

export default Chat


接着尝试对输入框focus事件监听来改变其position的值, 并对其使用scrollIntoView()方法, 但是在移动端还是没有完全修复之前提到的问题;

修改chat.js;
……
updateDimensions1(){
    setTimeout(()=>{
      document.getElementsByClassName('stick-footer')[0].style.position = 'absolute'
      document.getElementsByClassName('stick-footer')[0].scrollIntoView()
      document.documentElement.scrollTop = 10000 //for chrome
      document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
    },300)
  }
  updateDimensions2(){
    document.getElementsByClassName('stick-footer')[0].style.position = 'fixed'
  }
  componentDidMount(){
    this.props.getMsgList()
    if(!this.props.chat.listenerset){
      this.props.recvMsg()
      this.props.listenerSet()
    }
    setTimeout(()=>{
      if(document.getElementsByClassName('chatContent')[0])
        document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
    },this.chatmsgsLength*100)
    //监听由聚焦输入框后移动端软键盘的弹出;
    setTimeout(()=>{
      if(document.getElementsByClassName('stick-footer')[0]){
        document.getElementsByClassName('stick-footer')[0].addEventListener("focus", this.updateDimensions1,true)
        document.getElementsByClassName('stick-footer')[0].addEventListener("blur", this.updateDimensions2,true)
      }
    },500)
  }
  componentWillUnmount(){
    const to = this.props.match.params.user
    this.props.readMsg(to)
    //聊天输入框未发送消息草稿保存
    const chatDraft = this.state.text
    this.props.saveDraftMsg(to, chatDraft)
    //移除监听由聚焦输入框后移动端软键盘的弹出;
    document.getElementsByClassName('stick-footer')[0].removeEventListener("focus", this.updateDimensions1,true)
    document.getElementsByClassName('stick-footer')[0].removeEventListener("blur", this.updateDimensions2,true)
  }
……

上例中需要注意的是, 使用addEventListener方法绑定focus/blur方法必须传入第三个参数为true, 因为这两种监听不支持冒泡, 需要通过捕获阶段来触发, 另外在执行
removeEventListener方法时同样需要传入第三个参数为true; 
支持冒泡的事件是focusin和focusout; 对于同时支持这4个事件的浏览器，事件执行顺序为focusin > focus > focusout > blur ; 

参考:
https://www.cnblogs.com/wangyihong/p/7514304.html (移动端软键盘监听（弹出，收起），及影响定位布局的问题)
https://segmentfault.com/a/1190000003942014 (focus /focusin /focusout /blur 事件区别)


研究后, 发现了这个移动端软键盘弹出引发显示问题的一种修复方法:
在移动端, 当用户focus在输入框时, 对.stick-footer和.chatContent的位置进行调整, 使得软键盘的高度不会覆盖到这两个元素(这里暂时只能保证iPhone7p中适配), 将.chatContent元素滚动条设置到了最底端(保证用户可以查看当前最新的消息), 并且禁用了页面中的touchmove事件, 因为软键盘的弹出会导致整个页面在header/footer无法固定的情况下可以上下滚动(对整个页面使用overflow:hidden, position:fixed等方式无效), 所以只能通过禁用touchmove事件来防止页面的滚动; 而由于在调整了软键盘弹出时元素的位置的情况下header/footer都能够显示在正确的位置, 所以这里禁用了touchmove事件后用户体验得到了较大提升;
当然在输入框blur时, 由于软键盘会自动收起, 所以这里会将之前调整了位置的.stick-footer和.chatContent元素还原, 并且停止对touchmove事件的禁用;
需要注意的是, 这里模仿了微信中软键盘弹出后用户滑动页面时的效果: 一旦有滑动的动作就让输入框blur(滑动动作本身不会生效); 还需要注意的是, 这里必须对input元素本身而非其父元素执行blur()方法才会生效;

修改chat.js;
……
  preHandler(e){
    e.preventDefault()
    document.getElementsByClassName('stick-footer')[0].getElementsByTagName('input')[0].blur()
  }
  updateDimensions1(thisComponent){
    if(this.state.showEmoji)
        document.getElementsByClassName('emojiBtn')[0].click()
    setTimeout(()=>{
      document.getElementsByClassName('stick-footer')[0].style.position = 'absolute'
      document.getElementsByClassName('stick-footer')[0].scrollIntoView()
      document.getElementsByClassName('stick-footer')[0].style.bottom = '258px'
      document.getElementsByClassName('chatContent')[0].style.bottom = '300px'
      document.getElementsByClassName('chatContent')[0].scrollTo(0,10000)
      document.addEventListener('touchmove', thisComponent.preHandler, false)
    },300)
  }
  updateDimensions2(thisComponent){
    setTimeout(()=>{ //这里使用setTimout是因为
      document.getElementsByClassName('stick-footer')[0].style.position = 'fixed'
      document.getElementsByClassName('stick-footer')[0].style.bottom = '0'
      document.getElementsByClassName('chatContent')[0].style.bottom = '45px'
      document.removeEventListener('touchmove', thisComponent.preHandler, false)
    },200)
  }
  componentDidMount(){
    this.props.getMsgList()
    if(!this.props.chat.listenerset){
      this.props.recvMsg()
      this.props.listenerSet()
    }
    setTimeout(()=>{
      if(document.getElementsByClassName('chatContent')[0])
        document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
    },this.chatmsgsLength*100)
    //移动端时, 监听由聚焦输入框后引发的软键盘弹出, 然后进行一些对应的处理;
    if(navigator.userAgent.indexOf("Android")>0 || navigator.userAgent.indexOf("iPhone")>0 || navigator.userAgent.indexOf("iPad")>0){
      let timer = setInterval(()=>{
        if(document.getElementsByClassName('stick-footer')[0]){
          document.getElementsByClassName('stick-footer')[0].addEventListener("focus", ()=>{this.updateDimensions1(this)},true)
          document.getElementsByClassName('stick-footer')[0].addEventListener("blur", ()=>{this.updateDimensions2(this)},true)
          clearInterval(timer)
        }
      },200)
    }
  }
  componentWillUnmount(){
    const to = this.props.match.params.user
    this.props.readMsg(to)
    //聊天输入框未发送消息草稿保存
    const chatDraft = this.state.text
    this.props.saveDraftMsg(to, chatDraft)
    //移除监听聚焦输入框后移动端软键盘的弹出;
    document.getElementsByClassName('stick-footer')[0].removeEventListener("focus", this.updateDimensions1,true)
    document.getElementsByClassName('stick-footer')[0].removeEventListener("blur", this.updateDimensions2,true)
  }
……
  whenFocusOnInput(){
    setTimeout(()=>{
      // document.documentElement.scrollTop = 10000 //for chrome
      // document.getElementsByTagName("body")[0].scrollTop = 10000 //for safari
      document.getElementsByClassName('chatContent')[0].scrollTop = 10000 //for both chrome&safari
    },0)
  }
……
    <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              onFocus = {
                v=>{
                this.whenFocusOnInput()
              }}
              extra={[<span 
                    key='1'
                    style={{marginRight:15}}
                    className = 'emojiBtn'
                    onClick={()=>{
                      if(!this.state.showEmoji){
                        setTimeout(()=>{ //这里使用setTimeout是因为之前在updateDimensions2这个onblur事件的执行函数中对.chatContent元素设置了bottom为45px, 这里需要保证在其之后执行;
                          document.getElementsByClassName('chatContent')[0].style.bottom = '223px'
                          document.getElementsByClassName('chatContent')[0].scrollTo(0,10000)
                        },201)
                      }else{
                        document.getElementsByClassName('chatContent')[0].style.bottom = '45px'
                      }
                      this.setState({showEmoji:!this.state.showEmoji})
                      this.fixCarousel()
                    }}
                    role='img'
                    aria-label='emoji'
                  >😀</span>,
                  <span key='2' onClick={()=>this.handleSubmit()}>发送</span>
              ]}
            ></InputItem>
          </List>
……

需要注意的是, 上例中在updateDimensions2方法中使用了setTimeout是因为当用户点击发送或者emoji按钮时会先触发blur事件(因为click事件要经历mousedown和mouseup才会触发, 而blur事件相当于在mousedown阶段就会触发), 而blur事件的处理函数会对相关元素的位置进行调整, 所以就无法触发接下来的点击事件了, 
解决方法:
(1)如果click事件比blur事件早触发就没有问题了, 所以可以给blur事件加一个时间（延迟触发）,如：setTimeout(fn, 250);
(2)添加mouseover，mouseout ; 前者删除blur事件，后者添加回来; 鼠标在click执行之前先执行了mouseover事件, 所以就不会触发blur事件了, 点击完成后, mouseout再把blur添加回来就行了; 相当于不让点击指定按钮这个动作触发blur;

参考:
https://www.zhihu.com/question/29623049 (如何解决blur事件和click事件的冲突)


上例中还解决了当emoji表情选项框弹出后会覆盖部分聊天消息内容的问题, 这里使用了和之前处理输入框focus事件类似的解决方法通过this.state.showEmoji判断表情选择框是否弹出, 如果弹出就强制调整.chatContent元素的位置, 当用户将表情选择框关闭后会恢复.chatContent元素的位置; 
并且当用户focus输入框时会自动将已弹出的表情选择框关闭, 这是为了避免移动端软键盘与表情选择框同时出现的情况(因为用户体验会受影响);
由于当用户打开表情选择框的同时会触发blur事件(也就是说, 这种情况下是不会出现软键盘与表情选择框同时出现的情况的), 所以需要对其引发的位置调整设置延迟以达到先让blur事件执行函数先执行(将.stick-footer和.chatContent元素位置调整完之后), 再将.chatContent元素重新调整位置的目的;

上述设计达到的效果是: 表情选择框在打开的状态下输入框一定不会有聚焦, 在输入框有聚焦的情况下表情选择框一定是关闭的;

需要注意的是, 在某个元素上手动执行.click()方法是不会触发设置在其它元素上的blur事件的, 手动触发的元素交互事件都是相对独立的, 所以不会造成连锁反应;


其它参考:
https://blog.csdn.net/peter_qyq/article/details/53034467 (使用navigator.userAgent来判断PC/移动端和浏览器类型)
http://www.caihaibo.cn/devpro/webfront/3938.html (禁用与启用手机端页面的 touchmove 事件)


![](./dev_memo_img/187.png)

![](./dev_memo_img/188.png)

![](./dev_memo_img/189.png)



heroku:
https://songjiuchongesna.herokuapp.com/login





