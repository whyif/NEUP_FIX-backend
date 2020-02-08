const MongoClient =require('mongodb').MongoClient
const mongo_url='mongodb://localhost:27017';
const dbname="myproject" 
var client =new MongoClient(mongo_url,{useNewUrlParser: true,useUnifiedTopology: true})

client.connect().then(()=>{ 
    console.log('success')
})
module.exports=client;

//此处负责数据库的连接，同时暴露client使得他能够在其他路由里被require，并且进行collectio
//在/router/user  和  /router/admin下放着的二级路由内有引用
//在/router/sign内也有引用
