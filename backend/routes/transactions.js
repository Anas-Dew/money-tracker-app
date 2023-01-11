const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

function filterJsonArrayBy(jsonArray, category) {
    return jsonArray
        .filter(item => item.category.includes(category))
}

function filterJsonArrayByDate(jsonArray, date) {

    return jsonArray
        .filter(function checkAdult(item) {
    
            let datea = new Date(parseInt(item.date)).toLocaleDateString("en-US");
            // m,d,y
            let strformatarr = date.split('-')
            var strformat = `${strformatarr[1]}/${strformatarr[2]}/${strformatarr[0]}`
            
            let extrazero = datea.split('/')
            if (extrazero[0].length === 1) {
                datea = `0${extrazero[0]}/${extrazero[1]}/${extrazero[2]}`
            }
            
            console.log(datea);
            console.log(strformat);
            if (datea === strformat) {
                return item;
            }

        })
}

router.get('/fetch-all-transactions', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
})

router.post('/filter-transactions', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    const { filter } = req.body
    let temp = filterJsonArrayBy(notes, filter)
    res.json(temp)
})

router.post('/filter-transactions-by-date', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    const { date } = req.body
    let temp = filterJsonArrayByDate(notes, date)
    res.json(temp)
})

router.post('/add-transaction', fetchuser, [
    body('title', 'Title must be added').isLength({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tags, friends, category } = req.body
        const note = new Notes({
            title, description, tags, user: req.user.id, friends, category
        })

        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }

})

router.put('/update/:id', fetchuser, async (req, res) => {
    const { title, description, tags, friends } = req.body

    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tags) { newNote.tags = tags }
    if (friends) { newNote.friends = friends }
    if (category) { newNote.category = category }

    let note = await Notes.findById(req.params.id)
    if (!note) { return res.status(404).send('Not found') }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('Not Allowed');
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.send(note)

})

router.delete('/delete/:id', fetchuser, async (req, res) => {


    let note = await Notes.findById(req.params.id)
    if (!note) { return res.status(404).send('Not found') }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('Not Allowed');
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.send('Delete Success.!')

})
module.exports = router