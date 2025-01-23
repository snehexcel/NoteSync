import React, { useEffect, useRef ,useState} from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate=useNavigate();
  const { notes, getNotes ,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});

  };

  const ref = useRef(null);
  const refClose=useRef(null);
  const [note,setNote]=useState({id:"", etitle:"",edescription:"",etag:""});

  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.tag);
    refClose.current.click();
    props.showAlert("Updated Successfully","success")

  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade "
        //style={{"btn-border-color": "#fff","btn-color":" #fff", "btn-bg": "#6c757d03"}}
        id="exampleModal"
        tabIndex="-1"
        aria-labeledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header " style={{"background-color": "#304458"}}>
              <h1 className="modal-title fs-5 text-center text-light" id="exampleModalLabel">
                Edit Your Note
              </h1>
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close "
              ></button>
            </div>
            <div className="modal-body  " style={{"border-radius": "0rem", "background-color": "#9ab0c6"}}>
              <form className="my-3">
                <div className="mb-3 form-outline form-white mb-4 mx-4">
                  <label htmlFor="title" className="form-label text-light" >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    placeholder="Title (min length 5 character)"
                    minLength={3} required
                  />
                </div>
                <div className="mb-3 form-outline form-white mb-4 mx-4">
                  <label htmlFor="description" className="form-label text-light">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={3} required
                  />
                </div>
                <div className="mb-3 form-outline form-white mb-4 mx-4">
                  <label htmlFor="tag"className="form-label text-light" >
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={3} required
                  />
                </div>
                
              </form>
            </div>
            <div className="modal-footer" style={{"background-color": "#304458"}}>
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<3 || note.edescription.length<3 } onClick={handleClick}type="button" className="btn btn-outline-light btn-sm ">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" row my-3">
        <h1><span style={{"color": "white"}}>Your Notes</span></h1>
        <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note, addNote) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
