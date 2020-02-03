const MongoClient =require('mongodb').MongoClient
const mongo_url='mongodb://localhost:27017';
const dbname="myproject" 
const client =new MongoClient(mongo_url,{useNewUrlParser: true,useUnifiedTopology: true})
client.connect().then((err)=>{
    if(err) throw err;
    else{
        console.log('success')
    }
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
