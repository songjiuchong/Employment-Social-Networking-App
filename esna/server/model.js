const mongoose = require('mongoose')

//连接mongo, 并且使用esna这个集合(如果不存在会新建);
const DB_URL = 'mongodb://127.0.0.1:27017/esna'
mongoose.connect(DB_URL)