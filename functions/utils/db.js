const mongoose = require('mongoose');

let conn = null;

export async function connectToDatabase(){
    if(!conn){
        conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Connected to MongoDB")
    }    
    return conn;
}