const MongoClient =require('mongodb').MongoClient

const mongo_url='mongodb://localhost:27017/';
const dbname='myproject'

const client= new MongoClient(mongo_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

client.connect()
/*.then(()=>{
 const db=client.db(dbname)
  
  const user=db.collection('user')
  const list=db.collection('list')
  const mesg=db.collection('mesg')
  const announcement=db.collection('announcement')
  
})*/
module.exports=client.db(dbname)