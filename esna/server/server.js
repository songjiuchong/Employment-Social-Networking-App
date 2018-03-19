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
User.create({
	user:'imooc',
	age:'a'
},function(err, doc){
	if(!err){
		console.log(doc)
	}else{
		console.log(err)
	}
})

//删除数据;
// User.remove({age:18},function(err,doc){
// 	console.log(doc)
// })

//更新数据;
// User.update({'age':'18'},{'$set':{user:'x'}},function(err,doc){
// 	console.log(doc)
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
