const express = require('express');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const User = require('../models/User');
//Route :1 get all the notes by fetch api http://localhost:5000/api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser,
    async (req, res) => {
        try {

            const notes = await Note.find({ userId: req.user });
            res.status(201).json(notes)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occured")
        }
    })
// router to get information 
router.get('/getuserdata', fetchuser, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.verifyUser._id })
        res.status(201).json(user)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
})
//Route :2 Add the notes : http://localhost:5000/api/notes/addnote
router.post("/addnote", fetchuser,
    [
        body('title', 'Must be atleast 3 character').isLength({ min: 3 }),
        body('description', 'Must be atleast 5 character').isLength({ min: 5 }),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body;
            const note = await Note.create({
                userId: req.user,
                title: title,
                description: description,
                tag: tag,
            })
            const savedNotes = await note.save();
            res.json(savedNotes)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occured")
        }

    })
// Route :4 update the existing notes : http://localhost:5000/api/notes/updatenote/:id
router.put("/updatenote/:id", fetchuser,
    async (req, res) => {
        try {
            // allow the user to newnote
            const { title, description, tag } = req.body;
            const newNote = {}
            if (title) {
                newNote.title = title
            }
            if (description) {
                newNote.description = description
            }
            if (tag) {
                newNote.tag = tag
            }
            // allow the user to update its own note
            let note = await Note.findById(req.params.id)

            if (!note) { return res.status(401).send('not found') }
            if (note.userId.toString() !== req.user._id) {
                return res.status(402).send('not found')
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

            res.json({ note })
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occured")
        }
    })
// Route :4 update the existing notes : http://localhost:5000/api/notes/deltnote/:id
router.delete("/deltnote/:id", fetchuser,
    async (req, res) => {
        try {
            // allow the user to delete its own note
            let note = await Note.findById(req.params.id)
            if (!note) { return res.status(401).send('not found') }
            if (note.userId.toString() !== req.user._id) {
                return res.status(402).send('not found')
            }
            //allow to delete the not
            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "success": "Your Note has been Deleted", note: note })
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occured")
        }


    })
module.exports = router