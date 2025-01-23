import noteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="https://NoteSync-rsie.vercel.app"
    const notesInitial=[]
    const [notes,setNotes]=useState(notesInitial)
    
    //get all Note
    const getNotes=async()=>{
      //todo API Call
      const response = await fetch(`${host}/api/notes/fetch all notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authToken":localStorage.getItem('token')
        }
      });
      const json=await response.json();
      setNotes(json)
      
    }

    //Add a Note
      const addNote=async(title,description,tag)=>{
        //todo API Call
        const response = await fetch(`${host}/api/notes/add note`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authToken":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const note=await response.json();
        setNotes(notes.concat(note))
      }

    //Delete a Note
    const deleteNote=async(id)=>{
      const response = await fetch(`${host}/api/notes/delete note/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authToken":localStorage.getItem('token')
        }
      });
      // eslint-disable-next-line
        const json=await response.json();
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    //Edit a Note
    const editNote=async(id,title,description,tag)=>{
      //API CALL
      const response = await fetch(`${host}/api/notes/update note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authToken":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), 
      });
      
      
      let newNotes=JSON.parse(JSON.stringify(notes))
      //Logic to edit in client
        for (let index = 0; index <newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
          
        }
        // eslint-disable-next-line
        const json=await response.json();
        setNotes(newNotes);
    }
    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;


  

