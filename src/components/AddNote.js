import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import background from "../images/book.png"

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully","success")

  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    
    <div className="container">
    <div className="row">
    <div class="col-sm-6">
  <img className='img-fluid' src={background} alt="book"  />
  </div>
    <div className=" col-sm-4" style={{"borderRadius": "1rem", "backgroundColor": " #FACBEA"}}>
       <form className="my-3">
        <div className="mb-md-5 mt-md-4 pb-5 ">
        <h2 class="fw-bold mb-2  text-center">NoteSync</h2>
        <p class="text-black mb-5 text-center">Please enter your note!</p>
        <div className="form-outline form-white mb-4">
          <label htmlFor="title" className="form-label text-black">
            Title
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
            placeholder="Title (min length 5 character)"
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label text-black">
            Description
          </label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="Description"
            name="description"
            value={note.description}
            onChange={onChange}
            placeholder="Description (minimum length 10)"
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label text-black">
            Tag
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            placeholder="Tag"
            minLength={3}
            required
          />
        </div>
        <div className="text-center">
        <button
          disabled={
            note.title.length < 3 ||
            note.description.length < 3 ||
            note.tag.length < 3
          }
          type="submit"
          className="btn btn-outline-dark btn-lg px-5 text-dark"
          onClick={handleClick}
        >
          Add Note
        </button>
        </div>
        </div>
      </form>
      </div>
    </div>
    </div> 
    

  );
};

export default AddNote;
