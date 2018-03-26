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