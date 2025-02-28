import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-12 col-sm-6 col-lg-3 my-4">
      <div className="card " style={{"background-color": "rgb(229, 133, 176)"}}>
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <h6 className="card-subtitle mb-2">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
          <div classNam="d-flex flex-row-reverse">
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully", "success");
            }} style={{"color": "red"}}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }} style={{"color": "blue"}}
          ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
