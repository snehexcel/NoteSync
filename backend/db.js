const mongoose=require('mongoose');
//const mongooseURI="mongodb://127.0.0.1:27017/snehadataBase1";
//console.log(mongooseURI);
const dotenv = require('dotenv');
dotenv.config();

const connectToMongo=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/NoteSyncDb")
    .then(()=>{
        console.log("connected to mongodb server");
    })
    .catch((error)=>{
        console.error("Error connecting to MongoDb:",error.message)
    });
}
module.exports=connectToMongo;
