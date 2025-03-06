import {createServer,Server} from 'miragejs';
import {Model} from 'miragejs';
import { TNote } from '../types/notes';
import { notes } from '../constants/note.constant';

export const mirageModel ={
    note: Model.extend<Partial<TNote>>({})
}

declare global{
    interface Window{
        server?:Server
    }
}
export const createMockServer =()=>{
    if(window.server){
        window.server.shutdown()
    }

    const server = createServer({
        timing:800,
        models:mirageModel,
        seeds(server){
            server.db.loadData({
                notes
            })
        },
        namespace:"/",
        routes(){
            //noteRoutes(this);
            this.get(
                '/notes',
                (schema)=>{
                    const notes = schema.db.notes as TNote[];

                    return{
                        data: notes
                    }
                }
            )
            this.get(
                '/notes/:id',(schema,request)=>{
                    const id = request.params.id;
                    const result = schema.db.notes.findBy({id})as TNote;

                    return{
                        data:{
                            ...result
                        }
                    }
                }
            )
            this.post("/notes",(schema,request)=>{
                const body = JSON.parse(request.requestBody) as Omit<TNote,"id"|"content">

                const notes = schema.db.notes as TNote[]

                const data = {
                    ...body,
                    content:"",
                    id:notes.length+2
                }
                server.db.notes.insert(data)

                return{
                    data
                }
            })
            this.delete("/notes/:id",(schema,request)=>{
                const id = request.params.id;

                //@ts-expect-error Ignore
                const result = schema.notes.findBy({id})
                result.destroy();
                return{
                    data:{
                        isSuccess: true
                    }
                }
            })
            this.put(
                "/notes/:id",
                (schema,request)=>{
                    const noteId = request.params.id;
                    const attrs = JSON.parse(request.requestBody);

                    const note = schema.db.notes.findBy({id:noteId})
                    schema.db.notes.update(noteId,attrs);
                    return{
                        data:{
                             ...note,
                             ...attrs
                        },
                    }
                }
            )
        }
    })
    window.server= server;

    // Fix for axios not resolving with Mirage
    const NativeXMLHttpRequest = window.XMLHttpRequest;

    // @ts-expect-error Ignore
    window.XMLHttpRequest = function XMLHttpRequest(){
        
        // @ts-expect-error Ignore
        const request = new NativeXMLHttpRequest(arguments);

        // @ts-expect-error Ignore
        delete request.onloadend;
        return request;
    }

    return server;
} 
