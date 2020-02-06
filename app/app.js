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

/*--保证进行/home下挂的路由的程序运行要在建立会话后，登陆完毕后的一段时间-- */
app.all('/home/*',function(req,res,next){
  if(!req.session.username){
    res.redirect('/signin')
  }
  
});



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



/*
挂三个路由
从router根目录下下放了一级路由（请允许我这么说）

*/
app.use('/',require('./routes/sign'))
app.use('/home',require('./routes/admin'))
app.use('/home',require('./routes/user'))
console.log('http://localhost:8080/home') //这只是为了方便打印的一句话


module.exports = app 
//使得app能暴露，实际上是用www作为端口监听以及引入app进行调试等 /：我的理解能力仅此而已，也没有去具体查
