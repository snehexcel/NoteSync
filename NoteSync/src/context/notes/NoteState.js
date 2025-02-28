import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://NoteSync-rsie.vercel.app";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const note = await response.json();
      setNotes([...notes, note]); // Better syntax for updating state
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );

      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
