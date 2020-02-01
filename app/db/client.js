const MongoClient =require('mongodb').MongoClient
const mongo_url='mongodb://localhost:27017';

const client =new MongoClient(mongo_url,{useNewUrlParser: true})

client.connect().then((err)=>{
  if(err) throw err;
  else{
    console.log('success')
  }
})
module.exports=client;




