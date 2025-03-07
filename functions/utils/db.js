const mongoose = require('mongoose');

let conn = null;

export async function connectToDatabase(){
    if(!conn){
        console.log(process.env.MONGO_URI)
        conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Connected to MongoDB")
    }    
    return conn;
}