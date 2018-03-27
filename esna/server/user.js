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