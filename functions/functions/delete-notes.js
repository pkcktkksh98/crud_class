import { Note } from "../schema/note";
import { connectToDatabase } from "../utils/db"

exports.handler = async (event)=>{
   try {
    await connectToDatabase();

    const {httpMethod,queryStringParameters}=event;

    if(httpMethod==="DELETE"){
        const {id} = queryStringParameters
        const deleteNote = await Note.findByIdAndDelete(id);
        
        if(!deleteNote){return{statusCode:404, body:"Note not found"}}
        
        return {
            statusCode:200,
            body:JSON.stringify({message:"Note is successfully deleted"})
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