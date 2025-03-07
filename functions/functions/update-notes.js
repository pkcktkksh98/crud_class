import { Note } from "../schema/note";
import { connectToDatabase } from "../utils/db"

exports.handler = async (event)=>{
   try {
    await connectToDatabase();

    const {httpMethod,body,queryStringParameters}=event;

    if(httpMethod==="PUT"){
        const{ id } = queryStringParameters;
        const {title,content}=JSON.parse(body);

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {title,content},
            {new:true}
        )

        if(!updatedNote) return {statusCode: 404, body:"Note not found"};

        await newNote.save()

        return {
            statusCode:200,
            body:JSON.stringify({data: updatedNote})
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