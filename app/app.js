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
      |         |
      |         |---/accept        \
      |         | ---/announcement  }   admin   //在router下的admin.js 里面挂了admin文件夹下的三个路由
      |         | ---/mesg          /
      |
      |  ---/signin
      |  ---/signup

      以及某些API的修改（已经联系前端）
      修改了后端监听的端口：由3000 --> 8080
      session的使用，建立会话，打算对于每一个信息提交，信息查看的页面，先确认session状态，
      对于已经登陆的用户不提供注册窗口，对于未登录的用户，无法查看个人信息以及无法 apply 和发布mesg
      正在实现此功能，预计下一步，把注释完善，对于apply，和发布mesg部分进行测试完善（加入实验用的简陋的HTML测试）
      不知道何时可以开始和前端来一次会和，预计在写完注释等之后。
      
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


app.all('/home/*',function(req,res){
  if(!req.session.username){
    res.redirect('http://localhost:8080/signin')
  }
});
//对于跳转info界面，应该是这里有问题。路由挂载没有错，
//仅仅是我的一个实验而已，不用在意


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
