const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const User = model.getModel('user')

const app = express();
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
	socket.on('sendmsg', function(data){
		const {from, to, msg} = data
		const chatid = [from, to].sort().join('_')
		Chat.create({chatid, from, to, content:msg}, function(err, doc){
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

server.listen(9093,function(){
	console.log('Node app start at port 9093')
})
