import { Note } from "../schema/note";
import { connectToDatabase } from "../utils/db"

exports.handler = async (event)=>{
   try {
    await connectToDatabase();
    const {httpMethod,queryStringParameters}=event;
    if(httpMethod==="GET"){
        const {id} = queryStringParameters
        const note = await Note.findById(id);
        return {
            statusCode:200,
            body:JSON.stringify({data:note})
        }
    }
    return{statusCode:405, body:"Method not allowed"}
   } catch(error){
    console.error("Error",error);
    return{
        statusCode: 500,
        body: JSON.stringify({error:"Internal server error"})
    }
   }
}