import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'
const Chat = model.getModel('chat')
const User = model.getModel('user')
import path from 'path'

//https://github.com/css-modules/css-modules-require-hook
import csshook from 'css-modules-require-hook/preset'
//https://github.com/aribouius/asset-require-hook
import assethook from 'asset-require-hook'
assethook(
	{extensions:['png']}
)

import React from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import App from '../src/container/app/app'
import {renderToString, renderToNodeStream} from 'react-dom/server'
import reducers from '../src/reducer'
import staticPath from '../build/asset-manifest.json'

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
	// const markup = renderToString(
	// 	(<Provider store={store}>
	// 		<StaticRouter
	// 			location={req.url}
	// 			context={context}
	// 		>
	// 			<App></App>
	// 		</StaticRouter>
	// 	</Provider>)
	// )
	
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

	
	// const pageHtml = `<!DOCTYPE html>
	// 					<html lang="en">
	// 						<head>
	// 							<meta charset="utf-8">
	// 							<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
	// 							<meta name="theme-color" content="#000000">
	// 							<title>React App</title>
	// 							<link href="/${staticPath['main.css']}" rel="stylesheet">
	// 							<meta name='description' content='${seoDescription[req.url]}'>
	// 						</head>
	// 						<body>
	// 							<noscript>You need to enable JavaScript to run this app.</noscript>
	// 							<div id="root">${markup}</div>
	// 							<script type="text/javascript" src="/${staticPath['main.js']}"></script>
	// 						</body>
	// 					</html>`

	// return res.send(pageHtml)
})
app.use('/',express.static(path.resolve('build')))

// server.listen(9093,function(){
// 	console.log('Node app start at port 9093')
// })

  // 监听端口，启动程序
  const port = process.env.PORT
  app.listen(port, function () {
    console.log(`Node app listening on port ${port}`)
  })
