import { Note } from "../schema/note";
import { connectToDatabase } from "../utils/db"

exports.handler = async (event)=>{
   try {
    await connectToDatabase();

    const {httpMethod,body}=event;

    if(httpMethod==="POST"){
        const {title}=JSON.parse(body);

        const newNote = new Note({title,content:""})
        await newNote.save()

        return {
            statusCode:200,
            body:JSON.stringify({data:newNote})
        }
    }
    return{statusCode:405, body:"Method not allwed"}
   } catch(error){
    console.error("Error",error);
    return{
        statusCode: 500,
        body: JSON.stringify({error:"Internal server error"})
    }
   }
}