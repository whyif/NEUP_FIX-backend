const express = require('express')
const bodyParser =require('body-parser')
const session=require('express-session')
const path=require('path')
const ejs=require('ejs')
const app = express()



/*

我自己添加了几个测试用的页面，在views文件夹
路由结构为:
      /  --- /home ---/apply        \
      |         | ---/info           }  user  //在router下的user.js 里面挂了user文件夹下的三个路由
      |         | ---/mesg          /
                |
                | ---/accept        \
                | ---/announcement  }   admin   //在router下的admin.js 里面挂了admin文件夹下的三个路由
                | ---/mesg          /
      |
      |  ---/signin
      |  ---/signup

      暂时只进行了语法上错误的排除，以及某些API的修改（已经联系前端）
      修改了后端监听的端口：由3000 --> 8080
      对应数据库还没有进行相应的调整，暂时搁置在db文件夹，今晚应该可以调整完毕。
*/

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:1000*60*20},
  rolling:true
}))


app.use(express.static(path.join(__dirname, 'public')));


app.set('views',path.join('views'))
app.engine('html',ejs.renderFile)
app.set('view engine','html');//渲染模板

/*
app.all('*',function(req,res){
  if(req.session.username){
    res.render('*',{username:req.session.username})
  }else{
    res.redirect('/signin')
  }
});
*/


app.get('/home',function(req,res){
  res.render('home')
})


/*主页,返回所有公告
app.get('/home',function(req,res){
        announcement.find({}).toArray().then((result)=>{
            if(result==null){
                res.status(404).end()
            }else{
                res.status(200).end()
            }
        })
    }) 
*/

app.use('/',require('./routes/sign'))
app.use('/home',require('./routes/admin'))
app.use('/home',require('./routes/user'))
console.log('http://localhost:8080/home')


module.exports = app
