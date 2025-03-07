import { Note } from "../schema/note";
import { connectToDatabase } from "../utils/db";

exports.handler = async (event)=>{
   try {
        await connectToDatabase();

        const {httpMethod} = event;
        
        if(httpMethod==="GET"){
            const notes = await Note.find();
            return {
                statusCode:200,
                body:JSON.stringify({data:notes})
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