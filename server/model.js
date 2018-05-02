const mongoose = require('mongoose')

//连接mongo, 并且使用esna这个数据库(如果不存在会新建);
const DB_URL = process.env.MONGOLAB_URI || 'mongodb://jiusong:123456@ds111430.mlab.com:11430/songjiuchongesna'
mongoose.connect(DB_URL)

const models = {
	user:{
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
	},
	chat:{
		'chatid': {'type':String, 'require':true},
		'from':{'type':String, 'require': true},
		'to':{'type':String, 'require': true},
		'read':{'type':Boolean, 'default':false},
		'content':{'type':String, 'require':true, 'default':''},
		'create_time': {'type':Number, 'default': new Date().getTime()},
		'removed': {'type':String, 'default':''}
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