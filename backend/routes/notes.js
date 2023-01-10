const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// ROUTE : 1 -> GET ALL NOTES OF LOGGED IN USER (GET). LOGGED IN REQUIRED
router.get('/fetch-all-notes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
    // res.send('Hii from notes')
})

// ROUTE : 2 -> ADD A NOTE FROM LOGGED IN USER (POST). LOGGED IN REQUIRED
router.post('/add-note', fetchuser, [
    body('title', 'Title must be added').isLength({ min: 1 }),
    // body('descript', 'Email is invalid!').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tags, friends } = req.body
        const note = new Notes({
            title, description, tags, user: req.user.id, friends
        })

        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }

})
// ROUTE : 3 -> UPDATE A NOTE FROM LOGGED IN USER (POST). LOGGED IN REQUIRED
router.put('/update/:id', fetchuser, async (req, res) => {
    const { title, description, tags, friends } = req.body

    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tags) { newNote.tags = tags }
    if (friends) { newNote.friends = friends }

    let note = await Notes.findById(req.params.id) // params is for selecting from :id
    if (!note) { return res.status(404).send('Not found') }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('Not Allowed');
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.send(note)

})
// ROUTE : 4 -> DELETE A NOTE (DELETE). LOGGED IN REQUIRED
router.delete('/delete/:id', fetchuser, async (req, res) => {
    

    let note = await Notes.findById(req.params.id) // params is for selecting from :id
    if (!note) { return res.status(404).send('Not found') }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('Not Allowed');
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.send('Delete Success.!')

})
module.exports = router