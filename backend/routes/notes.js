const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route1: Get all the notes: GET "/api/notes/getuser". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

//Route2: Add a new note using: POST "/api/notes/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title.").isLength({ min: 3 }),
    body("description", " Description must be atleast 10 characters.").isLength(
      { min: 10 }
    ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//Route2: Update an exsiting note using: PUT "/api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //sbse phale jo jo cheez required hai usko le krr aao

    //create a new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    } //agrr title ka request aa rha hai update krne ke liyee tbhi upate karoo
    if (description) {
      newNote.description = description;
    } //agrr description ka request aa rha hai update krne ke liyee //tbhi upate karoo
    if (tag) {
      newNote.tag = tag;
    } //agrr tag ka request aa rha hai update krne ke liyee tbhi upate karoo

    //find the note to be updated
    //sbse phale check karoo kii wo hii user hai naa jiska note update krnaa chahta hai aisaa naa ho kii kisii aur user ka note koi aur user update krr de
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //some other person is trying to enter in others notes
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    ); //from this statement note will be updated
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

//Route3: Delete an exsiting note using: DELETE "/api/notes/deletenote". login required
router.delete("/delete note/:id", fetchuser, async (req, res) => {
  //sbse phale jo jo cheez required hai usko le krr aao
  try {
    //find the note to be updated and delete it
    //sbse phale check karoo kii wo hii user hai naa jiska note update krnaa chahta hai aisaa naa ho kii kisii aur user ka note koi aur user update krr de
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Allow deletion only if user owns this Note
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id); //from this statement note will be updated
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});


module.exports = router;
