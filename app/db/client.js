const MongoClient =require('mongodb').MongoClient
const mongo_url='mongodb://localhost:27017';
const dbname="myproject" 
var client =new MongoClient(mongo_url,{useNewUrlParser: true,useUnifiedTopology: true})
client.connect().then(()=>{ 
    //module.exports=client.db(dbname)
    console.log('success')
    /*const list=db.collection('list')
    const mesg=db.collection('mesg')
    const announcement =db.collection('announcement')
    */
   
})
module.exports=client;

/*
var db = null;
module.exports = {
init: function () {
if (db === null) {
db = client.connect();
if (!db) {
console.log('err')
}
}
return db;
}
};
*/
