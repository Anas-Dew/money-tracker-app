import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import NoNotes from './NoNotes'
import Noteitems from './Noteitems'
import { useNavigate } from 'react-router-dom'
export default function Notes(props) {
    const navigate = useNavigate();
    const notes = useContext(noteContext)
    const { note, setnote, fetchAllNotes, updateNote } = notes
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllNotes();

        } else {
            navigate('/login')
        }
    }, [])

    const [enote, setenote] = useState({ eid: null, etitle: '', edescription: '', etags: '', efriends: '' })

    const updateNoteUi = (currentNote) => {
        ref.current.click()
        setenote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags, efriends: currentNote.friends })
    }

    const submitNote = (e) => {
        // e.preventDefault();
        updateNote(enote.eid, enote.etitle, enote.edescription, enote.etags, enote.efriends)
        let noteNEW = {
            "_id": enote.eid,
            "user": "6344eac5b01184567d81c939",
            "title": enote.etitle,
            "description": enote.edescription,
            "tags": enote.etags,
            "friends" : enote.efriends,
            "date": "1665557259617",
            "__v": 0
        }
        // setnote(note.concat(noteNEW))
        const newArr = note.map(u => u._id !== noteNEW._id ? u : noteNEW);
        setnote(newArr)
        // console.log(newArr);

        document.getElementById('submitButton').innerText = 'Saved!'
        refClose.current.click()
    }

    const onChange = (e) => {
        setenote({ ...enote, [e.target.name]: e.target.value })
        document.getElementById('submitButton').innerText = 'Save changes'
    }
    const ref = useRef(null);
    const refClose = useRef(null);

    function emotion_filter(thatTag) {
        var stylies_global = ['black', 'white']
        const noteCard = document.getElementById('note-card')
        // console.log(thatTag);
        const emotion_filters = new Map()
        // First item in ARR is text color and second one is BackgroundColor of Card.
        emotion_filters.set('class', ['black', '#efef00'])
        emotion_filters.set('love', ['white', '#ac0202'])
        emotion_filters.set('work', ['white', '#0000a7'])

        const emotion_filters_key = ['love', 'class', 'work']

        emotion_filters_key.map((filter) => {
            if (filter == thatTag.toLowerCase()) {
                let stylies = emotion_filters.get(filter)
                // noteCard.style.color = stylies[0]
                // noteCard.style.backgroundColor = stylies[1];
                // console.log(stylies);
                stylies_global = stylies
            }

        })
        return stylies_global
    }
    return (
        <>
            <h2 className='my-3 mx-1'>Transactions</h2>
            <div className='row'>
                {note.length === 0 && <NoNotes />}
                {note.map((note) => {
                    const note_style = emotion_filter(note.tags)
                    return <Noteitems key={note._id} note={note} note_style={note_style} updateNote={updateNoteUi} />
                })}
            </div>
            <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input className="form-control" id="etitle" name='etitle' placeholder="Write a title..." value={enote.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name='edescription' rows="3" placeholder='It was a starting of spring...' value={enote.edescription} onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etags" className="form-label">Expense</label>
                                    <textarea className="form-control" id="etags" name='etags' rows="1" placeholder='Work' value={enote.etags} onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="efriends" className="form-label">Friend's</label>
                                    <textarea className="form-control" id="efriends" name='efriends' rows="1" placeholder="Friend's" value={enote.efriends} onChange={onChange}></textarea>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn bg-danger btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn bg-success btn-success" id='submitButton' onClick={submitNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
