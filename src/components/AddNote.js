import React, {useContext, useState} from 'react'
import noteContext from '../context/noteContext'
export default function AddNote() {
    const notes = useContext(noteContext)
    const {addNote} = notes

    const [note, setnote] = useState({title: "", description:"", tags: "default", friends: "", category: ""})
    const submitNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tags, note.friends, note.category)
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        document.getElementById('tags').value = ''
        document.getElementById('friends').value = ''
        document.getElementById('category').value = ''
    }

    const onChange = (e) => {
        setnote({...note, [e.target.name] : e.target.value})
    }
    return (
        <>
            <h1 className='my-3 mx-1'>Add an Expense</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input className="form-control" id="title" name='title' placeholder="Write a title..." onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Expense</label>
                    <input type={'number'} className="form-control" id="tags" name='tags' rows="1" placeholder="How many dollars where spent?" onChange={onChange}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type={'text'} className="form-control" id="category" name='category' rows="1" placeholder="Eg. Shopping, Bills etc." onChange={onChange}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name='description' rows="3" placeholder='We enjoyed a movie at...' onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="friends" className="form-label">Friend's</label>
                    <textarea className="form-control" id="friends" name='friends' rows="1" placeholder="Friend's" onChange={onChange}></textarea>
                </div>
                <button disabled={note.title.length < 1 || note.title.length >= 35 || note.description.length < 1} type="button" className="form-control btn btn-success" data-bs-dismiss="modal" onClick={submitNote}>Add</button>
            </form>
        </>
    )
}
